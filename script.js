document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario');
  const confirmacion = document.getElementById('confirmacion');

  formulario.addEventListener('submit', async function (e) {
    e.preventDefault();

    const datos = obtenerDatosFormulario();

    const mensajeError = validarDatos(datos);
    if (mensajeError) {
      mostrarConfirmacion(`❌ ${mensajeError}`, 'red');
      return;
    }

    try {
      const respuesta = await enviarDatos(datos);
      if (respuesta.ok) {
        mostrarConfirmacion("✅ ¡Mensaje enviado y guardado exitosamente!", "green");
        formulario.reset();
      } else {
        throw new Error();
      }
    } catch (error) {
      mostrarConfirmacion("❌ No se pudo conectar con el servidor.", "red");
    }
  });

  function obtenerDatosFormulario() {
    return {
      nombre: document.getElementById('nombre').value.trim(),
      apellido: document.getElementById('apellido').value.trim(),
      numero: document.getElementById('numero').value.trim(),
      correo: document.getElementById('correo').value.trim(),
      motivo: document.getElementById('motivo').value.trim(),
      mensaje: document.getElementById('mensaje').value.trim()
    };
  }

  function validarDatos({ nombre, apellido, numero, correo, motivo, mensaje }) {
    if (!nombre || !apellido || !numero || !correo || !motivo || !mensaje) {
      return "Por favor completa todos los campos.";
    }

    if (!/^\d{9}$/.test(numero)) {
      return "El número debe tener 9 dígitos numéricos.";
    }

    // Aquí podrías agregar más validaciones como correo electrónico válido, etc.
    return null;
  }

  function mostrarConfirmacion(texto, color) {
    confirmacion.textContent = texto;
    confirmacion.style.color = color;
    confirmacion.style.fontWeight = "bold";
  }

  async function enviarDatos(datos) {
    return await fetch('http://localhost:3000/mensajes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
  }
});
