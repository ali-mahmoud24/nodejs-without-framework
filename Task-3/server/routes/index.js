const handleClients = require('./clientsRoute');
const serveStatic = require('./staticRoute');

async function router(req, res) {
  // 1.  Static files
  const staticServed = await serveStatic(req, res);
  if (staticServed !== false) return true;

  // 2. Client routes
  const handledClients = await handleClients(req, res);
  if (handledClients !== false) return true;

  // 3. Fallback → 404 (Not Found)
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Route not found' }));
  return false;
}

module.exports = router;
