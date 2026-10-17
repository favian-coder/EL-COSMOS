// =========================================================
// COSMOS · Datos de los planetas
// La información NO está escrita en el HTML: vive en este
// arreglo de objetos y JavaScript la inyecta en la página.
// Imágenes: fotografías reales de la NASA (dominio público) alojadas en Wikimedia Commons
// =========================================================

const RUTA_NASA = "https://commons.wikimedia.org/wiki/Special:FilePath/";

const planetas = [
  {
    id: "mercurio",
    nombre: "Mercurio",
    tipo: "rocoso",
    color: "#b5a49a",
    imagen: RUTA_NASA + "Mercury_in_color_-_Prockter07_centered.jpg?width=800",
    masaKg: 3.3e23,
    distanciaMkm: 57.9,
    diametroKm: 4879,
    anio: "88 días terrestres",
    lunas: "0",
    temperatura: "De -180 °C a 430 °C",
    resumen: "El más pequeño y el más cercano al Sol.",
    descripcion:
      "Mercurio casi no tiene atmósfera que retenga el calor, por eso pasa de ser muy caliente de día a muy frío de noche.",
    dato: "Un año allí dura 88 días terrestres, pero de un amanecer al siguiente pasan unos 176 días terrestres."
  },
  {
    id: "venus",
    nombre: "Venus",
    tipo: "rocoso",
    color: "#e6c27a",
    imagen: RUTA_NASA + "Venus-real_color.jpg?width=800",
    masaKg: 4.87e24,
    distanciaMkm: 108.2,
    diametroKm: 12104,
    anio: "225 días terrestres",
    lunas: "0",
    temperatura: "Unos 465 °C",
    resumen: "El planeta más caliente del Sistema Solar.",
    descripcion:
      "Su atmósfera es muy densa y está formada sobre todo por dióxido de carbono, un gas que atrapa el calor como una manta gigante.",
    dato: "Es más caliente que Mercurio aunque está más lejos del Sol, y gira al revés que casi todos los planetas."
  },
  {
    id: "tierra",
    nombre: "Tierra",
    tipo: "rocoso",
    color: "#4f9be8",
    imagen: RUTA_NASA + "The_Earth_seen_from_Apollo_17.jpg?width=800",
    masaKg: 5.97e24,
    distanciaMkm: 149.6,
    diametroKm: 12742,
    anio: "365 días",
    lunas: "1",
    temperatura: "Promedio de 15 °C",
    resumen: "Nuestro hogar, el único mundo conocido con vida.",
    descripcion:
      "Es el único planeta donde sabemos que hay agua líquida en la superficie y seres vivos. Su atmósfera nos protege y mantiene la temperatura.",
    dato: "Cerca del 71 % de la superficie de la Tierra está cubierta de agua."
  },
  {
    id: "marte",
    nombre: "Marte",
    tipo: "rocoso",
    color: "#d1603d",
    imagen: RUTA_NASA + "Mars_Valles_Marineris.jpeg?width=800",
    masaKg: 6.42e23,
    distanciaMkm: 227.9,
    diametroKm: 6779,
    anio: "687 días terrestres",
    lunas: "2",
    temperatura: "Promedio de -63 °C",
    resumen: "El planeta rojo, explorado por robots.",
    descripcion:
      "Su color rojizo viene del óxido de hierro (herrumbre) que cubre el suelo. Hoy lo exploran rovers que buscan señales de agua antigua.",
    dato: "Tiene el volcán más grande del Sistema Solar, el Monte Olimpo, más del doble de alto que el Everest."
  },
  {
    id: "jupiter",
    nombre: "Júpiter",
    tipo: "gaseoso",
    color: "#d9a066",
    imagen: RUTA_NASA + "Jupiter_and_its_shrunken_Great_Red_Spot.jpg?width=800",
    masaKg: 1.9e27,
    distanciaMkm: 778.5,
    diametroKm: 142984,
    anio: "Casi 12 años terrestres",
    lunas: "Más de 90",
    temperatura: "Unos -110 °C (nubes)",
    resumen: "El gigante del Sistema Solar.",
    descripcion:
      "Dentro de Júpiter cabrían más de mil Tierras. Es una enorme bola de gas, sobre todo hidrógeno y helio, sin superficie sólida.",
    dato: "Su Gran Mancha Roja es una tormenta tan ancha como la Tierra o más, que se observa desde hace siglos."
  },
  {
    id: "saturno",
    nombre: "Saturno",
    tipo: "gaseoso",
    color: "#e3cf9b",
    imagen: RUTA_NASA + "Saturn_during_Equinox.jpg?width=800",
    masaKg: 5.68e26,
    distanciaMkm: 1434,
    diametroKm: 120536,
    anio: "Casi 29 años terrestres",
    lunas: "Más de 270",
    temperatura: "Unos -140 °C (nubes)",
    resumen: "El planeta de los anillos de hielo.",
    descripcion:
      "Sus anillos están hechos de miles de millones de trozos de hielo y roca, desde granitos de polvo hasta rocas del tamaño de una casa.",
    dato: "Es tan poco denso que flotaría en el agua, si existiera una piscina lo bastante grande."
  },
  {
    id: "urano",
    nombre: "Urano",
    tipo: "helado",
    color: "#8fe0e8",
    imagen: RUTA_NASA + "Uranus2.jpg?width=800",
    masaKg: 8.68e25,
    distanciaMkm: 2871,
    diametroKm: 51118,
    anio: "84 años terrestres",
    lunas: "Más de 25",
    temperatura: "Unos -195 °C",
    resumen: "El gigante helado que gira «acostado».",
    descripcion:
      "Su eje está inclinado unos 98 grados, así que rueda alrededor del Sol casi de lado. Su color azul verdoso viene del metano de su atmósfera.",
    dato: "Cada estación dura unos 21 años terrestres."
  },
  {
    id: "neptuno",
    nombre: "Neptuno",
    tipo: "helado",
    color: "#4a6fe0",
    imagen: RUTA_NASA + "Neptune_Full.jpg?width=800",
    masaKg: 1.02e26,
    distanciaMkm: 4495,
    diametroKm: 49528,
    anio: "165 años terrestres",
    lunas: "Más de 15",
    temperatura: "Unos -200 °C",
    resumen: "El más lejano, azul y ventoso.",
    descripcion:
      "Es el planeta más alejado del Sol. Sus vientos superan los 2.000 km/h, los más rápidos que se conocen en el Sistema Solar.",
    dato: "Se descubrió en 1846 y completó su primera vuelta al Sol en 2011."
  }
];

// Nombres legibles de cada tipo de planeta
const etiquetasTipo = {
  rocoso: "Planeta rocoso",
  gaseoso: "Gigante gaseoso",
  helado: "Gigante helado"
};

// ---------- Funciones de formato reutilizables ----------
const SUPERINDICES = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };

function aSuperindice(numero) {
  return String(numero)
    .split("")
    .map((caracter) => SUPERINDICES[caracter] || caracter)
    .join("");
}

// 5.97e24  ->  "5,97 × 10²⁴ kg"
function formatearMasa(kg) {
  const exponente = Math.floor(Math.log10(kg));
  const base = (kg / Math.pow(10, exponente)).toFixed(2).replace(".", ",");
  return base + " × 10" + aSuperindice(exponente) + " kg";
}

// 1434  ->  "1.434 millones de km"
function formatearDistancia(millones) {
  return millones.toLocaleString("es-VE") + " millones de km";
}

function formatearKm(km) {
  return km.toLocaleString("es-VE") + " km";
}
