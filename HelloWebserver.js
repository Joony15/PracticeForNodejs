/*
require << 모듈을 가져다 쓰는 함수
모듈을 요구 const 상수로 한번 할당되면 바꿀수없다.
Returns a new instance of http.Server.

*/
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

//create를 이용해서 서버를 만든다.
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

//2000 127.0.0.1
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const server = http.createServer(function(req, res){
  res.wir
});
server.listen(port, hostname, function(){

});
