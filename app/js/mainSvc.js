angular.module('tacoShopSanMarcos').service('mainSvc', function ($http) {

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
        console.log('Shaq Attack')
        return $http({
            url: '/api/admin/all-employees',
            method: 'GET'
        }).then(function (response) {
            return response.data
            //WHY DO I HAVE A PROMISE HERE AND ON MY CTRL
        })
    };
    this.allCaterRequests = () => {
        console.log('cater stuff')
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