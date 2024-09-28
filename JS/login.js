const loginForm = document.getElementById('loginForm');

async function fetchUsers() {
    try {
        const response = await fetch('../JSON/login.json'); 
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error al cargar el archivo users.json:', error);
        return [];
    }
}

async function limpiarDatos() {
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";

    
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(email, password);
    
    const users = await fetchUsers(); 
    let userFound = null;

   
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            userFound = users[i];
            break;
        }
    }

    if (userFound) {
        localStorage.setItem('loggedInUser', JSON.stringify(userFound)); 
        switch (userFound.role) {
            case 'administrador':
                window.location.href = '../HTML/admin.html';
                break;
            case 'estudiante':
                window.location.href = '../HTML/estudiante.html';
                break;
            case 'entrenador':
                window.location.href = '../HTML/entrenador.html';
                break;
            default:
                alert('Rol no reconocido');
        }
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});