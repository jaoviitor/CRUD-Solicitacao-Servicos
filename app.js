const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaSolicitacao = require('./routes/solicitacao');
const rotaPedidos = require('./routes/pedidos')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false})); // apenas dados simples
app.use(bodyParser.json()); // json de entrada no body

app.use('/solicitacao', rotaSolicitacao);
app.use('/pedidos', rotaPedidos);

//TRATAMENTO PARA QUANDO NÃO FOR ENCONTRADO UMA ROTA
app.use((req, res, next) =>{
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;