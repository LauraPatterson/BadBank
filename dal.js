const { useReducer } = require( 'react' );

const MongoClient   = require('mongodb').MongoClient;
const url           = 'mongodb://localhost:27017';
let db              = null;

// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {
    console.log('Connected!');

    // connect to myproject database
    db = client.db('LauraPattersonBadBank');
});

// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance:0};
        collection.findOne({email: email}, (err, doc) => {
            if (err) { reject(err) } 
            else if (doc !== null){reject({type:'error', value:null, reason:'user already exists'})}
        });
        collection.insertOne(doc, {w:1}, (err, result) => {
            err ? reject(err) : resolve(doc);
        });
    })
}

function login (email, password){
    return new Promise((resolve, reject) => {   
        const user = db
            .collection('users')
            .findOne({email: email, password: password}, (err, doc) => {
                if (err){
                    reject(err);
                } else if (!doc){ reject({type:'error', value:null, reason:'user/password not found'});
                } else {resolve(doc);}
            });
    })
}

// check user balance
function balance(email){
    return new Promise((resolve, reject) => {   
        const user = db
            .collection('users')
            .findOne({email: email}, (err, doc) => {
                err ? reject(err) : resolve(doc)
            });
    })
}

// add to balance
function deposit(email, amount){
    return new Promise((resolve, reject) => {
        const user = db
            .collection('users')
            .findOneAndUpdate({email: email}, {$inc: {balance: parseInt(amount)}}, (err, doc) => {
                err ? reject(err) : resolve(doc);
            });
    })
}

//subtract from balance
function withdraw(email, amount){
    let amountNum = parseInt(amount)*-1;
    console.log('amount:'+ amountNum);
    return new Promise((resolve, reject) => {
        const user = db
            .collection('users')
            .findOneAndUpdate({email: email}, {$inc: {balance: amountNum}}, (err, doc) => {
                err ? reject(err) : resolve(doc);
            });
    })
}

// show all users
function all(){
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({})
            .toArray((err, docs) => {
                err ? reject(err) : resolve(docs);
            });
    }) 
}

module.exports = { create, all, balance, deposit, withdraw, login }