const showOption = option => {
    const options = ['option1', 'option2', 'option3'];
    options.forEach(id => document.getElementById(id).style.display = 'none');
    
    const selectedOption = document.getElementById(`option${option}`);
    if (selectedOption) selectedOption.style.display = 'block';

    if (option === 1 && !window.calendarInitialized) {
        loadEvents();  
        window.calendarInitialized = true;
    }
};

const addEvent = () => {
    const eventDate = document.getElementById('event-date').value;
    const eventName = document.getElementById('event-name').value;

    if (eventDate === '' || eventName === '') {
        alert('Por favor, complete la fecha y el nombre del evento.');
        return;
    }

    const events = JSON.parse(localStorage.getItem('events')) || [];

    events.push({ date: eventDate, name: eventName });

    localStorage.setItem('events', JSON.stringify(events));

    displayEvents();
};

const loadEvents = () => {
    displayEvents(); 
};

const displayEvents = () => {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = ''; 

    const events = JSON.parse(localStorage.getItem('events')) || [];

    events.forEach((event, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${event.date}</td>
            <td>${event.name}</td>
            <td><button onclick="removeEvent(${index})">Eliminar</button></td>
        `;
        eventList.appendChild(row);
    });
};

const removeEvent = (index) => {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.splice(index, 1); 
    localStorage.setItem('events', JSON.stringify(events));
    displayEvents(); 
};

const submitSupport = () => {
    const name = document.getElementById('support-name').value;
    const email = document.getElementById('support-email').value;
    const message = document.getElementById('support-message').value;

    if (name === '' || email === '' || message === '') {
        alert('Por favor, complete todos los campos antes de enviar el mensaje.');
        return;
    }

    
    document.getElementById('support-form').reset();

    alert('Su mensaje de soporte ha sido enviado.');
};

const checkLogin = () => {
    try {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            window.location.href = 'index.html';
        } else {
            const welcomeMessage = document.getElementById('welcomeMessage');
            welcomeMessage.textContent = `Bienvenid@, ${loggedInUser.email}`;
        }
    } catch (error) {
        console.error("Error al verificar el usuario logueado: ", error);
        window.location.href = 'index.html';
    }
};

const logout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
};



