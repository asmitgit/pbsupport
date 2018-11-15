HRSupport.controller("EmployeeDirectoryCTRL", function ($scope, HRSupportService, $rootScope, $uibModal, $routeParams, $window) {
    $scope.UserDetails = JSON.parse($window.localStorage.getItem('UserDetails'));

    $scope.getAllEmployee = function () {
        var objRequest = {
            "EmployeeID": $scope.UserDetails.EMPData[0].EmpID
        };
        HRSupportService.getAllEmployee(objRequest, $scope.UserDetails.Toket).success(function (data) {
            if (data.data != null) {
                $scope.EmpData = data.data.length > 1 ? data.data[0] : [];
            }
            else {

            }
        });
    };
    $scope.getAllEmployee();


});