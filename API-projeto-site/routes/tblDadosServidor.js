var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var tblDadosServidor = require('../models').tblDadosServidor;
var env = process.env.NODE_ENV || 'development';

/* Recuperar as últimas N tblDadosServidors */
router.get('/ultimasCPU', function(req, res, next) {
	
	// quantas são as últimas tblDadosServidors que quer? 7 está bom?
	const limite_linhas = 4;

	console.log(`Recuperando as ultimas ${limite_linhas} tblDadosServidor CPU`);
	
	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select 
		dataHora,
		cpu,  
		DATE_FORMAT(dataHora,'%H:%i:%s') as dataHora_grafico
		from tblDadosServidor
		where fkServidor = 1
		order by id desc limit 4`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top ${limite_linhas} 
		cpu, 
		dataHora,
		FORMAT(dataHora,'HH:mm:ss') as dataHora_grafico
		from tblDadosServidor
		where fkServidor = 1
		order by id desc`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	sequelize.query(instrucaoSql, {
		model: tblDadosServidor,
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


router.get('/tempo-real-cpu', function(req, res, next) {
	console.log('Recuperando');
	
	//var idCaixaEletronico = req.body.idCaixaEletronico; // depois de .body, use o nome (name) do campo em seu formulário de login
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select DATE_FORMAT(dataHora,'%H:%i:%s') as dataHora_grafico, cpu, fkServidor from tblDadosServidor where fkServidor = 1 order by id desc limit 4`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top 4 cpu, FORMAT(dataHora,'HH:mm:ss') as dataHora_grafico, fkServidor from tblDadosServidor where fkServidor = 1 order by id desc`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado[0]);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.get('/tempo-real-memoria', function(req, res, next) {
	console.log('Recuperando');
	
	//var idCaixaEletronico = req.body.idCaixaEletronico; // depois de .body, use o nome (name) do campo em seu formulário de login
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select DATE_FORMAT(dataHora,'%H:%i:%s') as dataHora_grafico, memoria, fkServidor from tblDadosServidor where fkServidor = 1 order by id desc limit 4`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top 4 memoria, FORMAT(dataHora,'HH:mm:ss') as dataHora_grafico, fkServidor from tblDadosServidor where fkServidor = 1 order by id desc`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	console.log(instrucaoSql);
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
	.then(resultado => {
		res.json(resultado[0]);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

// estatísticas (max, min, média, mediana, quartis etc)
// router.get('/estatisticas', function (req, res, next) {
	
// 	console.log(`Recuperando as estatísticas atuais`);

// 	const instrucaoSql = `select 
// 							max(cpu) as temp_maxima, 
// 							min(cpu) as temp_minima, 
// 							avg(cpu) as temp_media,
// 							max(memoria) as memoria_maxima, 
// 							min(memoria) as memoria_minima, 
// 							avg(memoria) as memoria_media 
// 						from tblDadosHardware`;
					

// 	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
// 		.then(resultado => {
// 			res.json(resultado[0]);
// 		}).catch(erro => {
// 			console.error(erro);
// 			res.status(500).send(erro.message);
// 		});
  
// });


router.get('/ultimasMemoria', function(req, res, next) {
	
	// quantas são as últimas tblDadosHardwares que quer? 7 está bom?
	const limite_linhas = 4;


	console.log(`Recuperando as ultimas ${limite_linhas} memorias tblDadosHardwares`);
	
	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select 
		dataHora,
		memoria,  
		DATE_FORMAT(dataHora,'%H:%i:%s') as dataHora_grafico
		from tblDadosServidor
		where fkServidor = 1
		order by id desc limit ${limite_linhas}`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top ${limite_linhas} 
		memoria, 
		dataHora,
		FORMAT(dataHora,'HH:mm:ss') as dataHora_grafico
		from tblDadosServidor
		where fkServidor = 1
		order by id desc`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	sequelize.query(instrucaoSql, {
		model: tblDadosServidor,
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

module.exports = router;