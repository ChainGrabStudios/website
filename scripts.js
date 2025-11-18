document.addEventListener('DOMContentLoaded', () => {
  try {
    // Año en footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const cards = document.querySelectorAll('.game-card');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalWiki = document.getElementById('modalWiki');
    const modalDownload = document.getElementById('modalDownload');
    const modalClose = document.getElementById('modalClose');
    const modalExternalWiki = document.getElementById('modalExternalWiki');

    console.log('scripts.js cargado. tarjetas encontradas:', cards.length);

    // (Opcional) Si no quieres modal en index, puedes dejar las funciones pero no llamarlas.
    function openModal(title, wiki, downloadUrl) {
      if (!modal) return;
      modalTitle.textContent = title;
      modalWiki.textContent = wiki || 'No hay información adicional.';
      if (downloadUrl) {
        modalDownload.setAttribute('href', downloadUrl);
        modalDownload.style.display = 'inline-block';
      } else {
        modalDownload.setAttribute('href', '#');
        modalDownload.style.display = 'inline-block';
        modalDownload.addEventListener('click', function fakeDownload(e) {
          e.preventDefault();
          const blob = new Blob([`Juego: ${title}\n\n${wiki}`], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = (title.replace(/\s+/g, '_') || 'juego') + '.txt';
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
          modalDownload.removeEventListener('click', fakeDownload);
        }, { once: true });
      }
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const content = modal.querySelector('.modal-content');
      if (content) content.focus();
    }

    function closeModal() {
      if (!modal) return;
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // handlers modal (si existen)
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    // Recorremos tarjetas y añadimos navegación correcta
    cards.forEach(card => {
      const title = card.dataset.title || '';
      const wiki = card.dataset.wiki || '';
      const downloadUrl = card.dataset.download || '';

      // Para debugging: imprime los datos de cada tarjeta al pasar el ratón
      card.addEventListener('mouseover', () => {
        console.log('tarjeta hover:', title);
      });

      // click -> abrir wiki.html en la misma pestaña
      card.addEventListener('click', () => {
        try {
          const params = new URLSearchParams();
          params.set('title', title);
          params.set('wiki', wiki);
          params.set('downloadUrl', downloadUrl);
          const url = `wiki.html?${params.toString()}`;
          console.log('Navegando a:', url);
          window.location.href = url;
        } catch (err) {
          console.error('Error generando URL:', err);
        }
      });

      // accesibilidad: Enter / Space
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const params = new URLSearchParams();
          params.set('title', title);
          params.set('wiki', wiki);
          params.set('downloadUrl', downloadUrl);
          const url = `wiki.html?${params.toString()}`;
          console.log('Navegando (teclado) a:', url);
          window.location.href = url;
        }
      });
    });

  } catch (error) {
    console.error('Error en scripts.js:', error);
  }
});