// =========================================================
// COSMOS · Script común a todas las páginas
// Abre y cierra el menú de navegación en pantallas pequeñas
// =========================================================

const botonMenu = document.getElementById("menu-boton");
const menu = document.getElementById("menu-principal");

function alternarMenu(abrir) {
  const abierto = typeof abrir === "boolean" ? abrir : !menu.classList.contains("abierto");
  menu.classList.toggle("abierto", abierto);
  botonMenu.setAttribute("aria-expanded", String(abierto));
}

botonMenu.addEventListener("click", () => alternarMenu());

// Cerrar con la tecla Escape
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") alternarMenu(false);
});

// Cerrar al elegir un enlace
menu.addEventListener("click", (evento) => {
  if (evento.target.closest("a")) alternarMenu(false);
});
