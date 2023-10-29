create database photo_album;

create table users (
id int primary key auto_increment,
email varchar(255) unique not null,
password varchar(500) not null
);

create table collections (
collection_id int primary key auto_increment,
collection_name varchar(255) unique not null,
userId int not null,
foreign key (userId) references users(id)
on update cascade
on delete cascade
);

create table images (
image_id int primary key auto_increment,
image_url varchar(1000) not null,
collectionId int not null,
userID int not null,
foreign key (collectionId) references collections(collection_id),
foreign key (userId) references users(id)
on update cascade
on delete cascade
);