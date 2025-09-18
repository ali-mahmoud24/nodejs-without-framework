const loadClientsBtn = document.querySelector('#load-clients');

const clientUl = document.querySelector('#client-list');

async function displayClients(clients) {
  clientUl.innerHTML = ``;

  clients.forEach((client) => {
    const newLi = document.createElement('li');

    newLi.innerHTML = `
        <p>Name ${client.name}<p/>
        <p>Mobile ${client.mobile}<p/>
        <p>Email ${client.email}<p/>
    <p>Address ${client.address}<p/>
    
    <div>
        <button>Edit</button>
        <button class="delete-btn" data-id=${client.id}>Delete</button>
    </div>
    `;

    const deleteClientButtons = document.querySelectorAll('.delete-btn');
    deleteClientButtons.forEach((btn) => {
      btn.addEventListener('click', async () => {
        const { id } = btn.dataset;
        console.log(id);
        await deleteClient(id);

        const filteredClients = clients.filter((client) => client.id == id);
        displayClients(filteredClients);
      });
    });

    clientUl.appendChild(newLi);
  });
}

async function fetchClients() {
  const response = await fetch('http://localhost:7000/clients');
  const clients = await response.json();
  return clients;
}

async function deleteClient(id) {
  await fetch(`http://localhost:7000/clients/${id}`, {
    method: 'DELETE',
  });
}

loadClientsBtn.addEventListener('click', init);

async function init() {
  const clients = await fetchClients();
  displayClients(clients);
}
