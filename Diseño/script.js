document.getElementById("formContacto").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!nombre || !correo || !mensaje) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  if (!correo.includes("@")) {
    alert("Correo no válido.");
    return;
  }

  const datos = { nombre, correo, mensaje };
  console.log("Enviado:", datos);
  mensajes.push(datos); 

  document.getElementById("confirmacion").textContent = "Mensaje enviado correctamente.";
  this.reset();
});

const mensajes = []; 
