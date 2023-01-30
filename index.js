const {create, all, balance, deposit, withdraw, login, deleteAll, resetDatabase} = require('./dal.js');
const express = require('express');
const cors    = require('cors');
//const bodyParser = require('body-parser');
const app     = express();

app.use(cors());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(express.static('public'));


// confirm express running
app.get('/', function(req, res){
    res.send('Express is running')
});

// create account
app.get('/account/create/:name/:email/:password', (req, res) => {
    create({
        name: req.params.name, 
        email: req.params.email,
        password: req.params.password
    })
    .then(response => {
        console.log(response);
        res.send(response);
    })
    .catch(err => console.log(err));
});

// read all accounts
app.get('/account/all', function(req, res){
    all()
    .then(response => {
        console.log(response);
        res.send(response);
    })
    .catch(err => console.log(err));
});

// check if password correct for email and returns account
app.get('/account/login/:email/:password', function(req, res){
    login(req.params.email, req.params.password)
    .then(response => {
        console.log(response);
        res.send(response);
    })
    .catch(err => console.log(err));
});

// returns specific account name and balance
app.get('/account/balance/:email', function(req, res){
    console.log(req.params.email);
    balance(req.params.email)
    .then(response => {
        console.log(response);
        res.send(response);
    })
    .catch(err => console.log(err));
});

// returns account name and updated balance
app.get('/account/deposit/:email/:amount', (req,res) => {
    deposit(req.params.email, req.params.amount)
    .then(response => {
        console.log(response);
        res.send(response);
    })
    .catch(err => console.log(err));
});

// returns account name and updated balance
app.get('/account/withdraw/:email/:amount', (req,res) => {
    withdraw(req.params.email, req.params.amount)
    .then(response => {
        console.log(response);
        res.send(response);
    })
    .catch(err => console.log(err));
});
/*uncomment for testing
// deletes all accounts
app.get('/account/delete/all', (req, res) => {
    deleteAll()
    .then(response => {
        console.log(response);
        res.send(response);
    })
    .catch(err => console.log(error));
});

// resets account Collection
app.get('/account/reset', (req, res) => {
    resetDatabase()
    .then(response => {
        console.log(response);
        res.send(response);
    })
    .catch(err => console.log(error));
});*/

const port = 3001;
app.listen(port, () => {
    console.log('Running on port '+ port + '!')
});