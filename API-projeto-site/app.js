process.env.NODE_ENV = 'production'; // altere para 'production' ou 'dev'

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var tblDadosHardwaresRouter = require('./routes/tblDadosHardwares');
var tblCaixaEletronicoRouter = require('./routes/tblCaixaEletronicos');
var tblUsuarioRouter = require('./routes/tblUsuarios');


var app = express();

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/tblDadosHardwares', tblDadosHardwaresRouter);
app.use('/tblCaixaEletronicos', tblCaixaEletronicoRouter);
app.use('/tblUsuarios', tblUsuarioRouter);


module.exports = app;
