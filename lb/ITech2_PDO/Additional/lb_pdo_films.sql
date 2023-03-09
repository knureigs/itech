-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2020 at 11:20 PM
-- Server version: 10.1.39-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lb_pdo_films`
--
CREATE DATABASE IF NOT EXISTS `lb_pdo_films`;
USE `lb_pdo_films`;

-- --------------------------------------------------------

--
-- Table structure for table `actor`
--

CREATE TABLE `actor` (
  `ID_Actor` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `actor`
--

INSERT INTO `actor` (`ID_Actor`, `name`) VALUES
(8, 'Bryce Dallas Howard'),
(4, 'Chris Pratt'),
(7, 'Jordana Brewster'),
(6, 'Paul Walker'),
(1, 'Sam Worthington'),
(3, 'Sigourney Weaver'),
(5, 'Vin Diesel'),
(2, 'Zoe Saldana');

-- --------------------------------------------------------

--
-- Table structure for table `film`
--

CREATE TABLE `film` (
  `ID_FILM` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `country` varchar(255) NOT NULL,
  `FID_Quality` varchar(10) NOT NULL,
  `director` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `film`
--

INSERT INTO `film` (`ID_FILM`, `name`, `date`, `country`, `FID_Quality`, `director`) VALUES
(1, 'Avatar', '2009-12-18', 'USA', 'FHD', 'James Cameron'),
(2, 'Guardians of the Galaxy', '2014-08-01', 'USA', 'FHD', 'James Gunn'),
(3, 'Fast & Furious', '2009-04-03', 'USA', 'FHD', 'Justin Lin'),
(4, 'Jurassic World', '2015-06-12', 'USA', 'FHD', 'Colin Trevorrow');

-- --------------------------------------------------------

--
-- Table structure for table `film_actor`
--

CREATE TABLE `film_actor` (
  `FID_Film` int(11) NOT NULL,
  `FID_Actor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `film_actor`
--

INSERT INTO `film_actor` (`FID_Film`, `FID_Actor`) VALUES
(1, 3),
(1, 1),
(1, 2),
(3, 5),
(3, 6),
(3, 7),
(2, 4),
(2, 2),
(2, 5),
(4, 4),
(4, 8);

-- --------------------------------------------------------

--
-- Table structure for table `film_genre`
--

CREATE TABLE `film_genre` (
  `FID_Film` int(11) NOT NULL,
  `FID_Genre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `film_genre`
--

INSERT INTO `film_genre` (`FID_Film`, `FID_Genre`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(2, 4),
(3, 1),
(3, 5),
(4, 1),
(4, 2),
(4, 6);

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `ID_Genre` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`ID_Genre`, `title`) VALUES
(1, 'Action'),
(2, 'Adventure'),
(4, 'Comedy'),
(3, 'Fantasy'),
(6, 'Sci-Fi'),
(5, 'Thriller');

-- --------------------------------------------------------

--
-- Table structure for table `quality`
--

CREATE TABLE `quality` (
  `ID_QUALITY` varchar(10) NOT NULL,
  `resolution` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quality`
--

INSERT INTO `quality` (`ID_QUALITY`, `resolution`) VALUES
('FHD', '1920 x 1080'),
('HD', '1280 x 720'),
('SD', '720 x 480');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actor`
--
ALTER TABLE `actor`
  ADD PRIMARY KEY (`ID_Actor`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`ID_FILM`),
  ADD KEY `FILM_fk0` (`FID_Quality`);

--
-- Indexes for table `film_actor`
--
ALTER TABLE `film_actor`
  ADD KEY `FILM_ACTOR_fk0` (`FID_Film`),
  ADD KEY `FILM_ACTOR_fk1` (`FID_Actor`);

--
-- Indexes for table `film_genre`
--
ALTER TABLE `film_genre`
  ADD KEY `FILM_GENRE_fk0` (`FID_Film`),
  ADD KEY `FILM_GENRE_fk1` (`FID_Genre`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`ID_Genre`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indexes for table `quality`
--
ALTER TABLE `quality`
  ADD PRIMARY KEY (`ID_QUALITY`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actor`
--
ALTER TABLE `actor`
  MODIFY `ID_Actor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `film`
--
ALTER TABLE `film`
  MODIFY `ID_FILM` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `ID_Genre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `film`
--
ALTER TABLE `film`
  ADD CONSTRAINT `FILM_fk0` FOREIGN KEY (`FID_Quality`) REFERENCES `quality` (`ID_QUALITY`);

--
-- Constraints for table `film_actor`
--
ALTER TABLE `film_actor`
  ADD CONSTRAINT `FILM_ACTOR_fk0` FOREIGN KEY (`FID_Film`) REFERENCES `film` (`ID_FILM`),
  ADD CONSTRAINT `FILM_ACTOR_fk1` FOREIGN KEY (`FID_Actor`) REFERENCES `actor` (`ID_Actor`);

--
-- Constraints for table `film_genre`
--
ALTER TABLE `film_genre`
  ADD CONSTRAINT `FILM_GENRE_fk0` FOREIGN KEY (`FID_Film`) REFERENCES `film` (`ID_FILM`),
  ADD CONSTRAINT `FILM_GENRE_fk1` FOREIGN KEY (`FID_Genre`) REFERENCES `genre` (`ID_Genre`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
