var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var tblCaixaEletronico = require('../models').tblCaixaEletronico;
var env = process.env.NODE_ENV || 'development';

router.get('/caixas/:id_usuario', function(req, res, next) {
	
	// const limite_linhas = 4;

	var id_usuario = req.params.id_usuario;
	
	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select COUNT(*) as qtdCaixas from tblCaixaEletronico where fkEmpresa = ${id_usuario}`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select COUNT(*) from tblCaixaEletronico where fkEmpresa = ${id_usuario}`;
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



/* Cadastrar usuário */
router.post('/cadastrar/:id_usuario', function(req, res, next) {
	console.log('Criando um usuário');
	
	tblCaixaEletronico.create({
		latitude : req.body.latitude,
		longitude: req.body.longitude,
		numeroSerie: req.body.numeroSerie,
		usuario : req.body.usuario,		
		senha: req.body.senha,
		fkEmpresa: req.params.id_usuario
		
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});


module.exports = router;
