angular.module('tacoShopSanMarcos').controller('mainCtrl', function ($scope, mainSvc) {
    $scope.getrequest = (customer) => {
        console.log(customer)
        mainSvc.newRequest(customer).then(res => {
            console.log(res)
        })
    };

})