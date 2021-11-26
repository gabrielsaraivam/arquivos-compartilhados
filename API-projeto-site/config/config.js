module.exports = {
  // Insira aqui seus dados do banco NA NUVEM AZURE
  production: {
    // altere APENAS username, password, database e host.
    username: 'overall',
    password: '',
    database: 'dbOverall',
    host: 'dboverall.database.windows.net',
    dialect: 'mssql',
    xuse_env_variable: 'DATABASE_URL',
    dialectOptions: {
      options: {
        encrypt: true
      }
    },
    pool: { 
      max: 5,
      min: 1,
      acquire: 5000,
      idle: 30000,
      connectTimeout: 5000
    }
  },

  
   // Insira aqui seus dados do banco LOCAL - MySQL Workbench
  dev: {
    // altere APENAS username, password e database.
    username: 'root',
<<<<<<< HEAD
    password: 'bandtec',
=======
    password: 'urubu100',
>>>>>>> 59d321fa38393d4d93e76ea1d608c4ea7286c804
    database: 'dbOverall',
    host: 'localhost',
    dialect: 'mysql',
    xuse_env_variable: 'DATABASE_URL',
    dialectOptions: {
      options: {
        encrypt: true
      }
    },
    pool: { 
      max: 5,
      min: 1,
      acquire: 5000,
      idle: 30000,
      connectTimeout: 5000
    }
  },
  
};
