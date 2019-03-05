const http = require('http');
const url = require('url');
const server = http.createServer();

let messages = [
  { 'id': 1, 'user': 'dusty', 'message': 'hello!' },
  { 'id': 2, 'user': 'ivy', 'message': 'looking forward to more snow' },
  { 'id': 3, 'user': 'roxy', 'message': 'is it spring yet' }
];

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  }

  else if (request.method === 'POST') {
    let newMessage;
    request.on('data', (data) => {
      newMessage = {
        id: new Date(),
        ...JSON.parse(data)
      }
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});

server.listen(3000, () => {
  console.log('The HTTP server is listening at Port 3000');
});

const getAllMessages = (response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write(JSON.stringify(messages));
  response.end();
}

const addMessage = (message, response) => {
  messages.push(message);
  response.writeHead(201, { 'Content-Type': 'text/plain' });
  response.write(JSON.stringify(message));
  response.end();
}