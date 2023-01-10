var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', (req,res) => {
    
    dal.create(req.params.name, req.params.email,req.params.password)
        .then((user) => {
            console.log(user);
            res.send(user);
        })
        .catch((err) => res.send(err));
});

app.get('/account/login/:email/:password', (req,res) => {
    
    dal.login(req.params.email, req.params.password)
        .then((doc) => {
            console.log(doc);
            res.send(doc);
        })
        .catch((err) => res.send(err));
});

app.get('/account/deposit/:email/:amount', (req,res) => {
    
    dal.deposit(req.params.email, req.params.amount)
        .then((doc) => {
            console.log(doc);
            res.send(doc);
        });
});

app.get('/account/withdraw/:email/:amount', (req,res) => {
    
    dal.withdraw(req.params.email, req.params.amount)
        .then((doc) => {
            console.log(doc);
            res.send(doc);
        })
        .catch(res.send({name: 'error', balance: 'email not found'}));
});

app.get('/account/balance/:email', (req, res) => {
    
    dal.balance(req.params.email)
        .then((doc) => {
            console.log(doc);
            res.send(doc);
        })
        .catch(res.send({name: 'error', balance: 'email not found'}));
});

app.get('/account/all', (req,res) => {
    
    dal.all()
        .then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

var port = 3000;
app.listen(port);
console.log('Running on port: '+ port);