const calendar = require('./calendar');
const EventList = calendar.EventList;

const express = require('express');
const cors = require('cors');

const session = require('express-session');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended: false});

const app = express();


app.use(cors({credentials: true, origin: true}));

app.options('*', cors());

app.use(session({
  secret: 'token',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  next();
});


app.use(function (req, res, next) {
  if(!req.session.EventList) {
    req.session.EventList = new EventList();
  }
  Object.setPrototypeOf(req.session.EventList,EventList.prototype);
  next();
});


app.get('/', function(req,res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send("Welcome to the Dr Kal Andar's API");
});


app.get('/list', function(req,res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(req.session.EventList.getAll());
});


app.get('/list/:date', function(req,res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(req.session.EventList.getEventByDate(req.query.date));
});


app.post('/add',urlEncodedParser,function(req,res) {
  let nom = req.body.nom;
  let description = req.body.description;
  let date = req.body.date;
  res.setHeader('Content-Type', 'application/json');
  req.session.EventList.add(nom,description, date);
  res.send(true);
});


app.get('/getEvent/:id', function(req,res) {
  let event = req.session.EventList.getEvent(req.query.id);
  res.setHeader('Content-Type', 'application/json');
  res.send(event);
});


app.post('/delete/',urlEncodedParser,function(req,res) {
  let id = req.body.id;
  let result = req.session.EventList.delete(id);
  res.setHeader('Content-Type', 'application/json');
  res.send(result);
});


app.listen(3000, function() {
  console.log("Dr Kal Andar's API started!");
});


module.exports = app;
