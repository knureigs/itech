-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Мар 08 2023 г., 20:00
-- Версия сервера: 8.0.15
-- Версия PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `lb_pdo_lessons`
--
CREATE DATABASE IF NOT EXISTS `lb_pdo_lessons` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `lb_pdo_lessons`;

-- --------------------------------------------------------

--
-- Структура таблицы `groups`
--

CREATE TABLE `groups` (
  `ID_Groups` int(10) NOT NULL,
  `title` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `groups`
--

INSERT INTO `groups` (`ID_Groups`, `title`) VALUES
(1, 'KI-12-1'),
(2, 'KI-12-2'),
(3, 'KI-12-3'),
(4, 'KI-12-4'),
(5, 'KI-12-5');

-- --------------------------------------------------------

--
-- Структура таблицы `lesson`
--

CREATE TABLE `lesson` (
  `ID_Lesson` int(10) NOT NULL,
  `week_day` text NOT NULL,
  `lesson_number` int(8) NOT NULL,
  `auditorium` text NOT NULL,
  `disciple` text NOT NULL,
  `type` enum('Lecture','Practical','Laboratory') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `lesson`
--

INSERT INTO `lesson` (`ID_Lesson`, `week_day`, `lesson_number`, `auditorium`, `disciple`, `type`) VALUES
(1, 'Monday', 3, '104i', 'Computer Networks', 'Lecture'),
(2, 'Monday', 4, '106i', 'Creation of Images and Sound', 'Lecture'),
(3, 'Monday', 5, '229', 'Internet Technologies', 'Laboratory'),
(4, 'Monday', 6, '229', 'Internet Technologies', 'Laboratory'),
(5, 'Saturday', 1, '10012', 'MathIGS', 'Practical');

-- --------------------------------------------------------

--
-- Структура таблицы `lesson_groups`
--

CREATE TABLE `lesson_groups` (
  `FID_Lesson2` int(10) NOT NULL,
  `FID_Groups` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `lesson_groups`
--

INSERT INTO `lesson_groups` (`FID_Lesson2`, `FID_Groups`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 5),
(2, 3),
(2, 2),
(3, 3),
(4, 3),
(1, 4),
(4, 1),
(4, 1),
(4, 1),
(4, 1),
(4, 1),
(5, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `lesson_teacher`
--

CREATE TABLE `lesson_teacher` (
  `FID_Teacher` int(10) NOT NULL,
  `FID_Lesson1` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `lesson_teacher`
--

INSERT INTO `lesson_teacher` (`FID_Teacher`, `FID_Lesson1`) VALUES
(1, 1),
(2, 2),
(3, 3),
(3, 4),
(1, 4),
(1, 4),
(1, 4),
(1, 4),
(3, 4),
(3, 5);

-- --------------------------------------------------------

--
-- Структура таблицы `teacher`
--

CREATE TABLE `teacher` (
  `ID_Teacher` int(10) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `teacher`
--

INSERT INTO `teacher` (`ID_Teacher`, `name`) VALUES
(1, 'Kovalenko A.A.'),
(2, 'Yankovskiy O.A.'),
(3, 'Ivaschenko G.S.');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`ID_Groups`);

--
-- Индексы таблицы `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`ID_Lesson`);

--
-- Индексы таблицы `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`ID_Teacher`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
