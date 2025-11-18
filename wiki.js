document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);


    const title = params.get('title') || 'Juego';
    const wiki = params.get('wiki') || 'No hay información disponible.';
    const downloadUrl = params.get('downloadUrl');


    // Insertar datos
    document.getElementById('gameTitle').textContent = title;
    document.getElementById('gameTitleHeader').textContent = title;
    document.getElementById('gameWiki').textContent = wiki;


    const downloadBtn = document.getElementById('downloadBtn');


    if (downloadUrl) {
        downloadBtn.href = downloadUrl;
    } else {
        // Si no hay archivo real, genera descarga del texto
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const blob = new Blob([`Juego: ${title}\n\n${wiki}`], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title.replace(/\s+/g, '_')}.txt`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 2000);
        });
    }
});