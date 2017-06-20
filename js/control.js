module.exports = {
// For customer to enter info
    createRequest: function (req, res) {
        let params = [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.phone,
            req.body.dateOfEvent
        ]
        req.app.get('db').cater_request_post(params).then(function (response) {
            res.send('Request sent' + response)
        }).catch(function (err) {
            console.log(err)
            res.status(500).send(err)
        })
    },
    // For admin to view all customer requests
    getAllRequests: function (req, res) {
        req.app.get('db').cater_request_get().then(function (response) {
            res.send(response)
        }).catch(function (err) {
            console.log(err)
            res.status(500).send(err)
        })
    },
    // // For admin to add in
    addToRequests: function (req, res) {
        let params = [
            req.body.dateOfSale,
            req.body.orderPlaces,
        ]
        req.app.get('db').cater_request_admin_post(params).then(function (response) {
            res.send('Info updated.' + response)
        }).catch(function (err) {
            res.status(500).send(err)
        })
    },
    createUser: function (req, res) {
        let params = [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.phone
        ]
        req.app.get('db').employee_basic_info_post(params).then(function (response) {
            res.send('Employee added.' + response)
        }).catch(function (err) {
            console.log(err)
            res.status(500).send(err)
        })
    },
    getAllEmployees: function (req, res) {
        req.app.get('db').employee_get().then(function (response) {
            res.send(response)
        }).catch(function (err) {
            console.log(err)
            res.status(500).send(err)
        })
    },
    addToEmployee: function (req, res) {
        let params = [
            req.body.customers,
            req.body.dateOfSale,
        ]
        req.app.get('db').employee_update_post(params).then(function (response) {
            res.send('Employee updated.' + response)
        }).catch(function (err) {
            console.log(err)
            res.status(500).send(err)
        })
    },
}