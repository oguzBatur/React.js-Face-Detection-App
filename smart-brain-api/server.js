const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const cors = require('cors');
const config = require('./config.js');

//KNEX
const db = require('knex')({
    client: 'pg',
    connection: {
        host: config.host,
        user: config.userName,
        password: config.dbID,
        database: config.database
    }
});
////



//! Functions

const knexScraper = (dataB, req) => {
    const {email, name, joined} = req.body;
    dataB('users')
        .returning('*')
        .insert({
        email: email,
        name: name,
        joined: new Date()
    })
        .then(user => console.log(user))
        .catch(err => console.log('Unable to register.'))
}



app.use(express.json());
app.use(cors());




//! ROOT ROUTE
app.get('/', (req, res) => {


});

//! SIGNIN ROUTE
app.post('/signin', (req, res) => {


});

//! REGISTER ROUTE
app.post('/register', (req, res) => {
    const { email, name, password} = req.body;
    db('users').insert({
        email: email,
        name: name,
        joined: new Date()
    }).then(console.log)

});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
})

app.put('/image', (req,res) => {
    const {id} = req.body;
})

//! LISTEN TO PORT
app.listen(3000, () =>{
    console.log('App is running on port 3000');
    
});



/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
