var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var tblDadosHardware = require('../models').tblDadosHardware;
var env = process.env.NODE_ENV || 'development';

/* Recuperar as últimas N tblDadosHardwares */
router.get('/ultimasCPU/:idCaixaEletronico/:id_usuario', function(req, res, next) {
	
	// quantas são as últimas tblDadosHardwares que quer? 7 está bom?
	const limite_linhas = 4;

	var idCaixaEletronico = req.params.idCaixaEletronico;
	var id_usuario = req.params.id_usuario;

	console.log(`Recuperando as ultimas ${limite_linhas} tblDadosHardwares`);
	
	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select 
		dataHora,
		cpu,  
		DATE_FORMAT(dataHora,'%H:%i:%s') as dataHora_grafico
		from tblDadosHardware
		where fkEmpresa = ${id_usuario} and fkCaixaEletronico = ${idCaixaEletronico}
		order by id desc limit ${limite_linhas}`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top ${limite_linhas} 
		cpu, 
		dataHora,
		FORMAT(dataHora,'HH:mm:ss') as dataHora_grafico
		from tblDadosHardware
		where fkEmpresa = ${id_usuario} and fkCaixaEletronico = ${idCaixaEletronico}
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


router.get('/tempo-real-cpu/:idCaixaEletronico', function(req, res, next) {
	console.log('Recuperando');
	
	//var idCaixaEletronico = req.body.idCaixaEletronico; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idCaixaEletronico = req.params.idCaixaEletronico;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select DATE_FORMAT(dataHora,'%H:%i:%s') as dataHora_grafico, cpu, fkEmpresa from tblDadosHardware where fkCaixaEletronico = ${idCaixaEletronico} order by id desc limit 4`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top 4 cpu, FORMAT(dataHora,'HH:mm:ss') as dataHora_grafico, fkEmpresa from tblDadosHardware where fkCaixaEletronico = ${idCaixaEletronico} order by id desc`;
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

router.get('/tempo-real-memoria/:idCaixaEletronico', function(req, res, next) {
	console.log('Recuperando');
	
	//var idCaixaEletronico = req.body.idCaixaEletronico; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idCaixaEletronico = req.params.idCaixaEletronico;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select DATE_FORMAT(dataHora,'%H:%i:%s') as dataHora_grafico, memoria, fkEmpresa from tblDadosHardware where fkCaixaEletronico = ${idCaixaEletronico} order by id desc limit 4`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top 4 memoria, FORMAT(dataHora,'HH:mm:ss') as dataHora_grafico, fkEmpresa from tblDadosHardware where fkCaixaEletronico = ${idCaixaEletronico} order by id desc`;
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


router.get('/ultimasMemoria/:idCaixaEletronico/:id_usuario', function(req, res, next) {
	
	// quantas são as últimas tblDadosHardwares que quer? 7 está bom?
	const limite_linhas = 4;

	var idCaixaEletronico = req.params.idCaixaEletronico;
	var id_usuario = req.params.id_usuario;

	console.log(`Recuperando as ultimas ${limite_linhas} memorias tblDadosHardwares`);
	
	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select 
		dataHora,
		memoria,  
		DATE_FORMAT(dataHora,'%H:%i:%s') as dataHora_grafico
		from tblDadosHardware
		where fkEmpresa = ${id_usuario} and fkCaixaEletronico = ${idCaixaEletronico}
		order by id desc limit ${limite_linhas}`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top ${limite_linhas} 
		memoria, 
		dataHora,
		FORMAT(dataHora,'HH:mm:ss') as dataHora_grafico
		from tblDadosHardware
		where fkEmpresa = ${id_usuario} and fkCaixaEletronico = ${idCaixaEletronico}
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


router.get('/AlertasCpu/:idCaixaEletronico', function(req, res, next) {
	console.log('Recuperando');
	
	//var idCaixaEletronico = req.body.idCaixaEletronico; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idCaixaEletronico = req.params.idCaixaEletronico;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select count(*) as AlertasCpu from tblDadosHardware where cpu>60 and fkCaixaEletronico = ${idCaixaEletronico};`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select count(*) as AlertasCpu from tblDadosHardware where cpu>60 and fkCaixaEletronico = ${idCaixaEletronico};`;
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

router.get('/AlertasMemoria/:idCaixaEletronico', function(req, res, next) {
	console.log('Recuperando');
	
	//var idCaixaEletronico = req.body.idCaixaEletronico; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idCaixaEletronico = req.params.idCaixaEletronico;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select count(*) as AlertasMemoria from tblDadosHardware where memoria>90 and fkCaixaEletronico = ${idCaixaEletronico};`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select count(*) as AlertasMemoria from tblDadosHardware where memoria>75 and fkCaixaEletronico = ${idCaixaEletronico};`;
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

router.get('/AlertasDisco/:idCaixaEletronico', function(req, res, next) {
	console.log('Recuperando');
	
	//var idCaixaEletronico = req.body.idCaixaEletronico; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idCaixaEletronico = req.params.idCaixaEletronico;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select count(*) as AlertasDisco from tblDadosHardware where disco>20 and fkCaixaEletronico = ${idCaixaEletronico};`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select count(*) as AlertasDisco from tblDadosHardware where disco>20 and fkCaixaEletronico = ${idCaixaEletronico};`;
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


router.get('/ultimasDisco/:idCaixaEletronico/:id_usuario', function(req, res, next) {
	
	// quantas são as últimas tblDadosHardwares que quer? 7 está bom?
	const limite_linhas = 4;

	var idCaixaEletronico = req.params.idCaixaEletronico;
	var id_usuario = req.params.id_usuario;

	console.log(`Recuperando as ultimas ${limite_linhas} disco tblDadosHardwares`);
	
	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select 
		dataHora,
		disco,  
		DATE_FORMAT(dataHora,'%H:%i:%s') as dataHora_grafico
		from tblDadosHardware
		where fkEmpresa = ${id_usuario} and fkCaixaEletronico = ${idCaixaEletronico}
		order by id desc limit ${limite_linhas}`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top ${limite_linhas} 
		disco, 
		dataHora,
		FORMAT(dataHora,'HH:mm:ss') as dataHora_grafico
		from tblDadosHardware
		where fkEmpresa = ${id_usuario} and fkCaixaEletronico = ${idCaixaEletronico}
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

router.get('/tempo-real-disco/:idCaixaEletronico', function(req, res, next) {
	console.log('Recuperando');
	
	//var idCaixaEletronico = req.body.idCaixaEletronico; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idCaixaEletronico = req.params.idCaixaEletronico;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select DATE_FORMAT(dataHora,'%H:%i:%s') as dataHora_grafico, disco, fkEmpresa from tblDadosHardware where fkCaixaEletronico = ${idCaixaEletronico} order by id desc limit 4`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top 4 disco, FORMAT(dataHora,'HH:mm:ss') as dataHora_grafico, fkEmpresa from tblDadosHardware where fkCaixaEletronico = ${idCaixaEletronico} order by id desc`;
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


router.get('/ultimasProcessos/:idCaixaEletronico/:id_usuario', function(req, res, next) {
	
	// quantas são as últimas tblDadosHardwares que quer? 7 está bom?
	const limite_linhas = 4;

	var idCaixaEletronico = req.params.idCaixaEletronico;
	var id_usuario = req.params.id_usuario;

	console.log(`Recuperando as ultimas ${limite_linhas} processos tblDadosHardwares`);
	
	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select 
		dataHora,
		processosAtivos,  
		DATE_FORMAT(dataHora,'%H:%i:%s') as dataHora_grafico
		from tblDadosHardware
		where fkEmpresa = ${id_usuario} and fkCaixaEletronico = ${idCaixaEletronico}
		order by id desc limit ${limite_linhas}`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top ${limite_linhas} 
		processosAtivos, 
		dataHora,
		FORMAT(dataHora,'HH:mm:ss') as dataHora_grafico
		from tblDadosHardware
		where fkEmpresa = ${id_usuario} and fkCaixaEletronico = ${idCaixaEletronico}
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


router.get('/tempo-real-processos/:idCaixaEletronico', function(req, res, next) {
	console.log('Recuperando');
	
	//var idCaixaEletronico = req.body.idCaixaEletronico; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idCaixaEletronico = req.params.idCaixaEletronico;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select DATE_FORMAT(dataHora,'%H:%i:%s') as dataHora_grafico, processosAtivos, fkEmpresa from tblDadosHardware where fkCaixaEletronico = ${idCaixaEletronico} order by id desc limit 4`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top 4 processosAtivos, FORMAT(dataHora,'HH:mm:ss') as dataHora_grafico, fkEmpresa from tblDadosHardware where fkCaixaEletronico = ${idCaixaEletronico} order by id desc`;
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


router.get('/alertas/:idCaixaEletronico', function(req, res, next) {
	console.log('Recuperando');
	
	//var idCaixaEletronico = req.body.idCaixaEletronico; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idCaixaEletronico = req.params.idCaixaEletronico;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select count(*) as alertas from tblDadosHardware where memoria>90 or cpu>70 and fkCaixaEletronico = ${idCaixaEletronico};`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top 1 cpu, memoria, disco from tblDadosHardware where fkCaixaEletronico = ${idCaixaEletronico} order by id desc;`;
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


router.get('/MediaDisco/:idCaixaEletronico', function(req, res, next) {
	console.log('Recuperando');
	
	//var idCaixaEletronico = req.body.idCaixaEletronico; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idCaixaEletronico = req.params.idCaixaEletronico;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select avg(disco) as MediaDisco from tblDadosHardware where fkCaixaEletronico = ${idCaixaEletronico};`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select avg(disco) as MediaDisco from tblDadosHardware where fkCaixaEletronico = ${idCaixaEletronico};`;
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

router.get('/MediaMemoria/:idCaixaEletronico', function(req, res, next) {
	console.log('Recuperando');
	
	//var idCaixaEletronico = req.body.idCaixaEletronico; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idCaixaEletronico = req.params.idCaixaEletronico;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select avg(memoria) as MediaMemoria from tblDadosHardware where fkCaixaEletronico = ${idCaixaEletronico};`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select avg(memoria) as MediaMemoria from tblDadosHardware where fkCaixaEletronico = ${idCaixaEletronico};`;
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

router.get('/MediaCpu/:idCaixaEletronico', function(req, res, next) {
	console.log('Recuperando');
	
	//var idCaixaEletronico = req.body.idCaixaEletronico; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idCaixaEletronico = req.params.idCaixaEletronico;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select avg(cpu) as MediaCpu from tblDadosHardware where fkCaixaEletronico = ${idCaixaEletronico};`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select avg(cpu) as MediaCpu from tblDadosHardware where fkCaixaEletronico = ${idCaixaEletronico};`;
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


router.get('/MediaProcessos/:idCaixaEletronico', function(req, res, next) {
	console.log('Recuperando');
	
	//var idCaixaEletronico = req.body.idCaixaEletronico; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idCaixaEletronico = req.params.idCaixaEletronico;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select avg(processosAtivos) as MediaProcessos from tblDadosHardware where fkCaixaEletronico = ${idCaixaEletronico};`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select avg(processosAtivos) as MediaProcessos from tblDadosHardware where fkCaixaEletronico = ${idCaixaEletronico};`;
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

module.exports = router;
