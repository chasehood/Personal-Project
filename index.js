// require('dotenv').config();
const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    massive = require('massive'),
    controller = require('./control'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0'),
    config = require('./config');
    app = module.exports = express(),


// /Users/CHASE/Desktop/DevMtn/projects/personal_Project/Personal-Project/app

// /Users/CHASE/Desktop/DevMtn/projects/personal_Project/Personal-Project/Server/index.js

// "../app"

// app.use( '/app', express.static(__dirname + '../app'));

//these are the middlewares


app.use(express.static('./app'));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'iliketurtles'
}))
app.use(passport.initialize())
app.use(passport.session())

//Not needed currently

// let db;
// massive({
//     host: 'ec2-54-163-227-202.compute-1.amazonaws.com',
//     port: 5432,
//     database: 'd504q8e1ois73v',
//     user: 'jvzeizzkelnlsh',
//     password: config.postgrespw,
//     scripts: __dirname + '/Personal-Project/Server/db'

// }).then(dbinstance => {
//     app.set('db', dbinstance)
//     db = dbinstance
//     db.tables.forEach(table => console.log(table.name));

// }).catch(err => console.log("DB Err: ", err))


// console.log(process.env)
massive(process.env.DB).then(db => {
  app.set('db', db);
})

//this is for auth0


passport.use(new Auth0Strategy({
        domain: config.domain,
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: 'http://localhost:3000/auth/callback'

    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        //Find user in database
        db.run(`select * from users where authid = '${profile.id}'`).then(user => {
                user = user[0];
                if (!user) { //if there isn't one, we'll create one!
                    console.log('CREATING USER');
                    db.run(`insert into users (username, authid) values ('${profile.displayName}', '${profile.id}') returning username, authid;`)
                        .then((user) => {
                            console.log('USER CREATED', userA);
                            return done(err, user[0]); // GOES TO SERIALIZE USER
                        })
                } else { //when we find the user, return it
                    console.log('FOUND USER', user);
                    return done(null, user);
                }
            })
            .catch(err => {
                return done(err, null);
            })
    }
));

//THIS IS INVOKED ONE TIME TO SET THINGS UP
passport.serializeUser(function (userA, done) {
    console.log('serializing', userA);
    var userB = userA;
    //Things you might do here :
    //Serialize just the id, get other information to add to session,
    done(null, userB); //PUTS 'USER' ON THE SESSION
});

//USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser(function (userB, done) {
    //  var userC = userC;
    //Things you might do here :
    // Query the database with the user id, get other information to put on req.user
    done(null, userB); //PUTS 'USER' ON REQ.USER
});


app.get('/auth/me', function (req, res) {
    if (!req.user) return res.sendStatus(404);
    //THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
    res.status(200).send(req.user);
})

app.get('/auth/logout', function (req, res) {
    req.logout();
    res.redirect('/admin');
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: '/#!/admin'
}), (req, res, next) => {
    console.log()
})


//  These are my endpoints

app.post('/api/catering/submit-request', controller.createRequest)
app.post('/api/catering/add-to-request', controller.addToRequests)
app.post('/api/admin/create-user', controller.createUser)
app.post('/api/admin/add-to-employee', controller.addToEmployee)
app.get('/api/catering/all-requests', controller.getAllRequests)
app.get('/api/admin/all-employees', controller.getAllEmployees)
app.delete('/api/admin/remove-employee/:id', controller.removeEmployee)
app.delete('/api/admin/remove-request/:id', controller.removeRequest)


    // this is for my port
    const port = 3000;
    app.listen(port, () => {
        console.log('Listening on port: ', port);
    })

    // .listen(process.env.PORT || 5000)