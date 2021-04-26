-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               5.7.27-log - MySQL Community Server (GPL)
-- Операционная система:         Win64
-- HeidiSQL Версия:              9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Дамп структуры базы данных products
DROP DATABASE IF EXISTS `products`;
CREATE DATABASE IF NOT EXISTS `products` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `products`;

-- Дамп структуры для таблица products.orders
DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(100) DEFAULT NULL,
  `comment` varchar(100) DEFAULT NULL,
  `fio` varchar(50) NOT NULL,
  `method` int(11) NOT NULL,
  `payment_type` int(11) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `pic_point` int(11) DEFAULT NULL,
  `products` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы products.orders: ~2 rows (приблизительно)
DELETE FROM `orders`;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` (`id`, `address`, `comment`, `fio`, `method`, `payment_type`, `phone`, `pic_point`, `products`) VALUES
	(1, '42343', '42343', '4234', 1, 1, '34234324', NULL, '[{"id":1,"quantity":1},{"id":2,"quantity":1}]'),
	(2, 'rwer', 'erwer', 'erwer', 1, 1, 'rewrwer', NULL, '[{"id":2,"quantity":22},{"id":1,"quantity":1}]');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;

-- Дамп структуры для таблица products.products
DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `description` varchar(50) CHARACTER SET utf8 NOT NULL,
  `characteristic` varchar(100) NOT NULL,
  `price` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Дамп данных таблицы products.products: ~2 rows (приблизительно)
DELETE FROM `products`;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`id`, `name`, `description`, `characteristic`, `price`) VALUES
	(1, 'iphone', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(2, 'samsung', 'Смартфон', '{"size":"11","os":"Android"}', 234.213);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

-- Дамп структуры для таблица products.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mail` varchar(50) NOT NULL,
  `hash_password` varchar(200) NOT NULL,
  `f` varchar(50) NOT NULL,
  `i` varchar(50) NOT NULL,
  `o` varchar(50) DEFAULT NULL,
  `dt_birth` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы products.users: ~1 rows (приблизительно)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `mail`, `hash_password`, `f`, `i`, `o`, `dt_birth`) VALUES
	(1, 'myblackguitar@mail.ru', '82f3d24ce9179f03b15eaf2363adb8abd738ebd325d21ff6cbf6d596526585820dd1d8467ae2684f15465d2599a808bf3ae8e7d0e496d55d0549b593e185dda4', 'Семенцов', 'Огиевский', NULL, NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
