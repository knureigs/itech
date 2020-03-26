-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Окт 22 2013 г., 14:55
-- Версия сервера: 5.5.32
-- Версия PHP: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `iteh2lb1var4`
--
CREATE DATABASE IF NOT EXISTS `iteh2lb1var4` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `iteh2lb1var4`;

-- --------------------------------------------------------

--
-- Структура таблицы `nurse`
--

CREATE TABLE IF NOT EXISTS `nurse` (
  `id_nurse` int(11) NOT NULL,
  `name` text NOT NULL,
  `date` date NOT NULL,
  `department` int(11) NOT NULL,
  `shift` text NOT NULL,
  PRIMARY KEY (`id_nurse`),
  UNIQUE KEY `id_nurse` (`id_nurse`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `nurse`
--

INSERT INTO `nurse` (`id_nurse`, `name`, `date`, `department`, `shift`) VALUES
(1, 'ivanova', '2021-12-20', 1, 'First'),
(2, 'petrova', '2022-12-20', 2, 'Third'),
(3, 'sidorova', '2023-12-20', 3, 'Second'),
(4, 'egorova', '2024-12-20', 4, 'First');

-- --------------------------------------------------------

--
-- Структура таблицы `nurse_ward`
--

CREATE TABLE IF NOT EXISTS `nurse_ward` (
  `fid_nurse` int(11) NOT NULL,
  `fid_ward` int(11) NOT NULL,
  KEY `fid_nurse` (`fid_nurse`),
  KEY `fid_ward` (`fid_ward`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- СВЯЗИ ТАБЛИЦЫ `nurse_ward`:
--   `fid_ward`
--       `ward` -> `id_ward`
--   `fid_nurse`
--       `nurse` -> `id_nurse`
--

--
-- Дамп данных таблицы `nurse_ward`
--

INSERT INTO `nurse_ward` (`fid_nurse`, `fid_ward`) VALUES
(1, 1),
(4, 1),
(4, 2),
(3, 2),
(3, 3),
(2, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `ward`
--

CREATE TABLE IF NOT EXISTS `ward` (
  `id_ward` int(11) NOT NULL,
  `name` text NOT NULL,
  PRIMARY KEY (`id_ward`),
  UNIQUE KEY `id_ward` (`id_ward`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `ward`
--

INSERT INTO `ward` (`id_ward`, `name`) VALUES
(1, 'WardFirst'),
(2, 'WardSecond'),
(3, 'WardThird');

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `nurse_ward`
--
ALTER TABLE `nurse_ward`
  ADD CONSTRAINT `nurse_ward_ibfk_2` FOREIGN KEY (`fid_ward`) REFERENCES `ward` (`id_ward`),
  ADD CONSTRAINT `nurse_ward_ibfk_1` FOREIGN KEY (`fid_nurse`) REFERENCES `nurse` (`id_nurse`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
