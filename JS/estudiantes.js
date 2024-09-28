const showOption = (option) => {
    const options = document.querySelectorAll('.items');
    options.forEach((item, index) => {
        item.style.display = index === option - 1 ? 'block' : 'none';
    });

    // Cargar eventos si se selecciona la opción 1
    if (option === 1) {
        loadEvents(); // Cargar eventos al mostrar la sección de eventos
    }
};

const registerStudent = () => {
    const name = document.getElementById('student-name').value;
    const email = document.getElementById('student-email').value;

    // Validar campos
    if (name === "" || email === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Almacenar datos en localStorage
    const studentData = {
        name: name,
        email: email
    };

    // Almacena los datos en el localStorage
    localStorage.setItem('studentData', JSON.stringify(studentData));

    // Confirmar la inscripción
    alert(`Inscripción exitosa para ${name} con correo ${email}`);

    // Limpiar los campos del formulario
    document.getElementById('student-name').value = '';
    document.getElementById('student-email').value = '';
};

// Función para cargar los eventos desde el localStorage
const loadEvents = () => {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const tableBody = document.getElementById('event-list');

    // Limpiar la tabla antes de agregar eventos
    tableBody.innerHTML = '';

    if (events.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="2" id="no-events">No hay eventos programados.</td></tr>`;
        return;
    }

    events.forEach(event => {
        const row = `<tr>
                        <td>${event.name}</td>
                        <td>${event.date}</td>
                    </tr>`;
        tableBody.innerHTML += row; // Agregar fila HTML
    });
};

// Llama a la función cuando se carga la página
window.onload = () => {
    loadEvents(); // Cargar eventos al iniciar la página
};
