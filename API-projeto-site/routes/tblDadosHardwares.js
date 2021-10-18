var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var tblDadosHardware = require('../models').tblDadosHardware;
var env = process.env.NODE_ENV || 'development';

/* Recuperar as últimas N tblDadosHardwares */
router.get('/ultimas/:idcaminhao', function(req, res, next) {
	
	// quantas são as últimas tblDadosHardwares que quer? 7 está bom?
	const limite_linhas = 4;

	var idcaminhao = req.params.idcaminhao;

	console.log(`Recuperando as ultimas ${limite_linhas} tblDadosHardwares`);
	
	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select 
		dataHora,
		cpu, 
		memoria, 
		DATE_FORMAT(dataHora,'%H:%i:%s') as dataHora_grafico
		from tblDadosHardware
		where fkEmpresa = ${idcaminhao}
		order by id desc limit ${limite_linhas}`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top ${limite_linhas} 
		cpu, 
		memoria, 
		dataHora,
		FORMAT(dataHora,'HH:mm:ss') as dataHora_grafico
		from tblDadosHardware
		where fkEmpresa = ${idcaminhao}
		order by id desc`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}
	
	sequelize.query(instrucaoSql, {
		model: tblDadosHardware,
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


router.get('/tempo-real/:idcaminhao', function(req, res, next) {
	console.log('Recuperando caminhões');
	
	//var idcaminhao = req.body.idcaminhao; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idcaminhao = req.params.idcaminhao;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select DATE_FORMAT(dataHora,'%H:%i:%s') as dataHora_grafico, cpu, memoria, fkEmpresa from tblDadosHardware where fkEmpresa = 1 order by id desc limit 4`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top 1 cpu, memoria, FORMAT(dataHora,'HH:mm:ss') as dataHora_grafico, fkEmpresa from tblDadosHardware where fkEmpresa = ${idcaminhao} order by id desc`;
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
router.get('/estatisticas', function (req, res, next) {
	
	console.log(`Recuperando as estatísticas atuais`);

	const instrucaoSql = `select 
							max(cpu) as temp_maxima, 
							min(cpu) as temp_minima, 
							avg(cpu) as temp_media,
							max(memoria) as memoria_maxima, 
							min(memoria) as memoria_minima, 
							avg(memoria) as memoria_media 
						from tblDadosHardware`;
					

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});


module.exports = router;
