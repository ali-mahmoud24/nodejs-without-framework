const loadClientsBtn = document.querySelector('#load-clients');
const clientUl = document.querySelector('#client-list');

// --- Display clients in list ---
async function displayClients(clients) {
  clientUl.innerHTML = ``;

  clients.forEach((client) => {
    const newLi = document.createElement('li');
    newLi.innerHTML = `
      <p><b>Name:</b> ${client.name}</p>
      <p><b>Mobile:</b> ${client.mobile}</p>
      <p><b>Email:</b> ${client.email}</p>
      <p><b>Address:</b> ${client.address}</p>
      <div>
        <button class="edit-btn" data-id="${client.id}">Edit</button>
        <button class="delete-btn" data-id="${client.id}">Delete</button>
      </div>
    `;

    // Delete button
    newLi.querySelector('.delete-btn').addEventListener('click', async () => {
      await deleteClient(client.id);
      const updatedClients = await fetchClients();
      displayClients(updatedClients);
    });

    clientUl.appendChild(newLi);
  });
}

// --- API helpers ---
async function fetchClients() {
  const response = await fetch('http://localhost:7000/clients');
  return response.json();
}

async function deleteClient(id) {
  await fetch(`http://localhost:7000/clients/${id}`, {
    method: 'DELETE',
  });
}

async function updateClient(id, clientData) {
  await fetch(`http://localhost:7000/clients/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(clientData),
  });
}

// --- Init ---
loadClientsBtn.addEventListener('click', init);

async function init() {
  const clients = await fetchClients();
  displayClients(clients);
}
