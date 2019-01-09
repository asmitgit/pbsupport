HRSupport.controller("AllUserReportCTRL", function ($scope, HRSupportService, $rootScope, $uibModal, $routeParams, $window) {
    $scope.UserDetails = JSON.parse($window.localStorage.getItem('UserDetails'));

    $scope.GetAllUserReport = function () {
        var objRequest = {
            "MgrID": $scope.UserDetails.EMPData[0].EmpID,
            "MgrEmployeeID": $scope.UserDetails.EMPData[0].EmployeeID,
            "MgrName": $scope.UserDetails.EMPData[0].Name,
            "Type": 1
        };
        HRSupportService.GetAllUserReport(objRequest, $scope.UserDetails.Toket).success(function (data) {
            if (data.data != null) {
                $scope.Report = data.data.length > 1 ? data.data[0] : [];
            }
            else {

            }
        });
    };
    $scope.GetAllUserReport();

    $scope.GetAllUserReportData = function (data, _Type) {
        var objRequest = {
            "EmpID": data.EmployeeID,
            "Type": _Type
        };
        HRSupportService.GetAllUserReportData(objRequest, $scope.UserDetails.Toket).success(function (ReportData) {
            if (ReportData.data != null) {
                data.SubData = ReportData.data[0];
            }
            else {

            }
        });
    };
});