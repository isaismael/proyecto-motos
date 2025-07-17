document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      window.location.href = 'admin.html';
    } else {
      document.getElementById('error-msg').innerText = data.error || 'Credenciales incorrectas';
    }
  } catch (err) {
    document.getElementById('error-msg').innerText = 'Error de conexión con el servidor';
  }
});
