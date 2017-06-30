angular.module('tacoShopSanMarcos').controller('mainCtrl', function ($scope, mainSvc) {
    $scope.getRequest = (customer) => {
        console.log("getting",customer)
        mainSvc.newRequest(customer).then(res => {
            console.log(res)
            $scope.request.firstname = ""
            $scope.request.lastname = ""
            $scope.request.email = ""
            $scope.request.phone = ""
        })
    };
    // this is for current temp.
        mainSvc.getWeather().then(function (response) {
            $scope.temps = response.data.main.temp.toFixed(0)
            // console.log($scope.temps)
        })
 
})


