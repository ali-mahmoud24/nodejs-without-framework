const { loadFile } = require('../utils/file');
const { sendResponse, handleError } = require('../utils/response');

async function serveStatic(req, res) {
  try {
    // Only serve for GET requests
    if (req.method !== 'GET') {
      return false;
    }

    switch (req.url) {
      // HTML files
      case '/':
      case '/main.html':
      case '/pages/main.html':
      case '/client/pages/main.html': {
        const html = await loadFile('../client/pages/main.html');
        return sendResponse(res, 200, 'text/html', html);
      }
      case '/welcome.html':
      case '/pages/welcome.html':
      case '/client/pages/welcome.html': {
        const html = await loadFile('../client/pages/welcome.html');
        return sendResponse(res, 200, 'text/html', html);
      }
      // CSS files
      case '/styles/main.css':
      case '/client/styles/main.css': {
        const css = await loadFile('../client/styles/main.css');
        return sendResponse(res, 200, 'text/css', css);
      }
      case '/styles/welcome.css':
      case '/client/styles/welcome.css': {
        const css = await loadFile('../client/styles/welcome.css');
        return sendResponse(res, 200, 'text/css', css);
      }
      // JavaScript files
      case '/scripts/script.js':
      case '/client/scripts/script.js': {
        const js = await loadFile('../client/scripts/script.js');
        return sendResponse(res, 200, 'application/javascript', js);
      }
      case '/scripts/main-validation.js': {
        const js = await loadFile('../client/scripts/main-validation.js');
        return sendResponse(res, 200, 'application/javascript', js);
      }
      case '/scripts/welcome-validation.js': {
        const js = await loadFile('../client/scripts/welcome-validation.js');
        return sendResponse(res, 200, 'application/javascript', js);
      }
      // Favicon
      case '/icons/favicon.ico': {
        const icon = await loadFile('../client/icons/favicon.ico');
        return sendResponse(res, 200, 'image/x-icon', icon);
      }
      default:
        return false; // not handled here
    }
  } catch (err) {
    return handleError(res, err, 'Static file error');
  }
}

module.exports = serveStatic;
