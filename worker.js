const http = require('http');
const pid = process.pid;

const server = http
  .createServer((req, res) => {
    for (let i = 0; i < 1e7; i++) {}
    res.end(`Hello World from Node JS. \n`);
  })
  .listen(8080, () => {
    console.log(`Server was started. Pid: ${pid}`);
  });

process.on('SIGINT', () => {
  console.log('Signal is SIGINT'); // ctrl + C
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('Signal is SIGTERM'); // kill ${pid}
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGUSR2', () => {
  console.log('Signal is SIGUSR2');
  server.close(() => {
    process.exit(1);
  });
});
