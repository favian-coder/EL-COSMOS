const RUTA = "https://commons.wikimedia.org/wiki/Special:FilePath/";

const lunas = [
  {
    nombre: "La Luna",
    planeta: "Tierra",
    color: "#c9c9d6",
    imagen: RUTA + "FullMoon2010.jpg?width=800",
    diametroKm: 3474,
    descripcion: "Nuestro único satélite natural y el único lugar fuera de la Tierra al que han llegado seres humanos.",
    dato: "Siempre vemos la misma cara de la Luna desde la Tierra."
  },
  {
    nombre: "Fobos",
    planeta: "Marte",
    color: "#8a7f77",
    imagen: RUTA + "Phobos_colour_2008.jpg?width=800",
    diametroKm: 22,
    descripcion: "Una luna pequeña con forma de papa llena de cráteres.",
    dato: "Da unas tres vueltas a Marte cada día."
  },
  {
    nombre: "Deimos",
    planeta: "Marte",
    color: "#a39a91",
    imagen: RUTA + "Deimos-MRO.jpg?width=800",
    diametroKm: 12,
    descripcion: "La más pequeña de las dos lunas de Marte, de superficie suave y polvorienta.",
    dato: "Desde Marte se vería apenas como una estrella brillante."
  },
  {
    nombre: "Ío",
    planeta: "Júpiter",
    color: "#e8c547",
    imagen: RUTA + "Io_highest_resolution_true_color.jpg?width=800",
    diametroKm: 3643,
    descripcion: "El mundo con más volcanes activos del Sistema Solar.",
    dato: "Sus erupciones lanzan material a cientos de kilómetros de altura."
  },
  {
    nombre: "Europa",
    planeta: "Júpiter",
    color: "#b9c8d9",
    imagen: RUTA + "Europa-moon.jpg?width=800",
    diametroKm: 3122,
    descripcion: "Bajo su corteza de hielo se esconde un océano de agua salada.",
    dato: "Es uno de los lugares donde los científicos buscan vida fuera de la Tierra."
  },
  {
    nombre: "Ganímedes",
    planeta: "Júpiter",
    color: "#9c9486",
    imagen: RUTA + "Ganymede_g1_true-edit1.jpg?width=800",
    diametroKm: 5268,
    descripcion: "La luna más grande del Sistema Solar.",
    dato: "Es más grande que el planeta Mercurio."
  },
  {
    nombre: "Calisto",
    planeta: "Júpiter",
    color: "#6f6a62",
    imagen: RUTA + "Callisto.jpg?width=800",
    diametroKm: 4821,
    descripcion: "Una luna oscura y cubierta de cráteres, con una de las superficies más antiguas conocidas.",
    dato: "Casi no ha cambiado en miles de millones de años."
  },
  {
    nombre: "Titán",
    planeta: "Saturno",
    color: "#e0a458",
    imagen: RUTA + "Titan_in_true_color.jpg?width=800",
    diametroKm: 5150,
    descripcion: "Tiene una atmósfera espesa y lagos de metano líquido en su superficie.",
    dato: "Es la única luna del Sistema Solar con una atmósfera tan densa."
  },
  {
    nombre: "Encélado",
    planeta: "Saturno",
    color: "#e9f2ff",
    imagen: RUTA + "PIA17202_-_Approaching_Enceladus.jpg?width=800",
    diametroKm: 504,
    descripcion: "Una luna pequeña y brillante cubierta de hielo.",
    dato: "Lanza chorros de vapor de agua al espacio desde su polo sur."
  },
  {
    nombre: "Tritón",
    planeta: "Neptuno",
    color: "#c8d8d4",
    imagen: RUTA + "Triton_moon_mosaic_Voyager_2_(large).jpg?width=800",
    diametroKm: 2707,
    descripcion: "La luna más grande de Neptuno, helada y con géiseres de nitrógeno.",
    dato: "Gira alrededor de Neptuno en sentido contrario al giro del planeta."
  }
];

const contenedorLunas = document.getElementById("cuadricula-lunas");
const selectorPlaneta = document.getElementById("filtro-planeta");
const contadorLunas = document.getElementById("contador-lunas");

function crearVisualLuna(luna) {
  const caja = document.createElement("div");
  caja.className = "visual";

  const dibujarOrbe = () => {
    const orbe = document.createElement("span");
    orbe.className = "orbe";
    orbe.setAttribute("aria-hidden", "true");
    caja.append(orbe);
  };

  if (luna.imagen) {
    const imagen = document.createElement("img");
    imagen.src = luna.imagen;
    imagen.alt = "Imagen de " + luna.nombre + " (NASA)";
    imagen.loading = "lazy";
    imagen.addEventListener("error", () => {
      imagen.remove();
      dibujarOrbe();
    });
    caja.append(imagen);
  } else {
    dibujarOrbe();
  }
  return caja;
}

function crearTarjetaLuna(luna) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "planeta-card luna-card";
  tarjeta.style.setProperty("--color-planeta", luna.color);

  tarjeta.innerHTML = `
    <h3>${luna.nombre}</h3>
    <p class="etiqueta">Luna de ${luna.planeta}</p>
    <p class="datos"><span>Diámetro: <strong>${formatearKmLuna(luna.diametroKm)}</strong></span></p>
    <p>${luna.descripcion}</p>
    <p><strong>¿Sabías que?</strong> ${luna.dato}</p>
  `;
  tarjeta.prepend(crearVisualLuna(luna));
  return tarjeta;
}

function formatearKmLuna(km) {
  return km.toLocaleString("es-VE") + " km";
}

function mostrarLunas() {
  const planeta = selectorPlaneta.value;
  const visibles = lunas.filter((luna) => planeta === "todos" || luna.planeta === planeta);

  contenedorLunas.replaceChildren();
  visibles.forEach((luna) => contenedorLunas.append(crearTarjetaLuna(luna)));

  contadorLunas.textContent =
    visibles.length === 1 ? "Mostrando 1 luna" : "Mostrando " + visibles.length + " lunas";
}

function llenarSelector() {
  const nombres = [...new Set(lunas.map((luna) => luna.planeta))];
  nombres.forEach((nombre) => {
    const opcion = document.createElement("option");
    opcion.value = nombre;
    opcion.textContent = nombre;
    selectorPlaneta.append(opcion);
  });
}

selectorPlaneta.addEventListener("change", mostrarLunas);

llenarSelector();
mostrarLunas();
