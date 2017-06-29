

module.exports = {
    // For customer to enter info
    createRequest: function (req, res) {
        let params = [
            req.body.firstname,
            req.body.lastname,
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
    // // For admin to add info to customer request
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
    // for admin to create new employee
    createUser: function (req, res) {
        let params = [
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            req.body.phone,
            req.body.customerSoldTo,
            req.body.dateOfSale
        ]
        req.app.get('db').employee_basic_info_post(params).then(function (response) {
            res.send('Employee added.' + response)
        }).catch(function (err) {
            console.log(err)
            res.status(500).send(err)
        })
    },
    // for admin to see all employee info
    getAllEmployees: function (req, res) {
        req.app.get('db').employee_get().then(function (response) {
            res.send(response)
        }).catch(function (err) {
            console.log(err)
            res.status(500).send(err)
        })
    }, // for admin to add info to employee
    addToEmployee: function (req, res) {
        let params = [
            req.body.customerSoldTo,
            req.body.dateOfSale
        ]
        req.app.get('db').employee_update_post(params).then(function (response) {
            res.send('Employee updated.' + response)
        }).catch(function (err) {
            console.log(err)
            res.status(500).send(err)
        })
    },
    // for admin to delete employee from DB
    removeEmployee: function (req, res) {
        let params = [
            req.params.id
        ]
        req.app.get('db').employee_delete(params).then(function (deleted) {
            req.app.get('db').employee_get().then(function (response) {
                res.send(response)
            }).catch(function (err) {
                console.log(err)
                res.status(500).send(err)
            })
        }).catch(function (err) {
            res.status(500).send(err)
        })
    },
    // for admin to delete request from DB
    removeRequest: function (req, res) {
        console.log(req.params)
        let params = [
            req.params.id
        ]
        req.app.get('db').cater_request_delete(params).then(function (deleted) {
            req.app.get('db').cater_request_get().then(function (response) {
                res.send(response)
            }).catch(function (err) {
                console.log(err)
                res.status(500).send(err)
            })
        }).catch(function (err) {
            res.status(500).send(err)
        })
    },
    // for admin to see all request info
    getAllRequests: function (req, res) {
        req.app.get('db').cater_request_get().then(function (response) {
            res.send(response)
        }).catch(function (err) {
            console.log(err)
            res.status(500).send(err)
        })
    },
    // for admin to update employees
    //       updateEmployee: function (req, res) {
    //     req.app.get('db').update_employee([req.params.id, req.body.description]).then(function (response) {
    //       res.send('Updated employee.' + response)
    //     }).catch(function (err) {
    //         console.log(err)
    //       res.status(500).send(err)
    //     })
    //   },
}