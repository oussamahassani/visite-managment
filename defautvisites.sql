-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 24 avr. 2025 à 16:41
-- Version du serveur : 10.6.0-MariaDB
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `vehicle_management`
--

-- --------------------------------------------------------

--
-- Structure de la table `defautvisites`
--

DROP TABLE IF EXISTS `defautvisites`;
CREATE TABLE IF NOT EXISTS `defautvisites` (
  `defautID` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `visiteID` varchar(255) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `gravite` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`defautID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `defautvisites`
--

INSERT INTO `defautvisites` (`defautID`, `visiteID`, `description`, `gravite`, `createdAt`, `updatedAt`) VALUES
('7ba6f324-09e5-46f6-b29e-51ef05007c12', '323e8d85-72e4-4962-8ef3-0dde008e4e09', 'de', 'grave', '2025-04-24 16:28:18', '2025-04-24 16:28:18'),
('d71af77b-07c4-4705-a691-3e992995578f', '323e8d85-72e4-4962-8ef3-0dde008e4e09', 'sdz', 'grave', '2025-04-24 16:28:18', '2025-04-24 16:28:18');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
