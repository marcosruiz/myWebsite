CREATE KEYSPACE IF NOT EXISTS pro WITH REPLICATION = {
'class' : 'NetworkTopologyStrategy',
'datacenter1' : 1
};

USE pro;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email text,
  username text,
  email_confirmed boolean,
  password text,
  country int
);

CREATE TABLE IF NOT EXISTS  comments (
  id UUID PRIMARY KEY,
  user_id UUID,
  user_email text,
  title_comment text,
  comment text
);