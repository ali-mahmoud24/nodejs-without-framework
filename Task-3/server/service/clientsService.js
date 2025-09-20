const path = require('path');

const { readJSON, writeJSON } = require('../utils/file');

const DATA_FILE = path.join(__dirname, '..', 'data', 'clients.json');

async function getAllClients() {
  return await readJSON(DATA_FILE);
}

async function getClientById(id) {
  const clients = await readJSON(DATA_FILE);
  return clients.find((c) => String(c.id) === String(id)) || null;
}

async function addClient(newClient) {
  const clients = await readJSON(DATA_FILE);
  newClient.id = Date.now();
  clients.push(newClient);
  await writeJSON(DATA_FILE, clients);
  return newClient;
}

async function updateClient(id, updatedData) {
  const clients = await readJSON(DATA_FILE);
  const index = clients.findIndex((c) => String(c.id) === String(id));
  if (index === -1) return null;

  clients[index] = { ...clients[index], ...updatedData };
  await writeJSON(DATA_FILE, clients);
  return clients[index];
}

async function deleteClient(id) {
  const clients = await readJSON(DATA_FILE);
  const filtered = clients.filter((c) => String(c.id) !== String(id));
  if (clients.length === filtered.length) return false;

  await writeJSON(DATA_FILE, filtered);
  return true;
}

module.exports = {
  getAllClients,
  getClientById,
  addClient,
  updateClient,
  deleteClient,
};
