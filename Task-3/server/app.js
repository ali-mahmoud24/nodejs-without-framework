const http = require('http');
const fs = require('fs');
const { json } = require('stream/consumers');

let mainHtml = '';
fs.readFile('../client/pages/main.html', (err, data) => {
  err ? console.log(err) : (mainHtml = data.toString());
});
let welcomeHtml = '';
fs.readFile('../client/pages/welcome.html', (err, data) => {
  err ? console.log(err) : (welcomeHtml = data.toString());
});

let script = '';
fs.readFile('../client/scripts/script.js', (err, data) => {
  err ? console.log(err) : (script = data.toString());
});
let mainCSS = '';
fs.readFile('../client/styles/main.css', (err, data) => {
  err ? console.log(err) : (mainCSS = data.toString());
});

let favicon = '';
fs.readFile('../client/icons/favicon.ico', (err, data) => {
  err ? console.log(err) : (favicon = data);
});

const PORT = 7000;

http
  .createServer((req, res) => {
    //#region GET
    if (req.method === 'GET') {
      console.log('GET', req.url);
      switch (req.url) {
        case '/':
        case '/main.html':
        case '/pages/main.html':
        case '/client/pages/main.html':
          res.setHeader('content-type', 'text/html');
          res.write(mainHtml);
          break;
        case '/welcome.html':
        case '/pages/welcome.html':
        case '/client/pages/welcome.html':
          res.setHeader('content-type', 'text/html');
          res.write(welcomeHtml);
          break;
        case '/styles/main.css':
        case '/client/styles/main.css':
          res.setHeader('content-type', 'text/css');
          res.write(mainCSS);
          break;
        case '/scripts/script.js':
        case '/client/scripts/script.js':
          res.setHeader('content-type', 'text/javascript');
          res.write(script);
          break;
        case '/icons/favicon.ico':
        case '/client/icons/favicon.ico':
          res.setHeader('content-type', 'image/vnd.microsoft.icon');
          res.write(favicon);
          break;
        case '/clients':
          let clients = fs.readFileSync('clients.json');
          //  res.writeHead(404)
          // res.setHeader('content-type', 'application/json');
          res.write(clients.toString());
          break;

        default:
          res.writeHead(404);
          res.write('Not Found');
          break;
      }
      res.end();
    }
    //#endregion
    //#region POST
    else if (req.method === 'POST') {
      console.log('POST', req.url);
      switch (req.url) {
        case '/welcome.html':
          // case '/pages/welcome.html':
          // case '/client/pages/welcome.html':
          let welcomeHtml = '';
          req.on('data', (data) => {
            const params = new URLSearchParams(data.toString());

            const name = params.get('name');
            const mobile = params.get('mobile-number');
            const email = params.get('email');
            const address = params.get('address');

            const newClient = { id: Date.now(), name, mobile, email, address };

            fs.readFile('./clients.json', (err, data) => {
              const clients = JSON.parse(data);
              clients.push(newClient);

              const jsonData = JSON.stringify(clients);

              fs.writeFile('./clients.json', jsonData, (err) => {
                if (err) {
                  console.error('Error writing to file:', err);
                  return;
                }
                // console.log('File written successfully!');
              });
            });

            fs.readFile('../client/pages/welcome.html', (err, data) => {
              err ? console.log(err) : (welcomeHtml = data.toString());

              welcomeHtml = welcomeHtml.replaceAll('{name}', name);
              welcomeHtml = welcomeHtml.replace('{mobile}', mobile);
              welcomeHtml = welcomeHtml.replace('{email}', email);
              welcomeHtml = welcomeHtml.replace('{address}', address);

              res.setHeader('content-type', 'text/html');
              res.write(welcomeHtml);
              res.end();
            });
          });

          req.on('error', (err) => {
            console.error(err);
          });

          break;

        default:
          res.writeHead(404);
          res.write('Not Found');
          break;
      }
    }
    //#endregion
    //#region PUT
    else if (req.method === 'PUT') {
    }
    //#endregion
    //#region DELETE
    else if (req.method === 'DELETE') {
      switch (req.url) {
        case '/clients/:id':
          const id = req.url.split('/')[2];
          console.log(id);

          fs.readFile('./clients.json', (err, data) => {
            const clients = JSON.parse(data);
            const filteredClients = clients.filter(
              (client) => client.id == id
            );

            const jsonData = JSON.stringify(filteredClients);

            fs.writeFile('./clients.json', jsonData, (err) => {
              if (err) {
                console.error('Error writing to file:', err);
                return;
              }
              // console.log('File written successfully!');
            });
          });

          break;

        default:
          break;
      }
    }
    //#endregion
  })
  .listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
