document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
  });
});

const loginBtn = document.getElementById('loginBtn');
const adminKey = document.getElementById('adminKey');
const loginStatus = document.getElementById('loginStatus');

const ADMIN_PASSWORD = 'ronak2326';

if (window.location.pathname.endsWith('admin.html')) {
  if (localStorage.getItem('aspireAdminLoggedIn') === 'true') {
    window.location.replace('upload.html');
  }
}

if (loginBtn && adminKey && loginStatus) {
  loginBtn.addEventListener('click', () => {
    const value = adminKey.value.trim();
    if (value === ADMIN_PASSWORD) {
      localStorage.setItem('aspireAdminLoggedIn', 'true');
      loginStatus.textContent = 'Login successful. Redirecting to the upload dashboard.';
      window.location.href = 'upload.html';
    } else {
      loginStatus.textContent = 'Invalid password.';
    }
  });

  adminKey.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      loginBtn.click();
    }
  });
}

const uploadBtn = document.getElementById('uploadBtn');
const className = document.getElementById('className');
const pdfFile = document.getElementById('pdfFile');
const uploadStatus = document.getElementById('uploadStatus');
const uploadPreview = document.getElementById('uploadPreview');

if (window.location.pathname.endsWith('upload.html')) {
  if (localStorage.getItem('aspireAdminLoggedIn') !== 'true') {
    window.location.replace('admin.html');
  }
}

if (uploadBtn && className && pdfFile && uploadStatus && uploadPreview) {
  function renderUploadedNotes() {
    const notes = JSON.parse(localStorage.getItem('aspireUploadedNotes') || '[]');
    uploadPreview.innerHTML = '';
    if (!notes.length) {
      uploadPreview.innerHTML = '<li>No files uploaded yet.</li>';
      return;
    }
    notes.forEach((note) => {
      const item = document.createElement('li');
      item.innerHTML = `<strong>${note.title}</strong> — <a href="${note.dataUrl}" target="_blank" rel="noopener">${note.fileName}</a>`;
      uploadPreview.appendChild(item);
    });
  }

  renderUploadedNotes();

  uploadBtn.addEventListener('click', () => {
    const title = className.value.trim();
    const file = pdfFile.files[0];

    if (!title || !file) {
      uploadStatus.textContent = 'Please enter the class name and select a PDF file.';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const notes = JSON.parse(localStorage.getItem('aspireUploadedNotes') || '[]');
      notes.unshift({
        title,
        fileName: file.name,
        dataUrl: reader.result,
        uploadedAt: new Date().toLocaleString()
      });
      localStorage.setItem('aspireUploadedNotes', JSON.stringify(notes.slice(0, 20)));
      renderUploadedNotes();
      uploadStatus.textContent = 'PDF uploaded successfully to this browser session.';
      className.value = '';
      pdfFile.value = '';
    };
    reader.readAsDataURL(file);
  });
}
