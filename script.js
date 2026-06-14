document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
  });
});

const loginBtn = document.getElementById('loginBtn');
const adminKey = document.getElementById('adminKey');
const loginStatus = document.getElementById('loginStatus');
const adminDashboard = document.getElementById('adminDashboard');

function showAdminDashboard() {
  if (adminDashboard) {
    adminDashboard.hidden = false;
  }
  if (loginStatus) {
    loginStatus.textContent = 'Login successful. Admin dashboard is now active.';
  }
}

if (loginBtn && adminKey && loginStatus && adminDashboard) {
  loginBtn.addEventListener('click', () => {
    const value = adminKey.value.trim();
    if (value === 'shuklaronak19') {
      showAdminDashboard();
    } else {
      loginStatus.textContent = 'Wrong key. Use the admin key: shuklaronak19';
      adminDashboard.hidden = true;
    }
  });

  adminKey.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      loginBtn.click();
    }
  });
}
