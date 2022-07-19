const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');


// initializations
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

require('./database');
require('./passport/local-auth');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.static( __dirname + '/public'));
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.user = req.user;
  //console.log(app.locals)
  next();
});




// routes
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));
app.use('/category', require('./routes/category'));

//socketio 

let date = new Date;
const mesagges = [
  {
      email: "System",
      message: "Bienvenido",
      hour: `[${date.getHours()}:${date.getMinutes()}]` // envio la fecha en formato [hora:minutos] de cuando se conecta el socket
  }
];

io.on('connection', (socket) => {
  console.log('a user connected');

  //disconect
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  //envio los mensajes históricos
  socket.emit('historic messages', mesagges)

  //escucho nuevos mensajes
  socket.on('new message', data => {
    mesagges.push(data)
    io.sockets.emit('historic messages', mesagges)
  })

});

// Starting the server
server.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
