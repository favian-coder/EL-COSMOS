// =========================================================
// COSMOS · inscribete.html
// Validación del lado del cliente con JavaScript y expresiones
// regulares. Los errores se muestran sin recargar la página.
// =========================================================

const formulario = document.getElementById("form-inscripcion");
const resumenError = document.getElementById("resumen-error");
const mensajeExito = document.getElementById("mensaje-exito");
const nombreExito = document.getElementById("nombre-exito");
const botonOtra = document.getElementById("otra-inscripcion");
const contadorTexto = document.getElementById("contador-mensaje");

// ---------- Expresiones regulares ----------
const patrones = {
  nombre: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{3,40}$/,
  // Debe tener @ y terminar en .com (ej: nombre@dominio.com)
  correo: /^[a-z0-9._%+-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.com$/i,
  telefono: /^(0412|0414|0424|0416|0426)-\d{7}$/
};

// ---------- Un validador por campo: devuelve el mensaje de error o "" ----------
const validadores = {
  nombre(valor) {
    const texto = valor.trim();
    if (!texto) return "Escribe tu nombre.";
    if (!patrones.nombre.test(texto)) return "Usa solo letras y espacios (entre 3 y 40 caracteres).";
    return "";
  },
  correo(valor) {
    const texto = valor.trim();
    if (!texto) return "Escribe tu correo electrónico.";
    if (!patrones.correo.test(texto)) return "El correo debe tener @ y terminar en .com (ej: nombre@dominio.com).";
    return "";
  },
  telefono(valor) {
    const texto = valor.trim();
    if (!texto) return ""; // es opcional
    if (!patrones.telefono.test(texto)) return "Usa el formato 0412-1234567.";
    return "";
  },
  nivel(valor) {
    return valor ? "" : "Elige tu nivel de estudio.";
  },
  intereses() {
    const marcados = formulario.querySelectorAll('input[name="intereses"]:checked');
    return marcados.length > 0 ? "" : "Marca al menos un tema que te interese.";
  },
  mensaje(valor) {
    const texto = valor.trim();
    if (texto.length < 10) return "Cuéntanos un poco más (mínimo 10 caracteres).";
    if (texto.length > 300) return "El mensaje no puede pasar de 300 caracteres.";
    return "";
  },
  terminos() {
    return formulario.elements.terminos.checked ? "" : "Debes aceptar para poder inscribirte.";
  }
};

const camposDeGrupo = ["intereses", "terminos"];

// Obtiene los controles HTML de un campo (uno o varios)
function obtenerControles(nombre) {
  return [...formulario.querySelectorAll('[name="' + nombre + '"]')];
}

// Valida un campo, pinta el error y devuelve true si es válido
function validarCampo(nombre) {
  const controles = obtenerControles(nombre);
  const valor = camposDeGrupo.includes(nombre) ? "" : controles[0].value;
  const mensaje = validadores[nombre](valor);

  document.getElementById("error-" + nombre).textContent = mensaje;

  controles.forEach((control) => {
    if (mensaje) {
      control.setAttribute("aria-invalid", "true");
      control.classList.remove("campo-valido");
    } else {
      control.removeAttribute("aria-invalid");
      const tieneValor = !camposDeGrupo.includes(nombre) && valor.trim() !== "";
      control.classList.toggle("campo-valido", tieneValor);
    }
  });

  return mensaje === "";
}

function validarTodo() {
  let primerInvalido = null;
  Object.keys(validadores).forEach((nombre) => {
    if (!validarCampo(nombre) && !primerInvalido) {
      primerInvalido = obtenerControles(nombre)[0];
    }
  });
  return primerInvalido;
}

function nombreDelCampo(evento) {
  const nombre = evento.target.name;
  return nombre && validadores[nombre] ? nombre : null;
}

// ---------- Eventos ----------
// Al salir de un campo se valida
formulario.addEventListener("focusout", (evento) => {
  const nombre = nombreDelCampo(evento);
  if (nombre) validarCampo(nombre);
});

// Mientras escribe, se corrige el error en vivo si ya había uno
formulario.addEventListener("input", (evento) => {
  const nombre = nombreDelCampo(evento);
  if (nombre && evento.target.getAttribute("aria-invalid") === "true") validarCampo(nombre);
});

formulario.addEventListener("change", (evento) => {
  const nombre = nombreDelCampo(evento);
  if (nombre) validarCampo(nombre);
});

// Teléfono: solo acepta números y pone el guion solo (0412-1234567)
formulario.elements.telefono.addEventListener("input", (evento) => {
  const digitos = evento.target.value.replace(/\D/g, "").slice(0, 11);
  evento.target.value = digitos.length > 4 ? digitos.slice(0, 4) + "-" + digitos.slice(4) : digitos;
});

// Correo: no permite espacios
formulario.elements.correo.addEventListener("input", (evento) => {
  evento.target.value = evento.target.value.replace(/\s/g, "");
});

// Contador de caracteres del comentario
formulario.elements.mensaje.addEventListener("input", (evento) => {
  contadorTexto.textContent = evento.target.value.length + " / 300";
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault(); // evita recargar la página
  const primerInvalido = validarTodo();

  if (primerInvalido) {
    resumenError.hidden = false;
    resumenError.textContent = "Revisa los campos marcados en rojo antes de enviar.";
    primerInvalido.focus();
    return;
  }

  resumenError.hidden = true;
  nombreExito.textContent = formulario.elements.nombre.value.trim().split(/\s+/)[0];
  formulario.hidden = true;
  mensajeExito.hidden = false;
  mensajeExito.querySelector("h2").focus();
});

botonOtra.addEventListener("click", () => {
  formulario.reset();
  contadorTexto.textContent = "0 / 300";
  formulario.querySelectorAll(".campo-valido").forEach((c) => c.classList.remove("campo-valido"));
  formulario.querySelectorAll("[aria-invalid]").forEach((c) => c.removeAttribute("aria-invalid"));
  formulario.querySelectorAll(".error").forEach((e) => (e.textContent = ""));
  mensajeExito.hidden = true;
  formulario.hidden = false;
  formulario.elements.nombre.focus();
});
