var cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'pro'
});

function getUserByEmail(email, callback){
  const query = 'SELECT password FROM users WHERE email = ? ALLOW FILTERING;';
  client.execute(query, [ email ])
    .then(result => {
      callback(result.rows);
    });
}

function getUser(userId, callback){
  const query = 'SELECT password FROM users WHERE id = ? ALLOW FILTERING;';
  client.execute(query, [ userId ])
    .then(result => {
      callback(result.rows);
    });
}

function addUser(email, password){
  const query = 'INSERT INTO users (id, email, email_confirmed, password) VALUES (uuid(), ?, ?, ?);';
  client.execute(query, [ email, false, password ])
    .then(result => {
      callback(result.rows);
    });
}

exports.getUserByEmail = getUserByEmail;
exports.getUser = getUser;
exports.addUser = addUser;