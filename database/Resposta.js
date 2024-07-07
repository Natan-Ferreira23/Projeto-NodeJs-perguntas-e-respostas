const sequelize = require('sequelize'); // importando require
const connection = require("./database") //importando conexão com o banco

const Resposta = connection.define("respostas", {
    corpo: {
        type: sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({ force: false }).then(() => {
    console.log("Tabela criada")
});
module.exports = Resposta;