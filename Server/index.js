const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    massive = require('massive'),
    app = module.exports = express(),
    controller = require('./control'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0'),
    config = require('./config');

//these are the middlewares

app.use(express.static(`${__dirname}./../app`));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'Bandersnatch'
}))
app.use(passport.initialize())
app.use(passport.session())



massive({
    host: 'localhost',
    port: 5432,
    database: 'Personal Project',
    user: 'postgres',
    password: config.postgrespw

}).then(db => {
    app.set('db', db)
}).catch(err => console.log("DB Err: ", err))




//this is for auth0


passport.use(new Auth0Strategy({
        domain: config.domain,
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: '/auth/callback'
    },
 function(accessToken, refreshToken, extraParams, profile, done) {
   //Find user in database
   db.getUserByAuthId([profile.id], function(err, user) {
     user = user[0];
     if (!user) { //if there isn't one, we'll create one!
       console.log('CREATING USER');
       db.createUserByAuth([profile.displayName, profile.id], function(err, user) {
         console.log('USER CREATED', userA);
         return done(err, user[0]); // GOES TO SERIALIZE USER
       })
     } else { //when we find the user, return it
       console.log('FOUND USER', user);
       return done(err, user);
     }
   })
 }
));

//THIS IS INVOKED ONE TIME TO SET THINGS UP
passport.serializeUser(function(userA, done) {
 console.log('serializing', userA);
 var userB = userA;
 //Things you might do here :
  //Serialize just the id, get other information to add to session,
 done(null, userB); //PUTS 'USER' ON THE SESSION
});

//USER COMES FROM SESSION - THIS IS INVOKED FOR EVERY ENDPOINT
passport.deserializeUser(function(userB, done) {
 var userC = userC;
 //Things you might do here :
   // Query the database with the user id, get other information to put on req.user
 done(null, userC); //PUTS 'USER' ON REQ.USER
});











app.get('/auth/me', function(req, res) {
 if (!req.user) return res.sendStatus(404);
 //THIS IS WHATEVER VALUE WE GOT FROM userC variable above.
 res.status(200).send(req.user);
})

app.get('/auth/logout', function(req, res) {
 req.logout();
 res.redirect('/');
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: '/'
}), (req, res, next) => {
    console.log(req.user)
}), 


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