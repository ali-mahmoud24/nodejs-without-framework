const clientService = require('../service/clientsService');

const { sendResponse, handleError } = require('../utils/response');
const { loadFile } = require('../utils/file');

async function getClients(req, res) {
  try {
    const clients = await clientService.getAllClients();
    return sendResponse(res, 200, 'application/json', JSON.stringify(clients));
  } catch (err) {
    return handleError(res, err, 'Failed to fetch clients');
  }
}

async function createClient(req, res, body) {
  try {
    const params = new URLSearchParams(body);
    const newClient = {
      name: params.get('name'),
      mobile: params.get('mobile'),
      email: params.get('email'),
      address: params.get('address'),
    };

    const saved = await clientService.addClient(newClient);

    let welcomeHtml = await loadFile('../client/pages/welcome.html');
    welcomeHtml = welcomeHtml
      .replaceAll('{name}', saved.name)
      .replace('{mobile}', saved.mobile)
      .replace('{email}', saved.email)
      .replace('{address}', saved.address);

    return sendResponse(res, 200, 'text/html', welcomeHtml);
  } catch (err) {
    return handleError(res, err, 'Failed to add client');
  }
}

async function updateClient(req, res, id, body) {
  try {
    const updatedData = JSON.parse(body);
    const updatedClient = await clientService.updateClient(id, updatedData);

    if (!updatedClient) {
      return sendResponse(
        res,
        404,
        'application/json',
        JSON.stringify({ error: 'Client not found' })
      );
    }

    return sendResponse(
      res,
      200,
      'application/json',
      JSON.stringify(updatedClient)
    );
  } catch (err) {
    return handleError(res, err, 'Failed to update client');
  }
}

async function deleteClient(req, res, id) {
  try {
    const deleted = await clientService.deleteClient(id);
    if (!deleted) {
      return sendResponse(
        res,
        404,
        'application/json',
        JSON.stringify({ error: 'Client not found' })
      );
    }

    return sendResponse(
      res,
      200,
      'application/json',
      JSON.stringify({ success: true })
    );
  } catch (err) {
    return handleError(res, err, 'Failed to delete client');
  }
}

module.exports = { getClients, createClient, updateClient, deleteClient };
