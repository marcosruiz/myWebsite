CREATE KEYSPACE IF NOT EXISTS pro WITH REPLICATION = { 'class' : 'NetworkTopologyStrategy', 'datacenter1' : 3 };
USE pro;
CREATE TABLE pro.users (
  id UUID PRIMARY KEY,
  email text PRIMARY KEY,
  username text PRIMARY KEY,
  email_confirmed boolean,
  creation_date date,
  password text,
  country int
);
CREATE TABLE pro.comments (
  id UUID PRIMARY KEY,
  user_id UUiD,
  user_email text,
  title_comment text,
  comment text,
  creation_date date,
);