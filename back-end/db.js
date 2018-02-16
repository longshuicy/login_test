var mysql  = require('mysql');
var config = require('./config.js');

var connection = mysql.createConnection({
  host     : config.db.host,
  user     : config.db.username,
  password : config.db.password,
  database : config.db.database
});

connection.connect(function(err){
	if (err){
		console.error('error connecting: ' + err.stack);
		return ;
	}
	console.log('connected as id' + connection.threadId);
});

var retrieveUserByUsername = function(username, cb) {
    
  var sql = 'SELECT * FROM users WHERE ? LIMIT 1;';
  var params = {'username': username}

  connection.query(sql, params, function(err, res, fields){ 
    if(res)
      cb(err, res[0]); 
    else
      cb(err, null);
  });
}

var retrieveUserId = function(username, cb){
  var sql = 'SELECT * FROM users WHERE ? LIMIT 1;';
  var params = {'username': username};

  connection.query(sql, params, function(err, res, fields){
    if(res)
      cb(err, res[0]);
    else
      cb(err, null);
  });
}


var storeUser = function(user, cb){
  var sql = 'INSERT INTO users SET ?';
  connection.query(sql, user, function(err, res, fields){
    cb(err, res);
  });
}


module.exports = {
  retrieveUserByUsername: retrieveUserByUsername,
  retrieveUserId: retrieveUserId,
  storeUser: storeUser
}
