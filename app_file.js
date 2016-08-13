//get module express 웹 에플리케이션을 만드는 하나의 도구
var express = require('express');
var bodyParser = require('body-Parser');
var fs =require('fs');
//get application object
var app =express();
//middleware for post
app.use(bodyParser.urlencoded({ extended: false}));
//change code pretty
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');

app.get('/topic/new', function(req, res){
  fs.readdir('data', function(err,files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new', {topics:files});
  });
});
//topic , topic/:id 의 중복을 제거함으로
//유지보수가 용이해짐
app.get(['/topic', '/topic/:id'], function(req, res){
  //file안에서는 data안의 파일이름들이 arrary로 있다.
  fs.readdir('data', function(err,files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    var id = req.params.id
    if(id){
    //id있을때
      fs.readFile('data/'+id, 'utf8', function(err, data){
        if(err){
          //err check
          console.log(err);
          //send가 실행되면 다음 코드는 실행되지 않는다.
          res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files, title:id, description:data});
      })
    } else {
     //첫번째는 템플릿파일의 이름, 두번째인자는
     //템플릿파일안으로 주입하고자하는 것을 객체안에 담아서
     //아이디값이 없을때
     res.render('view', {topics:files, title:'Welcome', description:'Hello Javascript'});
   }
  });
});
app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title,description,function(err){
    if(err){
      //err check
      console.log(err);
      //send가 실행되면 다음 코드는 실행되지 않는다.
      res.status(500).send('Internal Server Error');
    }
    //redirection 가고싶은 주소로
    res.redirect('/topic/'+title);
  });
});

//forward 3000, if so call function
app.listen(3000, function(){
  console.log('Connected, 3000 port!');
});
