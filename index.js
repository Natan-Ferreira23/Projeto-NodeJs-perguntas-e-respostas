const express = require('express');
const app = express();
const bodyParser = require("body-parser"); //importando body-parser para pegar dados via post para o node
const porta = 3000;
const connection = require("./database/database"); // importando objeto de conexão
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
//database
connection.authenticate().then(() => {
    console.log("Conexão feita com o banco de dados !");
}).catch((msgERRO) => {
    console.log(msgERRO);
});

app.set('view engine', 'ejs'); //dizendo que a view engine é o ejs
app.use(express.static('public')); // para conseguirmos utilizar arquivos estaticos (css e etc)
app.use(bodyParser.urlencoded({ extended: false })); //decodifica dados via post para o nodejs
app.use(bodyParser.json());//dados via api

app.get("/", (req, res) => {
    //metódo equivalente ao select all do mysql
    Pergunta.findAll({
        raw: true, order: [
            ['id', 'DESC']]
    }) //ordena pela ordem descrecente (asc seria orderm crescente)
        .then((perguntas) => { //a seleção das perguntas vai para a variavel perguntas
            console.log(perguntas);//imprime no console os dados
            res.render("index", { //estamos enviando um array de objetos
                perguntas: perguntas
            });
        });

})
app.get("/perguntar", (req, res) => {
    res.status(200).render("perguntar");
});
app.post("/salvarpergunta", (req, res) => { // estamos enviando os dados do formulario via post então a rota precisa ser post
    //fazemos a requisição dos dados enviado via post
    // com as funções bodyparser, podemos acessar os dados através do name de cada input
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    Pergunta.create({ //metódo equivalente ao insert
        //campo //dado do formulário
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.status(200).redirect('/'); // após inserir os dados redireciona para a pagina principal
    });
});

app.get('/pergunta/:id', (req, res) => {
    let id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then((pergunta) => {
        if (pergunta != undefined) { //pergunta encontrada
            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [
                    ['id', 'DESC']
                ]
            }).then((respostas) => {
                res.status(200).render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        } else {
            //pergunta não encontrada
            res.redirect('/'); //redireciona para a rota da pagina principal
        }
    })
});

app.post("/responder", (req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId)
    })
});
//rodando servidor
app.listen(porta, (erro) => {
    if (erro) {
        console.log("Deu erro ao rodar")
        return;
    }
    console.log("Servidor rodando na porta: " + porta)
})