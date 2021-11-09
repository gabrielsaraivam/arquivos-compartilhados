var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var tblCaixaEletronico = require('../models').tblCaixaEletronico;
var env = process.env.NODE_ENV || 'development';

router.get('/caixas/:idusuario', function(req, res, next) {
	
	// const limite_linhas = 4;

	var idusuario = req.params.idusuario;
	
	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select COUNT(*) from tblCaixasEletrônicos where fkEmpresa = ${idusuario}`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select COUNT(*) from tblCaixasEletrônicos where fkEmpresa = ${idusuario}`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	sequelize.query(instrucaoSql, {
		model: tblCaixaEletronico,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

