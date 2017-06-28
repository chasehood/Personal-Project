angular.module('tacoShopSanMarcos').service('mainSvc', function ($http) {
    
    this.getWeather = function() {
        return $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%202477080&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
    }

    this.newRequest = (customer) => {
        return $http({
            url: '/api/catering/submit-request',
            method: 'POST',
            data: customer
        })
    };
    this.newEmployee = (info) => {
        return $http({
            url: '/api/admin/create-user',
            method: 'POST',
            data: info
        })
    };
    this.allEmployees = () => {
        console.log('word to your mom')
        return $http({
            url: '/api/admin/all-employees',
            method: 'GET'
        }).then(function (response) {
            return response.data
            //WHY DO I HAVE A PROMISE HERE AND ON MY CTRL
        })
    };
    this.allCaterRequests = () => {
        console.log('I came to drop bombs')
        return $http({
            url: '/api/catering/all-requests',
            method: 'GET'
        }).then(function (response) {
            return response.data

        })

    };
    this.deleteEmployee = (id) => {
        return $http({
            url: '/api/admin/remove-employee/' + id,
            method: 'DELETE'
        }).then(function (newTable) {
            return newTable.data
        })
    }
    this.deleteRequest = (id) => {
        return $http({
            url: '/api/admin/remove-request/' + id,
            method: 'DELETE'
        }).then(function (newTable) {
            return newTable.data
        })
    }
    this.allRequests = () => {
        return $http({
            url: '/api/admin/all-requests',
            method: 'GET'
        }).then(function (response) {
            return response.data
        })
    };
})