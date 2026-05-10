document
  .querySelector(".formularioFeria")
  .addEventListener("submit", async function (evento) {
    // 1. Evitamos que la página se recargue al darle al botón
    evento.preventDefault();

    // 2. Extraemos los valores que el usuario escribió en el HTML
    const datosFormulario = {
      nombre: document.getElementById("nombre").value,
      correo: document.getElementById("correo").value,
      nombre_emprendimiento: document.getElementById("nombre_emprendimiento")
        .value,
      categoria: document.getElementById("categoria").value,
    };

    try {
      // 3. Hacemos la petición POST al backend (El Recepcionista)
      const respuesta = await fetch("http://localhost:3000/feria/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Le decimos que enviamos un JSON
        },
        body: JSON.stringify(datosFormulario), // Convertimos el objeto a texto JSON
      });

      // 4. Leemos la respuesta que nos devuelve el Controlador
      const resultado = await respuesta.json();
      const textoMensaje = document.getElementById("mensajeRespuesta");

      // 5. Mostramos el éxito o el error en la pantalla según el "estado"
      if (resultado.estado === "exitoso") {
        textoMensaje.style.color = "green";
        textoMensaje.textContent = resultado.mensaje; // Ej: "¡Te has registrado correctamente!"
        evento.target.reset(); // Limpia el formulario
      } else {
        textoMensaje.style.color = "red";
        textoMensaje.textContent = resultado.mensaje; // Ej: "Ya no hay cupos..."
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      document.getElementById("mensajeRespuesta").textContent =
        "Error de conexión con el backend.";
    }
  });
