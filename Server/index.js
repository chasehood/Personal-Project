const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    massive = require('massive'),
    app = module.exports = express(),
    controller = require('./control')

//===============

app.use(express.static(`${__dirname}./../app`));
app.use(bodyParser.json());
app.use(cors());



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