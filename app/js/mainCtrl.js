angular.module('tacoShopSanMarcos').controller('mainCtrl', function ($scope, mainSvc) {
    $scope.getRequest = (customer) => {
        console.log("getting",customer)
        mainSvc.newRequest(customer).then(res => {
            console.log(res)
        })
    };
    // this is for current temp.
        // mainSvc.getWeather().then(function (response) {
        //     $scope.temps = response.data.main.temp.toFixed(0)
        //     // console.log($scope.temps)
        // })
 
})


