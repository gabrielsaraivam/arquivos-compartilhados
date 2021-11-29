'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let tblDadosServidor = sequelize.define('tblDadosServidor',{	
		id: {
			field: 'id',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		dataHora: {
			field: 'dataHora',
			type: DataTypes.DATE, // NÃO existe DATETIME. O tipo DATE aqui já tem data e hora
			allowNull: false
		},	
		cpu: {
			field: 'cpu',
			type: DataTypes.REAL,
			allowNull: false
		},
		memoria: {
			field: 'memoria',
			type: DataTypes.REAL,
			allowNull: false
		},
		disco: {
			field: 'disco',
			type: DataTypes.REAL,
			allowNull: false
		},
		processosAtivos:  {
			field: 'processosAtivos',
			type: DataTypes.INTEGER,
			allowNull: false
		},
        usuarioAtual:  {
			field: 'usuarioAtual',
			type: DataTypes.STRING,
			allowNull: false
		},
        fkServidor: {
            field: 'fkServidor',
			type: DataTypes.INTEGER,
			primaryKey: true,
            foreignKey: true
        },

		dataHora_grafico: {
			type: DataTypes.VIRTUAL, // campo 'falso' (não existe na tabela). Deverá ser preenchido 'manualmente' no select
			allowNull: true
		}
	}, 
	{
		tableName: 'tblDadosServidor', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return tblDadosServidor;
};