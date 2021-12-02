'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let tblCaixaEletronico = sequelize.define('tblCaixaEletronico',{	
		id: {
			field: 'id',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		numeroSerie: {
			field: 'numeroSerie',
			type: DataTypes.STRING,
			allowNull: false
		},	
		usuario: {
			field: 'usuario',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			field: 'senha',
			type: DataTypes.STRING,
			allowNull: false
		},
		latitude: {
			field: 'latitude',
			type: DataTypes.REAL,
			allowNull: false
		},
		longitude:  {
			field: 'longitude',
			type: DataTypes.INTEGER,
			allowNull: false
		},
        fkEmpresa: {
            field: 'fkEmpresa',
			type: DataTypes.INTEGER,
			primaryKey: true,
            foreignKey: true
        },

	}, 
	{
		tableName: 'tblCaixaEletronico', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return tblCaixaEletronico;
};
