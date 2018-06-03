# --- !Ups

create table "product_review" (
  "id" integer not null primary key autoincrement,
  "review" TEXT not null,
  "userId" int not null,
  "productId" int not null,
  foreign key(userId) references user(id),
  foreign key(productId) references product(id)
);


# --- !Downs

drop table if exists "product_review";
