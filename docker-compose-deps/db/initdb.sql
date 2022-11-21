create schema vandal;

create table if not exists vandal.users (
  id text primary key not null,
  name text not null,
  email text unique not null,
  password text not null,
  profile_id integer not null
);
