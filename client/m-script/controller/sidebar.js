HRSupport.controller("SideBarCTRL", function ($scope, HRSupportService, $rootScope, $uibModal, $routeParams, $sce, $window) {
    $scope.UserDetails = JSON.parse($window.localStorage.getItem('UserDetails')); var modalInstanceSameCtrl; $scope.cancel = function () { modalInstanceSameCtrl.close() }; $scope.Selected = { city_name: undefined, area_name: undefined, building_name: undefined }; $scope.getlocationmaster = function () {
        if ($scope.UserDetails.IsLocSet != 1) {
            HRSupportService.getlocationmaster($scope.UserDetails.Toket).success(function (data) {
                if (data.data != null) {
                    $scope.UserDetails.LocationMaster = data.data.length > 1 ? data.data[0] : []; if ($scope.UserDetails.Location.length > 0)
                    { $scope.Selected = { city_name: { city_name: $scope.UserDetails.Location[0].City }, floor: { floor_name: $scope.UserDetails.Location[0].FloorNo }, building_name: { city_name: $scope.UserDetails.Location[0].City, area_name: $scope.UserDetails.Location[0].Sector, building_name: $scope.UserDetails.Location[0].Building } } }
                    else { $scope.Selected = { city_name: { city_name: "Gurugram" }, } }
                }
                else { }
            })
        }
    }; $scope.getlocationmaster(); $scope.UpdateLocation = function () {
        if (!$scope.isEmpty($scope.Selected.building_name) && !$scope.isEmpty($scope.Selected.floor) && !$scope.isEmpty($scope.Selected.city_name) && !$scope.isEmpty($scope.UserDetails.Location) && $scope.UserDetails.Location.length > 0) {
            if (!$scope.isEmpty($scope.UserDetails.Location[0].Seat)) {
                var objRequest = { "EmployeeID": $scope.UserDetails.EMPData[0].EmployeeID, "State": $scope.UserDetails.Location[0].State, "City": $scope.Selected.city_name.city_name, "Sector": "", "Building": $scope.Selected.building_name.building_name, "FloorNo": $scope.Selected.floor.floor_name, "Seat": $scope.UserDetails.Location[0].Seat }; HRSupportService.UpdateLocation(objRequest, $scope.UserDetails.Toket).success(function (data) {
                    if (data.data != null) { $scope.UserDetails.Location = data.data.length > 1 ? data.data[0] : []; $scope.UserDetails.IsLocSet = 1; $window.localStorage.setItem('UserDetails', JSON.stringify($scope.UserDetails)) }
                    else { }
                })
            }
            else { alert('Please enter valid information.') }
        }
        else { alert('Please enter valid information.') }
    }; $scope.isEmpty = function (str) { return typeof str == 'string' && !str.trim() || typeof str == 'undefined' || str === null }; $scope.Skip = function () {
        if ($scope.UserDetails.Location.length > 0) { $scope.UserDetails.IsLocSet = 1; $window.localStorage.setItem('UserDetails', JSON.stringify($scope.UserDetails)) }
        else { alert("You cann't skip without saving your location details") }
    }; $scope.MenuActive = function (_type) { $scope.ActiveBar = _type }; $scope.ActiveBar = 1
}); HRSupport.controller("HeaderCTRL", function ($scope, HRSupportService, $rootScope, $uibModal, $routeParams, $sce, $window) {
    $scope.UserDetails = JSON.parse($window.localStorage.getItem('UserDetails')); var _notURL = notURL; _notURL = _notURL.replace("@empid", $scope.UserDetails.EMPData[0].EmployeeID); _notURL = _notURL.replace("@eid", $scope.UserDetails.EMPData[0].EmployeeID); _notURL = _notURL.replace("@role", $scope.UserDetails.EMPData[0].RoleID); $scope.NotificationURL = $sce.trustAsResourceUrl(_notURL); var modalInstanceSameCtrl; $scope.cancel = function () { modalInstanceSameCtrl.close() }; $scope.LogOut = function () {
        var objRequest = { "email": $scope.UserDetails.EMPData[0].EmployeeID }; HRSupportService.LogOut(objRequest, $scope.UserDetails.Toket).success(function (data) {
            if (data.data != null) { $window.localStorage.removeItem('UserDetails'); $window.location.href = '/' }
            else { }
        })
    }
})