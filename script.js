document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
  });
});

const loginBtn = document.getElementById('loginBtn');
const adminKey = document.getElementById('adminKey');
const loginStatus = document.getElementById('loginStatus');

if (loginBtn && adminKey && loginStatus) {
  loginBtn.addEventListener('click', () => {
    const value = adminKey.value.trim();
    if (value === 'ronak2326') {
      loginStatus.textContent = 'Login successful. You can now open the upload dashboard.';
      window.location.href = 'upload.html';
    } else {
      loginStatus.textContent = 'Invalid password. Use: ronak2326';
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

if (uploadBtn && className && pdfFile && uploadStatus && uploadPreview) {
  uploadBtn.addEventListener('click', () => {
    const title = className.value.trim();
    const file = pdfFile.files[0];

    if (!title || !file) {
      uploadStatus.textContent = 'Please enter the class name and select a PDF file.';
      return;
    }

    const item = document.createElement('li');
    item.textContent = `${title}: ${file.name}`;
    uploadPreview.prepend(item);
    uploadStatus.textContent = 'PDF upload request received. Add the file to the notes folder for live publishing.';
    className.value = '';
    pdfFile.value = '';
  });
}
