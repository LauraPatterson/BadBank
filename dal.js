const mongoose       = require('mongoose');

// for local testing
//const url            = 'mongodb://localhost:27017/lp-badbank';

// for docker production 
const url            = 'mongodb://lp-mongo:27017/lp-badbank';

// connect to mongo
mongoose.connect(url, {useUnifiedTopology: true}, (err, client) => {
    if (err) {
        console.log('Failed to connect to MongoDB');   
    } else {
    console.log('Connected to MongoDB!');
    }
});

// create Mongoose Schema Account
const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[A-Za-z]+[A-Za-z ]*$/.test(v);
            },
            message: props => `${props.value} is not a valid name!`
        },
        required: [true, 'Name required']
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{2,3}\.*[A-Za-z]*$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        unique: [true, 'Email already exists. Please log in'],
        required: [true, 'Email Required']
    },
    password: {
        type: String,
        minLength: [8, 'Password must be at least 8 characters long'],
        required: [true, 'Password is required']
    },
    balance: {
        type: Number,
        default: 0,
        min: [0, 'Cannot have a balance below 0'],
        required: true
    }
  });

// create Account Model
const Account = mongoose.model('Account', accountSchema);

// create user account
async function create(body){
    let result = await Account.create(body)
    .catch(err => {
        console.log(err);
        if (err.code === 11000){
            return({error: 'Email already exists. Please log in.'})
        }
        if(err.errors){
            if (err.errors.name){
                return({error: err.errors.name.message});
            }
            if (err.errors.email){
                return({error: err.errors.email.message});
            }
            if (err.errors.password){
                return({error: err.errors.password.message});
            }
        } else {
            return({error: 'Uncaught Error'});
        }
    });
    return (result);
}

// verify login
async function login (email, password){
    let result = await Account.findOne({'email': email}).catch(err => console.log(err));
    if (!result){
        return ({error: 'Email does not exist.'})
    } else if (result.password !== password) {
        return({error: 'Incorrect Password'})
    } else {
        return (result);
    }
}

// check user balance
async function balance(email){
    let result = await Account.findOne({'email': email}).catch(err => console.log(err));
    if (!result){
        return ({error: 'Email does not exist.'})
    } else {
        return ({name: result.name, balance: result.balance});
    }
}

// add to balance
async function deposit(email, amount){
    let amountNum = parseInt(amount);
    if (amountNum) {
        if (amountNum <= 0) {
            return ({error: 'Amount must be greater than 0'})
        }
        
    } else {
        return ({error: 'Not a valid number.'})
    }
    let result = await Account.findOneAndUpdate({'email': email}, {$inc: {balance: amountNum}}).catch(err => console.log(err));
    if (!result){
        return ({error: 'Email does not exist.'})
    } else {
        return ({name: result.name, balance: (result.balance + amountNum)});
    }    
}

//subtract from balance
async function withdraw(email, amount){
    let amountNum = parseInt(amount);
    if (!amountNum) {
        return ({error: 'Not a valid number.'})
    }
    amountNum = Math.abs(amountNum);
    amountSubtract = amountNum * -1;
    let result = await Account.findOne({'email': email}).catch(err => console.log(err));
    if (!result){
        return ({error: 'Email does not exist.'})
    } else {
        let result2 = await Account.findOneAndUpdate({'email': email, balance: { $gte: amountNum}}, {$inc: {balance: amountSubtract}}).catch(err => console.log(err));
        if(!result2) {
            return({error: 'Insufficient funds.'})
        } else {
            return ({name: result2.name, balance: (result2.balance + amountSubtract)});
        }
    }
}

// show all users
async function all(){
    let result = await Account.find().catch(err => console.log(err));
    return(result);
}

// delete all users
async function deleteAll(){
    let result = await Account.deleteMany().catch(err => console.log(err));
    return(result);
}

// reset the collection
async function resetDatabase(){
    try { 
    let result = await Account.deleteMany().catch(err => console.log(err));
    await Account.collection.drop().catch(err => console.log(err));
    await Account.ensureIndex({email: 1}, {unique: true}).catch(err => console.log(err));
    return(result);
    }
    catch {
        return('Error')
    }
}

module.exports = { create, all, balance, deposit, withdraw, login, deleteAll, resetDatabase}
