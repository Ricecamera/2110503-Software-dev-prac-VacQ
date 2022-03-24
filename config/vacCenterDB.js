const mysql = require('mysql');

var connection = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'muramasa144',
	database: 'vacCenter',
});

module.exports = connection;
