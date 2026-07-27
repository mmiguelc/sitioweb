document.addEventListener('DOMContentLoaded', () => {
  // Configuración
  const itemsPerPage = 6; // Cantidad de stickers por página
  let currentPage = 1;

  const items = Array.from(document.querySelectorAll('.sticker-item'));
  const paginationControls = document.getElementById('pagination-controls');
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Función para mostrar solo los ítems de la página actual
  function displayPage(page) {
    currentPage = page;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    items.forEach((item, index) => {
      if (index >= start && index < end) {
        item.style.display = ''; // Muestra el ítem
      } else {
        item.style.display = 'none'; // Oculta el ítem
      }
    });

    renderControls();
  }

  // Función auxiliar para crear botones individuales
  function createPageItem(text, targetPage, isDisabled = false, isActive = false) {
    const li = document.createElement('li');
    li.className = `page-item ${isDisabled ? 'disabled' : ''} ${isActive ? 'active' : ''}`;

    const a = document.createElement('a');
    a.className = 'page-link';
    a.href = '#';
    a.innerHTML = text;

    if (!isDisabled && !isActive) {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        displayPage(targetPage);
        document.getElementById('stickers-container').scrollIntoView({ behavior: 'smooth' });
      });
    }

    li.appendChild(a);
    return li;
  }

  // Función para renderizar todos los controles de paginación
  function renderControls() {
    paginationControls.innerHTML = '';

    // Si hay 1 o menos páginas, no es necesario mostrar botones
    if (totalPages <= 1) return;

    // 1. Botón "Anterior"
    const prevDisabled = currentPage === 1;
    paginationControls.appendChild(
      createPageItem('&laquo; Anterior', currentPage - 1, prevDisabled)
    );

    // 2. Botones numerados (1, 2, 3...)
    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage;
      paginationControls.appendChild(
        createPageItem(i, i, false, isActive)
      );
    }

    // 3. Botón "Siguiente"
    const nextDisabled = currentPage === totalPages;
    paginationControls.appendChild(
      createPageItem('Siguiente &raquo;', currentPage + 1, nextDisabled)
    );
  }

  // Inicializar la primera página
  if (items.length > 0) {
    displayPage(1);
  }
});