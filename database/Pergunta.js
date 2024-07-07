const sequelize = require('sequelize'); // importando require
const connection = require("./database") //importando conexão com o banco

const pergunta = connection.define('perguntas', {//deifnindo o nome da tabela
    titulo: { //definindo o campo titulo como string
        type: sequelize.STRING,
        allowNull: false //impede que o campo receba nulo
    },
    descricao: {
        type: sequelize.TEXT, //textos longos
        allownull: false
    }
});

// não cria a tabela se a tabela já existir
pergunta.sync({ force: false }).then(() => {
    console.log("Tabela criada")
})
module.exports = pergunta; //exportando pergunta 