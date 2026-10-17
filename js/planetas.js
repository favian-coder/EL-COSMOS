// =========================================================
// COSMOS · planetas.html
// Genera la interfaz recorriendo el arreglo `planetas` (datos.js)
// Eventos: filtros por tipo, orden, ventana modal con la ficha
// =========================================================

const contenedor = document.getElementById("cuadricula-planetas");
const contador = document.getElementById("contador-planetas");
const botonesFiltro = document.querySelectorAll("[data-filtro]");
const selectorOrden = document.getElementById("orden");
const modal = document.getElementById("modal-planeta");
const cuerpoModal = document.getElementById("modal-cuerpo");
const cuerpoTabla = document.getElementById("tabla-planetas-cuerpo");

let filtroActual = "todos";
let ordenActual = "distancia";

// Imagen oficial de la NASA; si no carga, se dibuja una esfera con el color del planeta
function crearVisual(planeta) {
  const caja = document.createElement("div");
  caja.className = "visual";

  const imagen = document.createElement("img");
  imagen.src = planeta.imagen;
  imagen.alt = "Imagen de " + planeta.nombre + " (NASA)";
  imagen.loading = "lazy";
  imagen.addEventListener("error", () => {
    imagen.remove();
    const orbe = document.createElement("span");
    orbe.className = "orbe";
    orbe.setAttribute("aria-hidden", "true");
    caja.append(orbe);
  });

  caja.append(imagen);
  return caja;
}

function crearTarjeta(planeta) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "planeta-card";
  tarjeta.style.setProperty("--color-planeta", planeta.color);

  const titulo = document.createElement("h3");
  titulo.textContent = planeta.nombre;

  const tipo = document.createElement("p");
  tipo.className = "etiqueta";
  tipo.textContent = etiquetasTipo[planeta.tipo];

  const resumen = document.createElement("p");
  resumen.textContent = planeta.resumen;

  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "boton boton-secundario";
  boton.textContent = "Ver ficha";
  boton.setAttribute("aria-label", "Ver la ficha de " + planeta.nombre);
  boton.addEventListener("click", () => abrirModal(planeta.id));

  tarjeta.append(crearVisual(planeta), titulo, tipo, resumen, boton);
  return tarjeta;
}

// Devuelve los planetas que cumplen el filtro, ya ordenados
function obtenerVisibles() {
  const filtrados = planetas.filter(
    (planeta) => filtroActual === "todos" || planeta.tipo === filtroActual
  );

  return [...filtrados].sort((a, b) => {
    if (ordenActual === "tamano") return b.diametroKm - a.diametroKm;
    if (ordenActual === "nombre") return a.nombre.localeCompare(b.nombre, "es");
    return a.distanciaMkm - b.distanciaMkm;
  });
}

function mostrarPlanetas() {
  const visibles = obtenerVisibles();
  contenedor.replaceChildren();
  visibles.forEach((planeta) => contenedor.append(crearTarjeta(planeta)));
  contador.textContent =
    visibles.length === 1
      ? "Mostrando 1 planeta"
      : "Mostrando " + visibles.length + " planetas";
}

function cambiarFiltro(boton) {
  filtroActual = boton.dataset.filtro;
  botonesFiltro.forEach((b) => b.setAttribute("aria-pressed", String(b === boton)));
  mostrarPlanetas();
}

// ---------- Ventana modal con la ficha detallada ----------
function abrirModal(id) {
  const planeta = planetas.find((p) => p.id === id);
  if (!planeta) return;

  const info = document.createElement("div");
  info.innerHTML = `
    <h2 id="modal-titulo">${planeta.nombre}</h2>
    <p class="etiqueta">${etiquetasTipo[planeta.tipo]}</p>
    <p>${planeta.descripcion}</p>
    <dl class="ficha">
      <div><dt>Masa</dt><dd>${formatearMasa(planeta.masaKg)}</dd></div>
      <div><dt>Distancia al Sol</dt><dd>${formatearDistancia(planeta.distanciaMkm)}</dd></div>
      <div><dt>Diámetro</dt><dd>${formatearKm(planeta.diametroKm)}</dd></div>
      <div><dt>Duración del año</dt><dd>${planeta.anio}</dd></div>
      <div><dt>Lunas</dt><dd>${planeta.lunas}</dd></div>
      <div><dt>Temperatura</dt><dd>${planeta.temperatura}</dd></div>
    </dl>
    <p><strong>¿Sabías que?</strong> ${planeta.dato}</p>
    <p class="creditos-imagen">Imagen: NASA</p>
  `;

  cuerpoModal.style.setProperty("--color-planeta", planeta.color);
  cuerpoModal.replaceChildren(crearVisual(planeta), info);
  modal.showModal();
}

// ---------- Tabla comparativa (también generada con JS) ----------
function mostrarTabla() {
  const ordenados = [...planetas].sort((a, b) => a.distanciaMkm - b.distanciaMkm);
  ordenados.forEach((planeta) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <th scope="row">${planeta.nombre}</th>
      <td>${etiquetasTipo[planeta.tipo]}</td>
      <td>${formatearDistancia(planeta.distanciaMkm)}</td>
      <td>${formatearKm(planeta.diametroKm)}</td>
      <td>${formatearMasa(planeta.masaKg)}</td>
    `;
    cuerpoTabla.append(fila);
  });
}

// ---------- Eventos ----------
botonesFiltro.forEach((boton) => boton.addEventListener("click", () => cambiarFiltro(boton)));

selectorOrden.addEventListener("change", () => {
  ordenActual = selectorOrden.value;
  mostrarPlanetas();
});

// Cerrar al hacer clic fuera de la ficha (sobre el fondo oscuro)
modal.addEventListener("click", (evento) => {
  if (evento.target === modal) modal.close();
});

// ---------- Inicio ----------
mostrarPlanetas();
mostrarTabla();
