const express = require("express");
const cors = require("cors");
const app = express();
const rutas_expositores = require("./routes/expositorRutas");

//* Cargamos dotenv aqui tambien por seguridad si fuera necesario
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/feria", rutas_expositores);

//* Usamos el puerto del archivo .env o el 3000 por defecto
const puerto = process.env.PUERTO_SERVIDOR || 3000;

app.listen(puerto, function () {
  console.log("-- Servidor de la Feria Iniciado --");
  console.log("Escuchando en: http://localhost:" + puerto);
});
