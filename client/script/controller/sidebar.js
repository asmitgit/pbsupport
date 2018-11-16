HRSupport.controller("SideBarCTRL", function ($scope, HRSupportService, $rootScope, $uibModal, $routeParams, $window) {

   $scope.UserDetails = JSON.parse($window.localStorage.getItem('UserDetails'));
   
   var modalInstanceSameCtrl;

   $scope.cancel = function () {
       modalInstanceSameCtrl.close();
   };

   $scope.Selected = {
       city_name: undefined,
       area_name: undefined,
       building_name: undefined
   };

   $scope.getlocationmaster = function () {
       if ($scope.UserDetails.IsLocSet != 1) {
           HRSupportService.getlocationmaster($scope.UserDetails.Toket).success(function (data) {
               if (data.data != null) {
                   $scope.UserDetails.LocationMaster = data.data.length > 1 ? data.data[0] : [];
                   if($scope.UserDetails.Location.length>0)
                   {
                       $scope.Selected = {
                           city_name: { city_name: $scope.UserDetails.Location[0].City },
                           area_name: { city_name: $scope.UserDetails.Location[0].City, area_name: $scope.UserDetails.Location[0].Sector },
                           building_name: { city_name: $scope.UserDetails.Location[0].City, area_name: $scope.UserDetails.Location[0].Sector, building_name: $scope.UserDetails.Location[0].Building }
                       };
                   }
               }
               else {

               }
           });
       }
   };
   $scope.getlocationmaster();
   
  
   $scope.UpdateLocation = function () {
       var objRequest = {
           "EmployeeID": $scope.UserDetails.EMPData[0].EmployeeID,
           "State": $scope.UserDetails.Location[0].State,
           "City": $scope.Selected.city_name.city_name,
           "Sector": $scope.Selected.area_name.area_name,
           "Building": $scope.Selected.building_name.building_name,
           "FloorNo": $scope.UserDetails.Location[0].FloorNo ? $scope.UserDetails.Location[0].FloorNo : 0,
           "Seat": $scope.UserDetails.Location[0].Seat
       };
       HRSupportService.UpdateLocation(objRequest, $scope.UserDetails.Toket).success(function (data) {
           if (data.data != null) {
               $scope.UserDetails.Location = data.data.length > 1 ? data.data[0] : [];
               $scope.UserDetails.IsLocSet = 1;
               $window.localStorage.setItem('UserDetails',
                JSON.stringify($scope.UserDetails));
           }
           else {

           }
       });
   };
   $scope.Skip = function () {
       $scope.UserDetails.IsLocSet = 1;
       $window.localStorage.setItem('UserDetails',
        JSON.stringify($scope.UserDetails));
   };
   $scope.MenuActive = function (_type) {
       $scope.ActiveBar = _type;
   };
   $scope.ActiveBar = 1;
   //if($scope.UserDetails.EMPData[0].RoleID==5)
   //{
   //    $scope.ActiveBar = 1;
   //}
   //else {
   //    $scope.ActiveBar = 2;
   //}

   //if ($scope.UserDetails.IsLocSet == 0) {
   //    debugger;
   //    modalInstanceSameCtrl = $uibModal.open({
   //        animation: true,
   //        size: 'lg',
   //        scope: $scope,
   //        templateUrl: 'views/Location.html'
   //    });
   //}
});


HRSupport.controller("HeaderCTRL", function ($scope, HRSupportService, $rootScope, $uibModal, $routeParams, $window) {

    $scope.UserDetails = JSON.parse($window.localStorage.getItem('UserDetails'));

    var modalInstanceSameCtrl;

    $scope.cancel = function () {
        modalInstanceSameCtrl.close();
    };


    $scope.LogOut = function () {
        var objRequest = {
            "email": $scope.UserDetails.EMPData[0].EmployeeID
        };
        HRSupportService.LogOut(objRequest, $scope.UserDetails.Toket).success(function (data) {
            if (data.data != null) {
                $window.localStorage.removeItem('UserDetails');
                $window.location.href = '/';
            }
            else {

            }
        });
    };
    
});