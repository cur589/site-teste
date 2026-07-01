const loginForm = document.getElementById('loginForm');
const anonymousBtn = document.getElementById('anonymousBtn');
const status = document.getElementById('status');

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    status.textContent = 'Por favor, preencha nome de usuário e senha para fazer login.';
    return;
  }

  localStorage.setItem('wikiJogosUser', username);
  window.location.href = 'dashboard.html';
});

anonymousBtn.addEventListener('click', function () {
  localStorage.setItem('wikiJogosUser', 'Anônimo');
  window.location.href = 'dashboard.html';
});
