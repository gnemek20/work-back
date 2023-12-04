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
router.post('/signin', (req, res) => {
  const user = {
    id: req.body.user.id,
    pwd: req.body.user.pwd
  }

  sql.query('select id, name from users where id=? and pwd=?', [user.id, user.pwd], (error, sqlResult) => {
    if (sqlResult[0] == undefined) {
      res.json({
        status: false
      });
    }
    else {
      res.json({
        status: true,
        id: sqlResult[0].id,
        name: sqlResult[0].name
      });
    }
  });
});

router.post('/getProductSteamed', (req, res) => {
  const inform = {
    user_id: req.body.id,
    product_id: req.body.product_id
  }

  sql.query('select * from productSteamedList where user_id="?" and product_id="?"', [inform.user_id, inform.product_id], (error, sqlResult) => {
    if (error) {
      console.log(error.message);
      res.status(500).json();
    }
    else if (sqlResult[0] == undefined) {
      res.json({
        steamed: false
      });
    }
    else {
      res.json({
        steamed: true
      });
    }
  });
});

router.post('/setProductSteamed', (req, res) => {
  const inform = {
    user_id: req.body.id,
    product_id: req.body.product_id
  }

  sql.query('insert into productSteamedList values("?", "?")', [inform.user_id, inform.product_id], (error) => {
    if (!error) {
      res.json();
    }
    else {
      console.log(error.message);
      res.status(500).json();
    }
  });
});

router.post('/deleteProductSteamed', (req, res) => {
  const inform = {
    user_id: req.body.id,
    product_id: req.body.product_id
  }

  sql.query('delete from productSteamedList where user_id="?" and product_id="?"', [inform.user_id, inform.product_id], (error) => {
    if (!error) {
      res.json();
    }
    else {
      console.log(error.message);
      res.status(500).json();
    }
  });
});

module.exports = router;