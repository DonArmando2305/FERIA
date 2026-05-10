const { cliente_supabase } = require("../config/supabase");

const expositorRepositorio = {
  //* Funcion para guardar un nuevo expositor
  guardar: async function (datos) {
    const { data, error } = await cliente_supabase
      .from("expositores")
      .insert([datos]);

    if (error) {
      throw new Error("No se pudo guardar en la base de datos");
    }
    return data;
  },

  //* Funcion para contar cuantos inscritos hay en una categoria especifica
  obtenerConteoPorCategoria: async function (nombre_categoria) {
    const { count, error } = await cliente_supabase
      .from("expositores")
      .select("*", { count: "exact", head: true })
      .eq("categoria", nombre_categoria);

    if (error) {
      throw new Error("Error al consultar el conteo");
    }
    return count;
  },
};

module.exports = expositorRepositorio;
