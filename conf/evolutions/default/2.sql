# --- !Ups

create table "user" (
  "id" integer not null primary key autoincrement,
  "firstName" varchar not null,
  "lastName" varchar not null,
  "email" varchar not null unique,
  "admin" bit not null
);

create table "order" (
  "id" integer not null primary key autoincrement,
  "timeStamp" date not null,
  "amount" float not null,
  userId int not null,
  productId int not null,
  "address" varchar not null,
  "dateSend" date,
  "datePaid" date,
  foreign key(userId) references user(id),
  foreign key(productId) references product(id)
);


# --- !Downs

drop table if exists "user";
drop table if exists "order";
