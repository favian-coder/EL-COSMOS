const botonMenu = document.getElementById("menu-boton");
const menu = document.getElementById("menu-principal");

function alternarMenu(abrir) {
  const abierto = typeof abrir === "boolean" ? abrir : !menu.classList.contains("abierto");
  menu.classList.toggle("abierto", abierto);
  botonMenu.setAttribute("aria-expanded", String(abierto));
}

botonMenu.addEventListener("click", () => alternarMenu());

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") alternarMenu(false);
});

menu.addEventListener("click", (evento) => {
  if (evento.target.closest("a")) alternarMenu(false);
});
