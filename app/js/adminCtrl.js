angular.module('tacoShopSanMarcos').controller('adminCtrl', function ($scope, mainSvc) {
    $scope.getEmployee = (info) => {
        // this sends new employee info to db and returns updated table
        mainSvc.newEmployee(info).then(res => {
            console.log(res)
            $scope.getAllEmployees()
        })
    };

    // this displays all employees on page load
    $scope.getAllEmployees = () => {
        mainSvc.allEmployees().then(res => {
            $scope.employees = res
        })
    };
    // this gets the employees then deletes one from the screen and the DB
    $scope.getAllEmployees();
    $scope.removeEmployee = (id) => {
        mainSvc.deleteEmployee(id).then(res => {
            $scope.employees = res
        })
    };
    $scope.getAllEmployees();

    // this displays all the catering requests on the admin pages
    $scope.getAllCaterRequests = () => {
        mainSvc.allCaterRequests().then(res => {
            $scope.requests = res
        })
    };
    // this gets the catering requests then deletes one from the screen and the DB
    $scope.getAllCaterRequests();

    $scope.removeRequest = (id) => {
        console.log(id)
        mainSvc.deleteRequest(id).then(res => {
            $scope.requests = res
        })
    };
      $scope.getAllCaterRequests();








//     $scope.areYouSure(){
//     alert("Are you sure you want to delete this?")
// }



})