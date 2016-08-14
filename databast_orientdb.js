var OrientoDB = require('oriento');

var server = OrientoDB({
  host: 'localhost',
  port: 2424,
  username: 'root',
  password: 'shwnsgur1!'
});

var db = server.use('o2');
/*
db.record.get('#22:0').then(function (record) {
  console.log('Loaded record:', record);
});*/

//Create
/*
var sql = 'SELECT FROM topic';
db.query(sql).then(function(results){
  console.log(results);
});
//id는 프로퍼티의 id값과 대응된다.
var sql = 'SELECT FROM topic WHERE @rid=:id';
var param = {
  params:{
    id:'#22:0'
  }
};
db.query(sql,param).then(function(results){
  console.log(results);
});
//Insert
var sql = "INSERT INTO topic (title, description) VALUES(:title, :desc)"
db.query(sql, {
  params:{
  title:'Express',
  desc:'Express is Framework for web '
  }
}).then(function(results){
  console.log(results);
});
//update
var sql = "UPDATE topic SET title=:title WHERE @rid=:rid"
db.query(sql, {params:{title:'Expressjs',rid:'#21:1'}}).then(function(results){
  //update는 수정된 행의 갯수를 반환
  console.log(results);
});
//Delete
var sql = "DELETE FROM topic WHERE @rid=:rid";
db.query(sql, {params:{rid:'#21:1'}}).then(function(results){
  console.log(results);
});*/
