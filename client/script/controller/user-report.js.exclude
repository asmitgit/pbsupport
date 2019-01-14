HRSupport.controller("UserReportCTRL", function ($scope, HRSupportService, $rootScope, $uibModal, $routeParams, $window) {
    $scope.UserDetails = JSON.parse($window.localStorage.getItem('UserDetails'));

    $scope.GetUserTicketReport = function () {
        var objRequest = {
            "MgrID": $scope.UserDetails.EMPData[0].EmpID,
            "Type": 1
        };
       HRSupportService.GetUserTicketReport(objRequest, $scope.UserDetails.Toket).success(function (data) {
           if (data.data != null) {
               $scope.Report = data.data.length > 1 ? data.data[0] : [];
           }
           else {

           }
       });
   };
    $scope.GetUserTicketReport();

    $scope.GetUserTicketData = function (data, _Type) {
        var objRequest = {
            "EmpID": data.AssignTo,
            "Type": _Type
        };
        HRSupportService.GetUserTicketData(objRequest, $scope.UserDetails.Toket).success(function (ReportData) {
            if (ReportData.data != null) {
                data.SubData = ReportData.data[0];
            }
            else {

            }
        });
    };
});