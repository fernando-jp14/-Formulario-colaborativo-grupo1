document.getElementById('formulario').addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const confirmacion = document.getElementById('confirmacion');

  if (!nombre || !correo || !mensaje) {
    confirmacion.textContent = "❌ Por favor completa todos los campos.";
    confirmacion.style.color = "red";
    return;
  }

  // Enviar los datos al json-server
  fetch('http://localhost:3000/mensajes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nombre, correo, mensaje })
  })
  .then(res => {
    if (res.ok) {
      confirmacion.textContent = "✅ ¡Mensaje enviado y guardado!";
      confirmacion.style.color = "green";
      document.getElementById('formulario').reset();
    } else {
      throw new Error("Error al enviar");
    }
  })
  .catch(() => {
    confirmacion.textContent = "❌ Error al conectar con el servidor.";
    confirmacion.style.color = "red";
  });
});
