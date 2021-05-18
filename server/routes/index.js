var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', author: 'Steve Jobs', appName: 'web browser', company:'Awsome Software' });
});

/*Agregando nueva ruta */
 router.get('/greeting', function(req, res, next){
   res.send('Holaaaaaa, estoy en Node JS')
  })
 

 
module.exports = router;
