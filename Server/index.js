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




//this is for auth0

massive({
    host: 'localhost',
    port: 5432,
    database: 'Personal Project',
    user: 'postgres',

}).then(db => {
    app.set('db', db)
}).catch(err => console.log("DB Err: ", err))

passport.use(new Auth0Strategy({
        domain: config.domain,
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: '/auth/callback'
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        console.log("inside auth strategy", profile)
        // accessToken is the token to call Auth0 API (not needed in the most cases) 
        // extraParams.id_token has the JSON Web Token 
        // profile has all the information from the user 
        // return done(null, profile);
    }
));

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