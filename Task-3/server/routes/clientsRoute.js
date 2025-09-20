const clientsController = require('../controllers/clientsController');

async function handleClients(req, res) {
  if (req.method === 'GET' && req.url === '/clients') {
    return clientsController.getClients(req, res);
  }

  if (req.method === 'POST' && req.url === '/welcome.html') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => clientsController.createClient(req, res, body));
    return;
  }

  if (req.method === 'PUT' && req.url.startsWith('/clients/')) {
    const id = req.url.split('/')[2];
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => clientsController.updateClient(req, res, id, body));
    return;
  }

  if (req.method === 'DELETE' && req.url.startsWith('/clients/')) {
    const id = req.url.split('/')[2];
    return clientsController.deleteClient(req, res, id);
  }

  return false; // not handled
}

module.exports = handleClients;
