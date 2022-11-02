const express = require('express')
const mongoose = require('mongoose')
const rotaLogin = require('./rotas/login_rotas')
const rotaViagem = require('./rotas/viagem_rotas')
const rotaUsuario = require('./rotas/usuario_rotas')
const rotaCategoria = require('./rotas/categoria_rotas')
const loginMiddleware = require('./middleware/login_middleware')

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const trataLog = (req, res, next) => {
  console.log("Metodo", req.method);  
  console.log("URI", req.originalUrl);
  next();
  console.log("Status",res.statusCode);
}

// Configuração da conexão com o mongo
mongoose.connect('mongodb://127.0.0.1:27017/app_viagens')
  .then(() => {
    console.log("Conectado ao Mongo..");
  }).catch((error) => {
     console.log("Error>", error)
  });

app.use(trataLog);

app.use('/api/login', rotaLogin);

app.use('/categoria', rotaCategoria);

app.use(loginMiddleware.validaToken)

app.use('/api/viagens', rotaViagem);

app.use('/api/usuarios', rotaUsuario);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
