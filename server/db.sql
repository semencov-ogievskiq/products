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
  `type` int(11) NOT NULL DEFAULT '1',
  `name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `description` varchar(50) CHARACTER SET utf8 NOT NULL,
  `characteristic` varchar(100) NOT NULL,
  `price` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=latin1;

-- Дамп данных таблицы products.products: ~55 rows (приблизительно)
DELETE FROM `products`;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`id`, `type`, `name`, `description`, `characteristic`, `price`) VALUES
	(1, 1, 'iphone', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(2, 1, 'samsung', 'Смартфон', '{"size":"11","os":"Android"}', 234.213),
	(3, 1, 'samsung a1', 'fd', '{}', 100),
	(4, 1, 'iphone3', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(5, 1, 'iphone5', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(6, 1, 'iphone6', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(7, 1, 'iphone7', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(8, 1, 'iphone8', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(9, 1, 'iphone9', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(10, 1, 'iphone10', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(11, 1, 'iphone11', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(12, 1, 'iphone12', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(13, 1, 'iphone13', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(14, 1, 'iphone14', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(15, 1, 'iphone15', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(16, 1, 'iphone16', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(17, 1, 'iphone17', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(18, 1, 'iphone18', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(19, 1, 'iphone19', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(20, 1, 'iphone20', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(21, 1, 'iphone21', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(22, 1, 'iphone22', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(23, 1, 'iphone23', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(24, 1, 'iphone24', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(25, 1, 'iphone25', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(26, 1, 'iphone26', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(27, 1, 'iphone27', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(28, 1, 'iphone28', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(29, 1, 'iphone29', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(30, 1, 'iphone30', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(31, 1, 'iphone31', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(32, 1, 'iphone32', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(33, 1, 'iphone33', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(34, 1, 'iphone34', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(35, 1, 'iphone35', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(36, 1, 'iphone36', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(37, 1, 'iphone37', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(38, 1, 'iphone38', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(39, 1, 'iphone39', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(40, 1, 'iphone40', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(41, 1, 'iphone41', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(42, 1, 'iphone42', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(43, 1, 'iphone43', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(44, 1, 'iphone44', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(45, 1, 'iphone45', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(46, 1, 'iphone46', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(47, 1, 'iphone47', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(48, 1, 'iphone48', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(49, 1, 'iphone49', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(50, 1, 'iphone50', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(51, 1, 'iphone51', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(53, 1, 'samsung52', 'Смартфон', '{"size":"11","os":"Android"}', 234.213),
	(54, 1, 'iphone1', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(55, 1, 'iphone2', 'Телефон', '{"size":"11","os":"IOS"}', 234),
	(56, 1, 'iphone2', 'Телефон', '{"size":"11","os":"IOS"}', 234);
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
	(1, 'myblackguitar@mail.ru', '82f3d24ce9179f03b15eaf2363adb8abd738ebd325d21ff6cbf6d596526585820dd1d8467ae2684f15465d2599a808bf3ae8e7d0e496d55d0549b593e185dda4', 'Семенцов-Огиевский', 'Алексей', 'Михайлович', '1996-06-09');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
