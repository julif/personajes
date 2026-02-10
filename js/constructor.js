function crearFooter() {
  const footer = document.createElement("footer");
  footer.className = "footer";

  footer.innerHTML = `
    <div class="footer-content">
   
      <p> Galeria de personajes - v1.2.1</p>
    </div>
  `;

  document.body.appendChild(footer);
}

document.addEventListener("DOMContentLoaded", crearFooter);