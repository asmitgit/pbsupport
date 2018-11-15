HRSupport.controller("HomeCTRL", function ($scope, HRSupportService, $rootScope,$uibModal,
    $routeParams, $window) {
    $scope.UserDetails = JSON.parse($window.localStorage.getItem('UserDetails'));
    //$scope.CheckLogin = function () {
    //    if ($scope.UserDetails != undefined && $scope.UserDetails != null) {

    //    }
    //    else {
    //        $window.location.href = '/home.html#/Invalid';
    //    }
    //};

});