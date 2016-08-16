//get module express 웹 에플리케이션을 만드는 하나의 도구
var express = require('express');
var bodyParser = require('body-Parser');
var fs =require('fs');
var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'o2'
});
conn.connect();
//get application object
var app =express();
//middleware for post
app.use(bodyParser.urlencoded({ extended: false}));
//change code pretty
app.locals.pretty = true;
app.set('views', './views_mysql');
app.set('view engine', 'jade');

app.get('/topic/add', function(req, res){
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, topics, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
      res.render('add', {topics:topics});
  });
});
app.post('/topic/add', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
  conn.query(sql, [title, description, author], function(err, result,
    fields){
      if (err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.redirect('/topic/'+result.insertId);
      }
    });
});
app.get(['/topic/:id/edit'], function(req, res){
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, topics, fields){
    var id = req.params.id;
    if (id){
      var sql = 'SELECT * FROM topic WHERE id=?';
      conn.query(sql, [id], function(err, topic, fields){
        if (err){
          res.status(500).send('Internal Server Error');
          console.log(err);
        } else {
          res.render('edit', {topics:topics, topic:topic[0]});
        }
      });
    } else {
      res.render('view', {topics:topics});
    }
  });
});
app.post(['/topic/:id/edit'], function(req, res){
  var id = req.params.id;
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';
  conn.query(sql, [title, description, author, id], function(err, result, fields){
    if (err) {
      res.status(500).send('Internal good Error');
      console.log(err);
    } else {
      res.redirect('/topic/'+id);
    }
  });
});
app.get('/topic/:id/delete', function(req, res){
  var sql = 'SELECT id,title FROM topic';
  var id = req.params.id;
  conn.query(sql, function(err, topics, fields){
    var sql = 'SELECT * FROM topic WHERE id=?';
    conn.query(sql, [id], function(err, topic){
      if(err) {
        res.status(500).send('Internal good Error');
        console.log(err);
      } else {
        if(topic.length == 0) {
          res.status(500).send('Internal good Error');
          console.log('There is no id');
        } else {
          res.render('delete', {topics:topics, topic:topic[0]});
        }
      }
    });
  });
});
app.post('/topic/:id/delete', function(req, res){
  var sql = 'DELETE FROM topic WHERE id=?';
  var id = req.params.id;
  conn.query(sql, [id], function(err, result){
    res.redirect('/topic/')
  });
});

//topic , topic/:id 의 중복을 제거함으로
//유지보수가 용이해짐
app.get(['/topic', '/topic/:id'], function(req, res){
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, topics, fields){
    var id = req.params.id;
    if (id){
      var sql = 'SELECT * FROM topic WHERE id=?';
      conn.query(sql, [id], function(err, topic, fields){
        if (err){
          res.status(500).send('Internal Server Error');
          console.log(err);
        } else {
          res.render('view', {topics:topics, topic:topic[0]});
        }
      });
    } else {
      res.render('view', {topics:topics});
    }
  });
});

//forward 3000, if so call function
app.listen(3000, function(){
  console.log('Connected, 3000 port!');
});
