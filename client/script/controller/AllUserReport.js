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

    $scope.GetAllUserReportByID = function (_data, _index) {

        var objRequest = {
            "MgrID": _data.EmpID,
            "MgrEmployeeID": _data.EmployeeID,
            "MgrName": _data.SNO,
            "Type": 2
        };
        HRSupportService.GetAllUserReport(objRequest, $scope.UserDetails.Toket).success(function (data) {
            if (data.data != null) {
                var _result = data.data.length > 1 ? data.data[0] : [];
                if (_result.length > 0) {
                    var _tempObj = [];
                    for (var i = 0; i < $scope.Report.length; i++) {
                        if (i == _index) {
                            $scope.Report[i].IsClicked = '1';
                            _tempObj.push($scope.Report[i]);

                            for (var j = 0; j < _result.length; j++) {
                                _tempObj.push(_result[j]);
                            }
                        }
                        else {
                            _tempObj.push($scope.Report[i]);
                        }
                    }
                    $scope.Report = _tempObj;
                    //$scope.Report.splice(_index+1, 0, data.data.length > 1 ? data.data[0] : []);
                    //_data.Report = data.data.length > 1 ? data.data[0] : [];
                    _data.SubData = [];
                }
                else {
                    _data.SubData = [];
                }
            }
            else {
                //_data.Report = [];
                _data.SubData = [];
            }
        });
    };

    $scope.GetAllUserReportData = function (_data, _Type) {
        var objRequest = {
            "EmpID": _data.EmployeeID,
            "Type": _Type
        };
        HRSupportService.GetAllUserReportData(objRequest, $scope.UserDetails.Toket).success(function (ReportData) {
            if (ReportData.data != null) {
                _data.SubData = ReportData.data[0];
                _data.Report = [];
            }
            else {
                _data.Report = [];
                _data.SubData = [];
            }
        });
    };
});