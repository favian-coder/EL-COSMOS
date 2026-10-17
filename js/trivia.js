const preguntas = [
  {
    pregunta: "¿Qué planeta está más cerca del Sol?",
    opciones: ["Venus", "Mercurio", "Marte", "Tierra"],
    correcta: 1,
    explicacion: "Mercurio es el más cercano al Sol y también el más pequeño de los planetas."
  },
  {
    pregunta: "¿Cuál es el planeta más grande del Sistema Solar?",
    opciones: ["Saturno", "Neptuno", "Júpiter", "Urano"],
    correcta: 2,
    explicacion: "Júpiter es tan grande que dentro de él cabrían más de mil Tierras."
  },
  {
    pregunta: "¿Por qué Marte se llama «el planeta rojo»?",
    opciones: [
      "Porque está muy caliente",
      "Por el óxido de hierro de su suelo",
      "Porque tiene mares de lava",
      "Porque está cerca del Sol"
    ],
    correcta: 1,
    explicacion: "El suelo marciano contiene óxido de hierro, la misma herrumbre que vemos en objetos oxidados."
  },
  {
    pregunta: "¿Cuántos planetas tiene el Sistema Solar?",
    opciones: ["7", "8", "9", "10"],
    correcta: 1,
    explicacion: "Son ocho: Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano y Neptuno."
  },
  {
    pregunta: "¿Qué planeta es famoso por sus anillos?",
    opciones: ["Marte", "Venus", "Mercurio", "Saturno"],
    correcta: 3,
    explicacion: "Los anillos de Saturno están formados por hielo y roca. Otros gigantes tienen anillos, pero mucho más tenues."
  },
  {
    pregunta: "¿Cómo se llama la galaxia donde vivimos?",
    opciones: ["Andrómeda", "Vía Láctea", "Remolino", "Sombrero"],
    correcta: 1,
    explicacion: "Nuestro Sistema Solar está en un brazo de la Vía Láctea, una galaxia espiral."
  },
  {
    pregunta: "¿Qué es el Sol?",
    opciones: ["Un planeta", "Una luna", "Una estrella", "Un cometa"],
    correcta: 2,
    explicacion: "El Sol es una estrella: una enorme bola de gas caliente que produce luz y calor."
  },
  {
    pregunta: "¿Cuál es el planeta más caliente?",
    opciones: ["Mercurio", "Venus", "Júpiter", "Marte"],
    correcta: 1,
    explicacion: "Venus es el más caliente (unos 465 °C) porque su atmósfera atrapa el calor."
  },
  {
    pregunta: "¿Qué luna de Júpiter tiene un océano bajo su hielo?",
    opciones: ["Ío", "Calisto", "Europa", "Fobos"],
    correcta: 2,
    explicacion: "Europa esconde un océano de agua salada bajo su corteza helada."
  },
  {
    pregunta: "¿Cuánto tarda la Tierra en dar una vuelta completa al Sol?",
    opciones: ["Un día", "Un mes", "Unos 365 días", "Diez años"],
    correcta: 2,
    explicacion: "Una vuelta al Sol dura aproximadamente 365 días: un año."
  }
];

const caja = document.getElementById("trivia-caja");
const resultado = document.getElementById("trivia-resultado");
const barra = document.getElementById("trivia-barra");
const textoContador = document.getElementById("trivia-contador");
const textoPregunta = document.getElementById("trivia-pregunta");
const contenedorOpciones = document.getElementById("trivia-opciones");
const textoExplicacion = document.getElementById("trivia-explicacion");
const botonSiguiente = document.getElementById("trivia-siguiente");
const textoPuntaje = document.getElementById("trivia-puntaje");
const textoMensaje = document.getElementById("trivia-mensaje");
const botonReiniciar = document.getElementById("trivia-reiniciar");

let orden = [];
let indice = 0;
let puntos = 0;
let respondida = false;

function mezclar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function iniciar() {
  orden = mezclar(preguntas);
  indice = 0;
  puntos = 0;
  resultado.hidden = true;
  caja.hidden = false;
  mostrarPregunta();
}

function mostrarPregunta() {
  respondida = false;
  const actual = orden[indice];

  textoContador.textContent = "Pregunta " + (indice + 1) + " de " + orden.length;
  barra.style.width = (indice / orden.length) * 100 + "%";
  textoPregunta.textContent = actual.pregunta;

  contenedorOpciones.replaceChildren();
  actual.opciones.forEach((texto, i) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "opcion";
    boton.textContent = texto;
    boton.addEventListener("click", () => responder(i, boton));
    contenedorOpciones.append(boton);
  });

  textoExplicacion.hidden = true;
  botonSiguiente.hidden = true;
  botonSiguiente.textContent =
    indice === orden.length - 1 ? "Ver mi resultado" : "Siguiente pregunta";
}

function responder(i, boton) {
  if (respondida) return;
  respondida = true;

  const actual = orden[indice];
  const botones = [...contenedorOpciones.children];
  botones.forEach((b) => (b.disabled = true));
  botones[actual.correcta].classList.add("correcta");

  const acerto = i === actual.correcta;
  if (acerto) {
    puntos++;
  } else {
    boton.classList.add("incorrecta");
  }

  textoExplicacion.textContent = (acerto ? "¡Correcto! " : "Casi. ") + actual.explicacion;
  textoExplicacion.hidden = false;
  botonSiguiente.hidden = false;
  botonSiguiente.focus();
}

function avanzar() {
  indice++;
  if (indice < orden.length) {
    mostrarPregunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  barra.style.width = "100%";
  caja.hidden = true;
  resultado.hidden = false;

  textoPuntaje.textContent = puntos + " / " + orden.length;

  let mensaje;
  if (puntos === orden.length) {
    mensaje = "¡Perfecto! Eres un verdadero explorador del cosmos.";
  } else if (puntos >= 7) {
    mensaje = "¡Muy bien! Conoces bastante del Sistema Solar.";
  } else if (puntos >= 4) {
    mensaje = "Buen comienzo. Repasa las páginas de planetas y estrellas y vuelve a intentarlo.";
  } else {
    mensaje = "Todo explorador empieza desde cero. Visita las secciones de Cosmos y prueba otra vez.";
  }
  textoMensaje.textContent = mensaje;
  botonReiniciar.focus();
}

botonSiguiente.addEventListener("click", avanzar);
botonReiniciar.addEventListener("click", iniciar);

iniciar();
