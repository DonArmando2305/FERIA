const servicio = require("../services/expositorServicio");

const expositorControlador = {
  registrar: async function (solicitud, respuesta) {
    try {
      const datos = solicitud.body;
      //* Le pedimos al servicio que haga su trabajo
      const resultado =
        await servicio.expositorServicio.procesarInscripcion(datos);

      respuesta.status(201).json({
        estado: "exitoso",
        mensaje: "¡Te has registrado correctamente!",
      });
    } catch (error) {
      //*  Si el servicio lanza un error (como el de los cupos), lo atrapamos aqui
      respuesta.status(400).json({
        estado: "error",
        mensaje: error.message,
      });
    }
  },
};

module.exports = expositorControlador;
