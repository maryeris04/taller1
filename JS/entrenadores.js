const showOption = (option) => {
    const options = document.querySelectorAll('.items');
    options.forEach((item, index) => {
        item.style.display = index === option - 1 ? 'block' : 'none';
    });
};

const loadInscriptions = () => {
    const storedData = localStorage.getItem('studentData');
    if (storedData) {
        const student = JSON.parse(storedData);

        const tableBody = document.getElementById('inscription-list');

        const row = `<tr>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td><button class="delete-btn" onclick="deleteInscription(this)">Eliminar</button></td>
                    </tr>`;

        tableBody.innerHTML += row; 
    }
};

const deleteInscription = (button) => {
    const row = button.closest('tr');
    row.remove();
    localStorage.removeItem('studentData'); 
};

const addEvent = () => {
    const eventName = document.getElementById('event-name').value;
    const eventDate = document.getElementById('event-date').value;

    if (eventName && eventDate) {
        const event = { name: eventName, date: eventDate };
        let events = JSON.parse(localStorage.getItem('events')) || [];
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
        alert('Evento agregado exitosamente');
        document.getElementById('event-name').value = "";
        document.getElementById('event-date').value = "";
        loadEvents(); 
    } else {
        alert('Por favor, complete todos los campos.');
    }
};

const loadEvents = () => {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const tableBody = document.getElementById('event-list');

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
        tableBody.innerHTML += row; 
    });
};

window.onload = () => {
    loadInscriptions();
    loadEvents();
};