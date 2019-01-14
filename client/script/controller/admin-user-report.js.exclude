HRSupport.controller("mgrUserReportCTRL", function ($scope, HRSupportService, $rootScope, $uibModal, $routeParams, $window) {
    $scope.UserDetails = JSON.parse($window.localStorage.getItem('UserDetails'));

    $scope.GetMGRDashboard = function () {
        var objRequest = {
            "MgrEmployeeID": $scope.UserDetails.EMPData[0].EmployeeID,
            "UserEmployeeID": 0,
            "Type": 1
        };
        HRSupportService.GetMGRDashboard(objRequest, $scope.UserDetails.Toket).success(function (data) {
            if (data.data != null) {
                $scope.SupervisorList = data.data.length > 1 ? data.data[0] : [];
            }
            else {

            }
        });
    };
    $scope.GetMGRDashboard();
    $scope.GetUserCount = function (sleceteddata) {
        var objRequest = {
            "MgrEmployeeID": $scope.UserDetails.EMPData[0].EmployeeID,
            "UserEmployeeID": sleceteddata.EmpID,
            "Type": 2
        };
        var _Supervisordetails = [];
        HRSupportService.GetMGRDashboard(objRequest, $scope.UserDetails.Toket).success(function (data) {
            if (data.data != null) {
                angular.forEach($scope.SupervisorList, function (value, key) {
                    if (value.EmpID == sleceteddata.EmpID) {
                        value.IsShow = true;
                        value.Supervisordetails = data.data.length > 1 ? data.data[0] : [];;
                    }
                    else
                        value.IsShow = false;
                });
            }
            else {
                angular.forEach($scope.SupervisorList, function (value, key) {
                    if (value.EmpID == sleceteddata.EmpID) {
                        value.IsShow = true;
                        value.Supervisordetails = [];
                    }
                    else
                        value.IsShow = false;
                });
            }
        });


    };



    $scope.GetUserTicketData = function (reqdata, _Type) {
        var objRequest = {
            "EmpID": reqdata.AssignTo,
            "Type": _Type
        };
        HRSupportService.GetUserTicketData(objRequest, $scope.UserDetails.Toket).success(function (ReportData) {
            if (ReportData.data != null) {
                reqdata.SubData = ReportData.data[0];
            }
            else {

            }
        });
    };
});