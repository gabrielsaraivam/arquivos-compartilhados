'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let tblUsuario = sequelize.define('tblUsuario',{
		id: {
			field: 'id',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		cpf: {
			field: 'cpf',
			type: DataTypes.STRING,
			allowNull: false
		},
        nome: {
			field: 'nome',
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			field: 'email',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			field: 'senha',
			type: DataTypes.STRING,
			allowNull: false
		},
		cargo: {
			field: 'cargo',
			type: DataTypes.STRING,
			allowNull: false
		},
        fkEmpresa: {
            field: 'fkEmpresa',
			type: DataTypes.INTEGER,
			primaryKey: true,
            foreignKey: true
        }
	}, 
	{
		tableName: 'tblUsuario', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return tblUsuario;
};

// cpf CHAR(11) NOT NULL,
// nome VARCHAR(45) NOT NULL,
// email VARCHAR(75) NOT NULL,
// senha VARCHAR(100) NOT NULL,
// cargo VARCHAR(45) NOT NULL,
// fkEmpresa INT,
// FOREIGN KEY (fkEmpresa) REFERENCES tblEmpresa(id)
// );