/* const personajes = ["neda", "luzbella", "aniabet", "shacta"]; */

function actualizarNavegacion() {
  // obtiene el nombre del archivo actual
  const paginaActual = window.location.pathname.split("/").pop().replace(".html", "").toLowerCase();

  const index = personajes.indexOf(paginaActual);

  if (index === -1) {
    console.warn("Personaje no encontrado:", paginaActual);
    return;
  }

  const prevIndex = (index - 1 + personajes.length) % personajes.length;
  const nextIndex = (index + 1) % personajes.length;

  const prev = personajes[prevIndex];
  const next = personajes[nextIndex];

  // links
  document.getElementById("prevLink").href = `${prev}.html`;
  document.getElementById("nextLink").href = `${next}.html`;

  // imágenes
  document.getElementById("prevImg").src = `img/${prev}_thumb.png`;
  document.getElementById("nextImg").src = `img/${next}_thumb.png`;

  // opcional
  document.getElementById("prevImg").alt = prev;
  document.getElementById("nextImg").alt = next;
}

document.addEventListener("DOMContentLoaded", actualizarNavegacion);
