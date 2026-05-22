# 🗃️Sistema de Inventario – La Madeleine

Este proyecto es un sistema web de gestión de inventario para una pastelería, que permite administrar:

- Productos  
- Categorías  
- Proveedores  

Incluye un **frontend en HTML/CSS/JS** y un **backend en Node.js con Express y MySQL**.


## Tecnologías utilizadas

- Node.js  
- Express  
- MySQL  
- JavaScript (Fetch API)  
- HTML5 + CSS3  


## Estructura del proyecto

- server.js # Backend (API REST) 
- index.html # Interfaz principal 
- script-api.js # Lógica del frontend (consumo API) 
- styles.css # Estilos

## Requisitos previos

Antes de ejecutar el sistema necesitas tener instalado:

- Node.js  
- MySQL Server  
- Un gestor de base de datos (phpMyAdmin, MySQL Workbench, etc.)


## Configuración de la base de datos

1. Crear la base de datos:

```
* CREATE DATABASE proyectofinal;

* CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  categoria VARCHAR(100),
  precio DECIMAL(10,2),
  stock INT,
  descripcion TEXT
);

* CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  descripcion TEXT,
  estado VARCHAR(50)
);

* CREATE TABLE proveedores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  contacto VARCHAR(100),
  email VARCHAR(100),
  producto VARCHAR(100)
);
```

## Por ultimo instalar las dependencias necesarias.

* npm install express cors o en algunos casos npm install express mysql2 ejs.
* node server.js
* npm init -y

## ¡Por cierto antes debes haber clonado el repositorio a tu entorno de trabajo!

<p> En git bash seria:</p>

* git clone (URL)
---
<center><h1>¡Muchas Gracias!</h1></center>