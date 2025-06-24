// Scripts de la biblioteca

document.addEventListener('DOMContentLoaded', () => {
  const categorySelect = document.getElementById('category-select');
  const documentsList = document.getElementById('documents-list');
  const documentContent = document.getElementById('document-content');
  const readingTimer = document.getElementById('reading-timer');
  const markAsReadBtn = document.getElementById('mark-as-read-btn');
  const readsCount = document.getElementById('reads-count');

  const roleSelect = document.getElementById('user-role');
  const fileInput = document.getElementById('file-input');
  const fileTitle = document.getElementById('file-title');
  const fileCategory = document.getElementById('file-category');
  const uploadBtn = document.getElementById('upload-btn');
  const pendingList = document.getElementById('pending-list');
  const pendingSection = document.getElementById('pending-section');
=======

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


  const pendingDocs = [];

=======

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

      link.href = doc.url || doc.file;
=======
      link.href = doc.file;
      link.textContent = doc.title;
      link.addEventListener('click', evt => {
        evt.preventDefault();
        openDocument(doc);
      });

      const download = document.createElement('a');
      download.href = doc.url || doc.file;
      download.download = doc.title;
      download.textContent = '⬇️';
      download.className = 'download-link';
      li.appendChild(link);
      li.appendChild(document.createTextNode(' '));
      li.appendChild(download);
=======
      li.appendChild(link);

      documentsList.appendChild(li);
    });
  }

  function openDocument(doc) {

    if (doc.file && doc.file.endsWith('.txt')) {
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
    } else if (doc.url) {
      markAsReadBtn.disabled = true;
      window.open(doc.url, '_blank');
    } else {
      documentContent.textContent = 'Formato no soportado';
    }
  }

  function renderPending() {
    if (roleSelect.value !== 'teacher') {
      pendingSection.style.display = 'none';
      pendingList.innerHTML = '';
      return;
    }

    pendingSection.style.display = '';
    pendingList.innerHTML = '';
    pendingDocs.forEach(doc => {
      const li = document.createElement('li');
      li.textContent = `${doc.title} (${doc.category}) `;
      const approveBtn = document.createElement('button');
      approveBtn.textContent = 'Aprobar';
      approveBtn.addEventListener('click', () => {
        docs.push(doc);
        pendingDocs.splice(pendingDocs.indexOf(doc), 1);
        renderDocuments(categorySelect.value);
        renderPending();
      });
      const rejectBtn = document.createElement('button');
      rejectBtn.textContent = 'Rechazar';
      rejectBtn.addEventListener('click', () => {
        pendingDocs.splice(pendingDocs.indexOf(doc), 1);
        renderPending();
      });
      li.appendChild(approveBtn);
      li.appendChild(rejectBtn);
      pendingList.appendChild(li);
    });
  }

  function handleUpload() {
    const file = fileInput.files[0];
    const title = fileTitle.value.trim();
    if (!file || !title) return;

    const doc = {
      title,
      category: fileCategory.value,
      url: URL.createObjectURL(file)
    };

    if (roleSelect.value === 'teacher') {
      docs.push(doc);
      renderDocuments(categorySelect.value);
    } else {
      pendingDocs.push(doc);
      renderPending();
    }

    fileInput.value = '';
    fileTitle.value = '';
=======
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


  uploadBtn.addEventListener('click', handleUpload);

  roleSelect.addEventListener('change', () => {
    renderPending();
  });

=======
  categorySelect.addEventListener('change', () => {
    renderDocuments(categorySelect.value);
  });

  renderDocuments();

  renderPending();
=======
});
