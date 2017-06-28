angular.module('tacoShopSanMarcos').controller('mainCtrl', function ($scope, mainSvc) {
    $scope.getRequest = (customer) => {
        console.log(customer)
        mainSvc.newRequest(customer).then(res => {
            console.log(res)
        })
    };
    $scope.recWeather = function () {
        mainSvc.getWeather().then(function (response) {

            $scope.weather = response.data
            console.log($scope.weather)

        })
    }
})