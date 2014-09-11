/* Requisição do Express */
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Conexão com banco de dados mongodb
mongoose.connect('mongodb://localhost/tarefa');

var db = mongoose.connection;

db.once('connected', function(){
  var TarefaSchema = mongoose.Schema({
      nome: String,
      realizada: { type: Boolean, default: false }
  });

  Tarefa = mongoose.model('Tarefa', TarefaSchema);
})

/* Requisição do arquivo de msgs */
var msg = require('./config/msg');

/* Instanciação do Express*/
var app = express();

/* Configurações adicionais do Express */
/* Configurar pasta pública */
app.use(express.static(__dirname + '/public'));

app.use(methodOverride('_method'));

/* Parsear POST e JSON */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/* Utilizar EJS como mecanismo de renderização das views*/
app.set('view engine', 'ejs');

function alterarTarefas(id, status){
  tarefas.forEach(function(tarefa, index){
    if (tarefa.id == id){
      tarefas[index].realizada = JSON.parse(status);
    }
  });
}

function createTarefa(tarefa){
  novo_id = tarefas.length + 1;
  tarefas.push({id: novo_id, nome: tarefa, realizada: false});
}

/* REST - GET(Pegar), POST(Colocar), DELETE, PUT */

/* Capturar, usando o Express, uma requisição do tipo
   GET, através da URL /

   URL: localhost:3000/
*/

app.get('/', function(req, res){
    /* Renderizar uma view - EJS */
    res.render('index', {
      titulo: msg.titulo,
      conteudo: msg.conteudo
    });
});

// Isto sera removido
tarefas = [];

app.get('/tarefas', function(req, res){
    res.render('tarefas', {
      'tarefas': tarefas
    });
});

app.post('/tarefas', function(req, res){
    // createTarefa(req.body.tarefa);
    var tarefa = new Tarefa({
      nome: req.body.name
    })
    tarefa.save(function(err){
      if (!err){
        res.redirect("/tarefas");
      } else {
        console.error('Deu erro');
      }
    })
});

app.put('/tarefas/:id', function(req, res){
  var id = req.body.id;
  var status = req.body.realizada;

  alterarTarefas(id, status);

  res.json({
    status: 'ok'
  });
});



/* Configuração da porta do Express */
app.listen(3000, function(){
  console.log('App rodando na porta 3000');
});
