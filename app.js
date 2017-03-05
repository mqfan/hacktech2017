/**
 * Copyright 2016, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// [START app]
'use strict';

// [START setup]
const express = require('express');
const crypto = require('crypto');

const app = express();
app.enable('trust proxy');

var server = require('http').createServer(app);


// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GCLOUD_PROJECT environment variable. See
// https://googlecloudplatform.github.io/gcloud-node/#/docs/google-cloud/latest/guides/authentication
// These environment variables are set automatically on Google App Engine
const Datastore = require('@google-cloud/datastore');


// Instantiate a datastore client
const datastore = Datastore();
// [END setup]

// [START insertVisit]
/**
 * Insert a visit record into the database.
 *
 * @param {object} visit The visit record to insert.
 */
function insertVisit (visit) {
  return datastore.save({
    key: datastore.key('visit'),
    data: visit
  });
}
// [END insertVisit]

function createNewPerson(username, age, gender, description, location, pictureUrl) {
    const taskKey = datastore.key('user_data');
    const entity = {
        key: taskKey,
        data: [
            {
                name: 'name',
                value: username
            },
            {
                name: 'age',
                value: age
            },
            {
                name: 'gender',
                value: gender
            },
            {
                name: 'description',
                value: description
            },
            {
                name: 'location',
                value: location
            },
            {
                name: 'picture',
                value: pictureUrl
            }
        ]
    };

    return datastore.save(entity)
    .then(() => {
      console.log(`Task ${taskKey.id} created successfully.`);
      return taskKey;
    });
}

function queryPeopleByName(username) {
    const query = datastore.createQuery('user_data')
        .filter('name', '=', username)
        .order('age', {
            descending: true
        });
    return datastore.runQuery(query)
        .then((results) => {
                  const entities = results[0];
                  const names = entities.map((entity) => entity[datastore.KEY].name);

                  console.log('Names:');
                  names.forEach((name) => console.log(name));

                  return names;
                });
}

function queryPeopleByLocation(location) {
    const query = datastore.createQuery('user_data');
    return datastore.runQuery(query)
        .then((results) => {
              const entities = results[0];
              const positions = entities.map((entity) => entity[datastore.KEY].location);

              console.log('Location:');
              positions.forEach((position) => console.log(position));

              return positions;
            });
}

// [START getVisits]
/**
 * Retrieve the latest 10 visit records from the database.
 */
function getVisits () {
  const query = datastore.createQuery('visit')
    .order('timestamp', { descending: true })
    .limit(10);

  return datastore.runQuery(query)
    .then((results) => {
      const entities = results[0];
      return entities.map((entity) => `Time: ${entity.timestamp}, AddrHash: ${entity.userIp}`);
    });
}
// [END getVisits]

app.get('/', (req, res, next) => {
  var username = "Sam I Am";
  var age = 35;
  var gender = "female";
  var description = "Hi! My name is Sam. kmskmskmskmskmskmskmskmskmskmskmskms";
  var location = {
        "latitude": 5,
        "longitude": 5
    } 
  var pictureUrl = "/fakepath/";

  createNewPerson(username, age, gender, description, location, pictureUrl);
  queryPeopleByName("Sam I Am");
  queryPeopleByLocation({
        "latitude": 5,
        "longitude": 5
    });

  // Create a visit record to be stored in the database
  const visit = {
    timestamp: new Date(),
    // Store a hash of the visitor's ip address
    userIp: crypto.createHash('sha256').update(req.ip).digest('hex').substr(0, 7)
  };

  insertVisit(visit)
    // Query the last 10 visits from Datastore.
    .then(() => getVisits())
    .then((visits) => {
      res
        .status(200)
        .set('Content-Type', 'text/plain')
        .send(`Last 10 visits:\n${visits.join('\n')}`)
        .end();
    })
    .catch(next);


});

app.use('/static', express.static(__dirname + '/website'));


var io = require('socket.io')(server);

// Chatroom

var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});











// [START listen]
const PORT = process.env.PORT || 8080;
server.listen(process.env.PORT || 8080, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END listen]
// [END app]

module.exports = server;
