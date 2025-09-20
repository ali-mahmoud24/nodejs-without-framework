function sendResponse(res, status, contentType, data) {
  res.writeHead(status, { 'Content-Type': contentType });
  res.end(data);
}

function handleError(res, err, msg = 'Internal Server Error') {
  console.error(err);
  sendResponse(res, 500, 'text/plain', msg);
}

module.exports = { sendResponse, handleError };
