angular.module('tacoShopSanMarcos').service('mainSvc', function ($http, config) {


    // this.getMap = function () {
    //     return $http({
    //         url: `https://maps.googleapis.com/maps/api/staticmap?key=${config.mapKey}&center=40.22908033301651,-111.66812082059022&zoom=17&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xb1414b&style=element:labels.text.fill%7Ccolor:0x174565&style=element:labels.text.stroke%7Ccolor:0x203a4e&style=feature:administrative%7Celement:geometry%7Cvisibility:off&style=feature:administrative.country%7Celement:geometry.stroke%7Ccolor:0x4b6878&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0x64779e&style=feature:administrative.province%7Celement:geometry.stroke%7Ccolor:0x4b6878&style=feature:landscape.man_made%7Celement:geometry.stroke%7Ccolor:0xecaf60&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0xb1414b&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:geometry%7Ccolor:0x283d6a&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x6f9ba5&style=feature:poi%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0x023e58&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x3C7680&style=feature:road%7Celement:geometry%7Ccolor:0xecaf61&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x024467&style=feature:road%7Celement:labels.text.stroke%7Ccolor:0x307699&style=feature:road.highway%7Celement:geometry%7Ccolor:0xecaf61%7Cvisibility:off&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0xecaf61&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xb0d5ce&style=feature:road.highway%7Celement:labels.text.stroke%7Ccolor:0x023e58&style=feature:transit%7Cvisibility:off&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:transit%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:transit.line%7Celement:geometry.fill%7Ccolor:0x283d6a&style=feature:transit.station%7Celement:geometry%7Ccolor:0x3a4762&style=feature:water%7Celement:geometry%7Ccolor:0x0e1626&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x4e6d70&size=480x360`,
    //         method:'GET'
    //     })
    // }




    this.getWeather = function () {
        return $http({
                url: `http://api.openweathermap.org/data/2.5/weather?q=Provo&units=imperial&appid=${config.weatherAPI}`,
                header: {
                    'Access-Control-Allow-Origin': '*'
                },
                method: "GET"
            })
        },
    this.newRequest = (customer) => {
        console.log(customer)
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