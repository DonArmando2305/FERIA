const repositorio = require("../repositories/expositorRepositorio");

const expositorServicio = {
  procesarInscripcion: async function (datos_formulario) {
    //* Regla 1: Validar que el emprendimiento tenga nombre
    if (!datos_formulario.nombre_emprendimiento) {
      throw new Error("El emprendimiento debe tener un nombre");
    }

    //* Regla 2: Revisar si hay cupos (maximo 5 por categoria)
    const cantidad_atual = await repositorio.obtenerConteoPorCategoria(
      datos_formulario.categoria,
    );

    if (cantidad_atual >= 5) {
      throw new Error(
        "Ya no hay cupos disponibles para esta categoria de " +
          datos_formulario.categoria,
      );
    }

    //* Si pasa las reglas, le pedimos al repositorio que guarde
    return await repositorio.guardar(datos_formulario);
  },
};

module.exports = {
  expositorServicio: expositorServicio,
};
