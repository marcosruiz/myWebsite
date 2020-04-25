var cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'pro'
});

function getAllComments(callback){
  const query = 'SELECT * FROM comments;';
  client.execute(query)
    .then(result => {
      callback(result.rows);
    });
}

function getUserComments(userId, callback){
  const query = 'SELECT * FROM comments WHERE user_id = ? ALLOW FILTERING;';
  client.execute(query, [userId])
    .then(result => {
      callback(result.rows);
    });
}

exports.getAllComments = getAllComments;
exports.getUserComments = getUserComments;