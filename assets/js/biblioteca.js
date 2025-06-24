// Scripts de la biblioteca

document.addEventListener('DOMContentLoaded', () => {
  const categorySelect = document.getElementById('category-select');
  const documentsList = document.getElementById('documents-list');
  const documentContent = document.getElementById('document-content');
  const readingTimer = document.getElementById('reading-timer');
  const markAsReadBtn = document.getElementById('mark-as-read-btn');
  const readsCount = document.getElementById('reads-count');

  // Documentos de ejemplo
  const docs = [
    {
      title: 'Guía rápida de Arkana',
      category: 'guias',
      file: 'assets/docs/guia_arkana.txt'
    },
    {
      title: 'Historia del Reino',
      category: 'lore',
      file: 'assets/docs/historia_reino.txt'
    },
    {
      title: 'Consejos de Juego',
      category: 'tutoriales',
      file: 'assets/docs/consejos_juego.txt'
    }
  ];

  let timerInterval = null;
  let elapsedSeconds = 0;

  function formatTime(secs) {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  function startTimer() {
    clearInterval(timerInterval);
    elapsedSeconds = 0;
    readingTimer.textContent = '00:00';
    timerInterval = setInterval(() => {
      elapsedSeconds++;
      readingTimer.textContent = formatTime(elapsedSeconds);
    }, 1000);
  }

  function renderDocuments(filter = 'todas') {
    documentsList.innerHTML = '';
    const filteredDocs =
      filter === 'todas' ? docs : docs.filter(d => d.category === filter);

    filteredDocs.forEach(doc => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = doc.file;
      link.textContent = doc.title;
      link.addEventListener('click', evt => {
        evt.preventDefault();
        openDocument(doc);
      });
      li.appendChild(link);
      documentsList.appendChild(li);
    });
  }

  function openDocument(doc) {
    fetch(doc.file)
      .then(res => res.text())
      .then(text => {
        documentContent.textContent = text;
        markAsReadBtn.disabled = false;
        startTimer();
      })
      .catch(() => {
        documentContent.textContent = 'No se pudo cargar el documento.';
      });
  }

  markAsReadBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    markAsReadBtn.disabled = true;
    documentContent.textContent = '';
    readingTimer.textContent = '00:00';
    readsCount.textContent = parseInt(readsCount.textContent) + 1;
  });

  categorySelect.addEventListener('change', () => {
    renderDocuments(categorySelect.value);
  });

  renderDocuments();
});
