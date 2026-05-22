-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-05-2026 a las 04:28:03
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

CREATE DATABASE IF NOT EXISTS proyectofinal;
USE proyectofinal;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `categorias` (`id`, `nombre`, `descripcion`, `estado`) VALUES
(1, 'Tartas', 'Tartas enteras y porciones', 'Activa'),
(2, 'Panadería', 'Pan y viennoiseries', 'Activa'),
(3, 'Petit fours', 'Piezas individuales y bocados', 'Activa'),
(4, 'Temporada', 'Creaciones de temporada limitada', 'Inactiva');


CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `precio` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `productos` (`id`, `nombre`, `categoria`, `precio`, `stock`, `descripcion`) VALUES
(1, 'Tarta Fraisier', 'Tartas', 28000, 12, 'Mousse vainilla con fresas frescas'),
(2, 'Croissant de mantequilla', 'Panadería', 4500, 40, 'Hojaldrado francés clásico'),
(3, 'Macaron Rose', 'Petit fours', 3800, 8, 'Relleno de ganache de rosas'),
(4, 'Éclair de chocolate', 'Petit fours', 6500, 20, 'Pasta choux con crema de cacao'),
(5, 'Cheesecake de frutos rojos', 'Tartas', 32000, 5, 'Base de galleta, queso crema y coulis'),
(6, 'Financier de almendra', 'Petit fours', 3200, 0, 'Bizcocho frances');


CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `contacto` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `producto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `proveedores` (`id`, `nombre`, `contacto`, `email`, `producto`) VALUES
(1, 'Hacienda Provi', 'Carlos Mejía', 'carlos@haciendaprovi.co', 'Lácteos y huevos'),
(2, 'Chocolates El Rey', 'Sofía López', 'sofia@elrey.co', 'Coberturas de chocolate'),
(3, 'Importadora Gourmet', 'Andrea Ruiz', 'andrea@igourmet.co', 'Harinas especiales y almendras');


ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;


ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;


ALTER TABLE `proveedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
