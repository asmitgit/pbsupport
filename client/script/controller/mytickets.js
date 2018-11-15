HRSupport.controller("MyTicketsCTRL", function ($scope, HRSupportService, $rootScope, $uibModal, $routeParams, $window) {
    $scope.UserDetails = JSON.parse($window.localStorage.getItem('UserDetails'));

    $scope.isEmpty = function (str) {
        return typeof str == 'string' && !str.trim() || typeof str == 'undefined' || str === null;
    };
    $scope.Msg = '';
    $scope.Selected = { IssueType: undefined, SubIssueType: undefined, Status: undefined };
       
    $scope.GetAllTicketList = function (_type) {
        var objRequest = {
            "EmpID": $scope.UserDetails.EMPData[0].EmpID,
            "Type": 1,
            "QUERY": _type,
            "From": "1919-01-01",
            "To": "2022-01-01",
            "IssueID": 0,
            "SubIssueID": 0,
            "StatusID": 0
        };
        HRSupportService.GetAllTicketList(objRequest, $scope.UserDetails.Toket).success(function (data) {
            if (data.data != null) {
                $scope.TicketList = data.data.length > 1 ? data.data[0] : [];
            }
            else {

            }
        });
    };

    //$scope.GetAllTicketList();
    $scope.GetDashboardCount = function (_Type) {
        var objRequest = {
            "EMPID": $scope.UserDetails.EMPData[0].EmpID,
            "TYPE": _Type

        };
        HRSupportService.GetDashboardCount(objRequest, $scope.UserDetails.Toket).success(function (data) {
            $scope.TicketCount = data.data.length > 1 ? data.data[0] : [];
        });
    };
    $scope.GetDashboardCount(1);
});