import express  from 'express';
import morgan  from 'morgan';
import cors  from 'cors';
import path  from 'path';

const app = express();
//Conection to base de datos mongo db
const mongoose = require('mongoose');
//Conexión LOCAL
//const uri = 'mongodb://localhost:27017/udemymevn';
//Conexión en la nube
const uri = 'mongodb+srv://user_mevn:Ja2JecSNQ3SkVyXC@mevn-9zteq.mongodb.net/mevn?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}
mongoose.connect(uri, options).then(
  () => { console.log('Conectado a MongoDB') },
  err => { error }
);

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas de la app
/*app.get('/',  (req, res) => {
	res.send('Hola mundo Jorge!');
});*/
app.use ('/api', require('./routes/nota'));
app.use ('/api', require('./routes/user'));
app.use ('/api/login', require('./routes/login'));
// Middleware para vue.js router mode history
const history = require('connect-history-api-fallback')
app.use(history())
app.use(express.static(path.join(__dirname, 'public')))

app.set('puerto', process.env.PORT || 3000)
app.listen(app.get('puerto'), () => {
	console.log('Servidor corriendo en: ', app.get('puerto'))
})