se debe ejecutar el comando npm install para construir los modulos.

utilice la arquitectura hexagonal y con typescript, para la base de datos se utilizó mysql

Primero que nada se tiene que crear una conexion en mysql.
Nombre de la conexión: soa
Nombre del Hostname: localhost
Nombre del usuario: root
sin contraseña.


El nombre de la base de datos es: vivero
Nombre de las tablas: pedidos, productos, pedido_productos.

Acontinuación se muestran las tablas con los datos:

CREATE DATABASE vivero;
USE vivero;

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  descripcion VARCHAR(255),
  precio DECIMAL(10, 2),
  cantidad INT,
  imagen VARCHAR(255)
);

CREATE TABLE pedidos (
  id VARCHAR(36) PRIMARY KEY,
  cliente_nombre VARCHAR(255) NOT NULL,
  cliente_direccion VARCHAR(255) NOT NULL,
  cliente_telefono VARCHAR(20) NOT NULL,
  fecha DATETIME NOT NULL,
  total DECIMAL(10, 2) NOT NULL
);

CREATE TABLE pedido_productos (
  id INT NOT NULL AUTO_INCREMENT,
  pedido_id VARCHAR(36),
  producto_id INT,  -- Cambiado a INT para coincidir con el tipo de id en productos
  cantidad INT NOT NULL,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);

con esto deberia funcionar la conexión entre la api y la base de datos.


Para ejecutar la api es con:  npm run start:dev