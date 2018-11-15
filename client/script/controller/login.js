HRSupport.controller("LoginCTRL", function ($scope, HRSupportService, $rootScope,$uibModal, $routeParams, $window) {
    
    var modalInstanceSameCtrl;
   
    $scope.cancel = function () {
        modalInstanceSameCtrl.close();
    };
    
    $scope.OpenLogin = function (data) {
        modalInstanceSameCtrl = $uibModal.open({
            animation: true,
            size: 'sml',
            //scope: $scope,
            controller: "LoginCTRL",
            templateUrl: 'light/login.html'
        });
    };
    $scope.EmployeeID="";
    $scope.Password="";
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    $scope.Login = function () {
       
        var objLogin = { "username": $scope.EmployeeID, "password": $scope.Password };
        HRSupportService.login(objLogin).success(function (data) {
            debugger;
            console.log(data);
            if(data.error)
            {
                alert(data.message);
                return false;
            }
            $window.localStorage.removeItem('UserDetails');
            $window.localStorage.setItem('UserDetails',
                JSON.stringify({ "EMPData": data.data[0], "Token": data.token, "IsLocSet": 0, "Location": data.data[1], "Issue": { "IssueID": getParameterByName("issue"), "SubIssueID": getParameterByName("subissue") } }));
            $scope.UserDetails = JSON.parse($window.localStorage.getItem('UserDetails'));
            if (('4,6,7').indexOf(data.data[0][0].RoleID) >= 0) //spoc
            {
                $window.location.href = '/home.html#/pbsupport/AssignedTickets';
            }
            else if (('5').indexOf(data.data[0][0].RoleID) >= 0) //agent
            {
                if (getParameterByName("issue") != '') {
                    $window.location.href = '/home.html#/pbsupport/CreateTicket/' + getParameterByName("issue") + '/' + getParameterByName("subissue");
                }
                else {
                    $window.location.href = '/home.html#/pbsupport/MyTickets';
                }
            }
            else if (('3').indexOf(data.data[0][0].RoleID) >= 0)//mgr 
            {
                $window.location.href = '/home.html#/pbsupport/MyTickets';
            }
            else if (('2').indexOf(data.data[0][0].RoleID) >= 0)//admin
            {
                $window.location.href = '/home.html#/pbsupport/MyTickets';
            }
            else {
                $window.location.href = '/home.html#/pbsupport/MyTickets';
            }

            //$window.location.href = '/home.html#/pbsupport/ ;
        });
    };

   
    $scope.Msg = '';
   
});