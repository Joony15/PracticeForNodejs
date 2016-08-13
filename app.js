//entry application
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyparser.urlencoded({ extended: false }));
//일반적인 url치고 들어노는것은 get 방식 '/'이건 홈으로 접속했다는 뜻
//사용자가 경로에따라 접속했을때 반응하는것 res, req 는 모듈의 특성으로 지정
//되어있는것 get << 라우링틍 해주는 역할 그래서
//라우터라고 한다 우리가 하는 것은 라우팅이라고 한다.
app.get('/', function(req, res){
  res.send('Hello home page');

});
//폼
app.get('/form', function(req, res){
  res.render('form');
});
//post 방식 미들웨어가 필요하다 body-parser 같은
app.post('/form_receiver', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  res.send(title+','+description);
});


//동적인 파잃
app.get('/dynamic', function(req, res){
  var lis = '';
  for (var i = 0; i <5; i++){
    lis = lis + '<li>ggtgtgt</li>';
  }
  var time = Date();
  var output = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Heelo dynamic!!!
      <ul>
        ${lis}
      </ul>
        ${time}
    </body>
  </html>`
  res.send(output);

});
///queury sting에따라 다르게 움직이는 형태 req객체에서 query에서
//post는 url상에 뜨지 않는다.
//id값을 가져올수 있다
//온전히 대용량으로 리턴값을 보내려면 post로 보낸다.
app.get('/topic/:id', function(req, res){

  var topic = [
    'Javascript is....',
    'Nodejs is....',
    'Express is...'
  ];
  var str = `
    <a href="/topic/">Javascript</a><br>
    <a href="/topic/1">Nodejs</a><br>
    <a href="/topic/2">EXpress</a><br>
    ${topic[req.params.id]}
    `;
  //쿼리 스트링
  res.send(str);
});
app.get('/route', function(req, res){
  res.send('Hello home page, <img src="/bike.png">');

});

app.get('/login', function(req, res){
  res.send('<h2><a href="www.naver.com">login plz</a><h2>');
})
app.listen(3000, function(){
  console.log('Conneted 3000 port');
});
