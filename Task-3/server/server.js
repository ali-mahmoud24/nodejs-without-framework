const http = require('http');
const router = require('./routes/index');

const PORT = 7000;

const server = http.createServer(async (req, res) => {
  try {
    await router(req, res);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ error: 'Internal Server Error', message: err.message })
    );
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
