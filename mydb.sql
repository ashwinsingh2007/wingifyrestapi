-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2017 at 02:25 AM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `Id` varchar(20) NOT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Price` int(8) DEFAULT NULL,
  `Description` varchar(100) DEFAULT NULL,
  `Quantity` int(6) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`Id`, `Name`, `Price`, `Description`, `Quantity`, `username`) VALUES
('78', 'ashwin', 200000, 'N/A', 100, NULL),
('3', 'Racket', 3000, 'N/A', 10, NULL),
('5', 'Racket', 4000, 'N/A', 10, NULL),
('200', 'Racket', 4000, 'N/A', 10, NULL),
('11', 'ashwin', 200000, 'N/A', 10, 'ashwin'),
('12', 'ashwin', 200000, 'N/A', 10, 'ashwin');

-- --------------------------------------------------------

--
-- Table structure for table `stubuser`
--

CREATE TABLE `stubuser` (
  `username` varchar(40) NOT NULL,
  `password` varchar(70) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stubuser`
--

INSERT INTO `stubuser` (`username`, `password`) VALUES
('ashwin', 'b2be6925f5ee45c8db0fbc006f34c848'),
('ashwin7', '02ff98a973947531dd2cf915926c4e5b'),
('ashwin8', 'b2be6925f5ee45c8db0fbc006f34c848');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `stubuser`
--
ALTER TABLE `stubuser`
  ADD PRIMARY KEY (`username`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
