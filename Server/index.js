const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    massive = require('massive'),
    app = module.exports = express(),
    controller = require('./control')
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0');

//these are the middlewares

app.use(express.static(`${__dirname}./../app`));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize())
app.use(passport.session())
// app.use(session({secret: '1qaz2wsx3edc4rfv5tgb'}))

// passport.use(new Auth0Strategy({
//   domain: '<chasehood.auth0.com>',
//   clientID: '<m1jnXI34oXhuDOQovCLkdRO6SfZSlqUI>',
//   clientSecret: '<5s7aENgh1DZXJdAjCkGks4eC1F4HhLxGWLLC9AcVZVfstDYVIGCM-wXYgJKSuBID>',
//   callbackURL: 'http://localhost:3000/auth/callback'
// }, function(accessToken, refreshToken, extraParams, profile, done) {
//   return done(null, profile);
// }));

massive({
    host: 'localhost',
    port: 5432,
    database: 'Personal Project',
    user: 'postgres',

}).then(db => {
    app.set('db', db);

    //  These are my endpoints

    app.post('/api/catering/submit-request', controller.createRequest)
    app.post('/api/catering/add-to-request', controller.addToRequests)
    app.post('/api/admin/create-user', controller.createUser)
    app.post('/api/admin/add-to-employee', controller.addToEmployee)
    app.get('/api/catering/all-requests', controller.getAllRequests)
    app.get('/api/admin/all-employees', controller.getAllEmployees)
    app.delete('/api/admin/remove-employee/:id', controller.removeEmployee)
    app.delete('/api/admin/remove-request/:id', controller.removeRequest)

    //  app.put('/api/admin/update-employee', controller.updateEmployee)

    const port = 3000;
    app.listen(port, () => {
        console.log('Listening on port: ', port);
    })
}).catch(err => {
    console.log(err)
})