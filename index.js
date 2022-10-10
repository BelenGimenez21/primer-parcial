//archivo de configuración de la aplicación

//importaciones
require('dotenv').config();
const express = require('express');
const dbConnect = require('./src/db/db.connection');

const port = process.env.PORT;

//inicializaciones
const app = express();
dbConnect();

//middlewares
app.use(express.json());

//importacion de rutas
app.use(require('./src/routes/user.routes'));

//puerto
//const port = 8000;
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));