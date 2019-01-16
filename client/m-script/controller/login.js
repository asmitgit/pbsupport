HRSupport.controller("LoginCTRL", function ($scope, HRSupportService, $rootScope, $uibModal, $routeParams, $window) {
    var modalInstanceSameCtrl; $scope.cancel = function () { modalInstanceSameCtrl.close() }; $scope.OpenLogin = function (data) { modalInstanceSameCtrl = $uibModal.open({ animation: !0, size: 'sml', controller: "LoginCTRL", templateUrl: 'light/login.html' }) }; $scope.EmployeeID = ""; $scope.Password = ""; function getParameterByName(name) { name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search); return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")) }
    $scope.isEmpty = function (str) { return typeof str == 'string' && !str.trim() || typeof str == 'undefined' || str === null }; $scope.IsFAQ = !1; if (getParameterByName("issue") != '') { $scope.IsFAQ = !0 }
    $scope.Login = function () {
        if ($scope.isEmpty($scope.EmployeeID) || $scope.isEmpty($scope.EmployeeID)) { alert('User name & password could not be blank'); return !1 }
        var objLogin = { "username": $scope.EmployeeID, "password": $scope.Password }; HRSupportService.login(objLogin).success(function (data) {
            debugger; console.log(data); if (data.error)
            { alert(data.message); return !1 }
            $window.localStorage.removeItem('UserDetails'); $window.localStorage.setItem('UserDetails', JSON.stringify({ "EMPData": data.data[0], "Token": data.token, "IsLocSet": 0, "Location": data.data[1], "Issue": { "IssueID": getParameterByName("issue"), "SubIssueID": getParameterByName("subissue") } })); $scope.UserDetails = JSON.parse($window.localStorage.getItem('UserDetails')); if (('4').indexOf(data.data[0][0].RoleID) >= 0) {
                if (getParameterByName("issue") != '') { $window.location.href = '/home.html#/pbsupport/CreateTicket/' + getParameterByName("issue") + '/' + getParameterByName("subissue") }
                else { $window.location.href = '/home.html#/pbsupport/MyTickets' }
            }
            else { $window.location.href = '/home.html#/pbsupport/MyTickets' }
        })
    }; $scope.Msg = ''
})