// =========================================================
// COSMOS · Pie de página común a todas las páginas
// EDITA AQUÍ UNA SOLA VEZ y el cambio se ve en las 8 páginas.
// Cada HTML solo tiene: <footer class="pie" id="pie-pagina"></footer>
// =========================================================

const datosPie = {
  titulo: "© 2026 Cosmos · Plataforma educativa del Sistema Solar",
  autores: "[Nombre 1], [Nombre 2] y ",          // <- pon aquí los nombres reales
  materia: "Electiva I · UPT de Valencia",
  creditosImagenes:
    'Imágenes: NASA y ESA/Hubble (dominio público o de uso libre), ' +
    '<a href="https://commons.wikimedia.org" target="_blank" rel="noopener"></a>. ' +
    "Los créditos pertenecen a la NASA; este sitio es un proyecto educativo y no está afiliado ni respaldado por la NASA. " +
    'Consulta las <a href="https://spaceplace.nasa.gov/image-use" target="_blank" rel="noopener">normas de uso de imágenes</a>.',
  redes: [
    { nombre: "Instagram", url: "https://www.instagram.com" },   // <- pon tus perfiles
    { nombre: "YouTube", url: "https://www.youtube.com" },
    { nombre: "X", url: "https://x.com" }
  ]
};

function crearPie() {
  const pie = document.getElementById("pie-pagina");
  if (!pie) return;

  const enlacesRedes = datosPie.redes
    .map((r) => `<li><a href="${r.url}" target="_blank" rel="noopener">${r.nombre}</a></li>`)
    .join("");

  pie.innerHTML = `
    <div class="pie-contenido">
      <div>
        <p><strong>${datosPie.titulo}</strong></p>
        <p>Desarrollado por ${datosPie.autores} · ${datosPie.materia}.</p>
        <p>${datosPie.creditosImagenes}</p>
      </div>
      <ul class="redes" aria-label="Redes sociales">${enlacesRedes}</ul>
    </div>
  `;
}

crearPie();
