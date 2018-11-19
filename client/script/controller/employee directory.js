HRSupport.controller("EmployeeDirectoryCTRL", function ($scope, HRSupportService, $rootScope, $uibModal, $routeParams, $window) {
    $scope.UserDetails = JSON.parse($window.localStorage.getItem('UserDetails'));
    $scope.FilterType = [{ FilterID: 1, FilterType: 'Name' }, { FilterID: 2, FilterType: 'Employee ID' }, { FilterID: 3, FilterType: 'Email ID' }];
    $scope.Selected = { FilterType: undefined };
    $scope.SearchEmployee = function (type) {
        var objRequest = {
            "FilterID": undefined,
            "EmployeeID": undefined,
            "Key": undefined
        };
        if (type == 1) {
            if ($scope.Selected.FilterType != undefined) {
                objRequest = {
                    "FilterID": $scope.Selected.FilterType.FilterID,
                    "EmployeeID": $scope.UserDetails.EMPData[0].EmpID,
                    "Key": $scope.KeyValue
                };
            }
            else {
                alert('Please select filter type');
                return false;
            }
        }
       
        if ($routeParams.EmpID && type==2) {
            objRequest = {
                "FilterID": 4,
                "EmployeeID": $scope.UserDetails.EMPData[0].EmpID,
                "Key": atob($routeParams.EmpID)
            };
        }

       
        HRSupportService.getAllEmployee(objRequest, $scope.UserDetails.Toket).success(function (data) {
            if (data.data != null) {
                $scope.EmpData = data.data.length > 1 ? data.data[0] : [];
            }
            else {

            }
        });
    };

    $scope.OpenDetails = function (EmployeeID) {
        $window.location.href = '/home.html#/pbsupport/EmployeeDirectory/Details/' + btoa(EmployeeID);
    };

    $scope.SearchEmployee(2)
});
