CREATE DATABASE IF NOT EXISTS recipes;
USE recipes;
CREATE TABLE IF NOT EXISTS `users` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `username` varchar(50) NOT NULL,
 `email` varchar(50) NOT NULL,
 `password` varchar(50) NOT NULL,
 `trn_date` datetime NOT NULL,
 PRIMARY KEY (`id`)
 );
 
INSERT INTO `users`(id, username, email, password, trn_date) VALUES ('10', 'JAINFAM', 'RJ', 'RJFamily', '2020-01-01');

use recipes;
select * from users;