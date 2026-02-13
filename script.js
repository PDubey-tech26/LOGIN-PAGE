// script.js

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
document.getElementById('showRegister').onclick = () => {
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
};
document.getElementById('showLogin').onclick = () => {
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
};

// Helper functions
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}
function setUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Handle Registration
registerForm.onsubmit = (e) => {
    e.preventDefault();
    const username = registerForm.querySelector('input[type="text"]').value.trim();
    const email = registerForm.querySelector('input[type="email"]').value.trim();
    const password = registerForm.querySelector('input[type="password"]').value;

    let users = getUsers();

    // Basic validation
    if (!username || !email || !password) {
        alert('Please fill all fields!');
        return;
    }
    if (users.some(user => user.email === email)) {
        alert('Email already registered!');
        return;
    }

    users.push({ username, email, password });
    setUsers(users);
    alert('Registration successful! Please login.');
    registerForm.reset();
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
};

// Handle Login
loginForm.onsubmit = (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value.trim();
    const password = loginForm.querySelector('input[type="password"]').value;

    let users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert(`Welcome, ${user.username}!`);
        loginForm.reset();
        // You can now redirect or display a welcome message
    } else {
        alert('Invalid login credentials!');
    }
};