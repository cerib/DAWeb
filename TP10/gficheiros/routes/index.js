const express = require('express');
const router = express.Router();
const axios = require('axios')
const lhost = require('../config/env').host

/* GET home page. */
router.get('/', function(req, res) {
  axios.get(lhost + '/api/ficheiros')
    .then(dados => {
      res.render('index', {lista: dados.data});
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
})

/* Download a file */
router.get('/download/:fnome', function(req, res){
  res.download( __dirname + '/../public/ficheiros/' + req.params.fnome )
})

module.exports = router;