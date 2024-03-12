--for help => \?

--list db => \l

--create db => CREATE DATABASE DB_NAME

--connect to db => \c db_name

--show tables => \d connct \d =>table name


create table restaurants (

	id bigserial not null primary key ,
	name varchar(50) not null,
	location varchar(50) not null,
	price_range int not null check(price_range >=1 and price_range <=5)
	
);


insert into restaurants(name,location,price_range)
values('macdonalds','ny',3),('pizza_hut','la',2);



create table reviews(
	id bigserial not null primary key,
	restaurant_id bigint references restaurants(id) not null,
	name varchar(50) not null,
	review text not null,
	rating int  check(rating >=1 and rating <=5) not null

);

insert into reviews(restaurant_id,name,review,rating)
values
(3,'jane','Love it',4),
(3,'Thor','want one in asgard',4),
(3,'Ironman','Buying it',4),
(3,'Hulk','Smashed all foods',4),
(3,'Dr Strange','14 millions probability of salads',4),
(3,'Spidy','ATingling ',4),
(3,'Thanos','This restaurant snaps',4),
(3,'Black Widow','where is hulk?',4),
(3,'batman','I am Batman',4);