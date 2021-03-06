angular.module('tacoShopSanMarcos').controller('adminCtrl', function ($scope, mainSvc) {
    // this sends new employee info to db and returns updated table
    $scope.getEmployee = (info) => {
        mainSvc.newEmployee(info).then(res => {
            console.log(res)
            $scope.getAllEmployees()
            $scope.employee.firstname = ""
            $scope.employee.lastname = ""
            $scope.employee.email = ""
            $scope.employee.phone = ""
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
            // console.log(res)
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

})