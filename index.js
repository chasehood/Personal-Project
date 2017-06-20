const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    massive = require('massive'),
    app = module.exports = express(),
    controller = require('./js/control')

//===============

app.use(express.static('./'));
app.use(bodyParser.json());
app.use(cors());



massive({
    host: 'localhost',
    port: 5432,
    database: 'Personal Project',
    user: 'postgres',

}).then(db => {
    app.set('db', db);

    app.post('/api/catering/submit-request', controller.createRequest)
    app.post('/api/catering/add-to-request', controller.addToRequests)
    app.post('/api/admin/create-user', controller.createUser)
    app.post('/api/admin/add-to-employee', controller.addToEmployee)
    app.get('/api/catering/all-requests', controller.getAllRequests)
    // app.get('/api/admin/all-employees', controller.getAllEmployees)




    const port = 3000;
    app.listen(port, () => {
        console.log('Listening on port: ', port);
    })
})