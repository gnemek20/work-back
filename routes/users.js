var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const sql = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'perfume'
});

sql.connect((error) => {
  if (error) {
    console.error('mysql connection error');
    console.error(error);
  }
  else {
    console.log('mysql connected');
  }
});

// GET

// POST
router.get('/signin', (req, res) => {

});

module.exports = router;