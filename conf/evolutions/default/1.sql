# --- !Ups

create table "category" (
  "id" integer not null primary key autoincrement,
  "name" varchar not null
);

create table "product" (
  "id" integer not null primary key autoincrement,
  "name" varchar not null,
  "description" text not null,
  category int not null,
  foreign key(category) references category(id)
);


# --- !Downs

drop table if exists "product";
drop table if exists "category";
