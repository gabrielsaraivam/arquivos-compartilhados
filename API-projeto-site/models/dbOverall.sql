 create database dbOverall;
 
 use dbOverall;
 
 create table tblEmpresa(
 id int auto_increment primary key,
 nome varchar(45),
 cnpj char(19),
 email varchar(256),
 senha varchar(45)
 );
 
 
 select * from tblEmpresa;