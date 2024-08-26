const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const db = require('./app/config/db.config.js'); // Asegúrate de que la ruta sea correcta
const router = require('./app/routers/router.js'); // Asegúrate de que la ruta sea correcta

const cors = require('cors');

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

// Configuración de las rutas
app.use('/', router);

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API de Prestamos" });
});

// Sincronización de la base de datos
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync with { force: true }');
});

// Crear un servidor
const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});
