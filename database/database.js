const sequelize = require('sequelize'); //incluindo o sequelize para o banco
const connection = new sequelize('guiaperguntas', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection; //expotando a conexão