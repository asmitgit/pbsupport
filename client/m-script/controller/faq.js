HRSupport.controller("FAQCtrl", function ($scope, HRSupportService, $rootScope, $uibModal, $routeParams, $window) {
    $scope.OpenLogin = function (data) { $scope.Login.EmployeeID = ""; $scope.Login.Password = ""; $scope.IsNo = 1; $scope.SelectedFAQ = data }; $scope.LoginData = { EmployeeID: "", Password: "" }; $scope.Cancel = function (data) { $scope.IsNo = 0 }; $scope.NoClick = function (data) { data.IsNo = !0 }; $scope.Login = function () {
        var objLogin = { "username": $scope.LoginData.EmployeeID, "password": $scope.LoginData.Password }; HRSupportService.login(objLogin).success(function (data) {
            console.log(data); if (data.error) { alert(data.message); return !1 }
            $window.localStorage.removeItem('UserDetails'); $window.localStorage.setItem('UserDetails', JSON.stringify({ "EMPData": data.data[0], "Token": data.token, "IsLocSet": 0, "Location": data.data[1], "Issue": { "IssueID": getParameterByName("issue"), "SubIssueID": getParameterByName("subissue") } })); $scope.UserDetails = JSON.parse($window.localStorage.getItem('UserDetails')); $scope.IsNo = 0; $window.location.href = '/home.html#/pbsupport/CreateTicket/' + $scope.SelectedFAQ.IssueID + '/' + $scope.SelectedFAQ.SubIssueID
        })
    }; function getParameterByName(name) { name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search); return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")) }
    $scope.KeyValue = ''; if (getParameterByName('key') != '') { $scope.KeyValue = getParameterByName('key') }
    $scope.IsNo = 0; $scope.IsTag = 0; $scope.GetFAQ = function () {
        var _objGetFAQ = { "ISSUEID": 0, "SUBISSUEID": 0, "KeyWord": 'blank' }; HRSupportService.GetFAQ(_objGetFAQ).success(function (data) {
            $scope.FAQData = data.data.length > 0 ? data.data[0] : []; if (parseInt(getParameterByName('id')) > 0) {
                angular.forEach($scope.FAQData, function (value, key) {
                    if (value.IssueID == parseInt(getParameterByName('id')))
                        value.FAQIsActive = 1; else value.FAQIsActive = 0
                }); if (!$scope.isEmpty(getParameterByName('subissue'))) {
                    angular.forEach($scope.FAQData, function (value, key) {
                        if (value.SubIssueID == getParameterByName('subissue')) { value.Selected = !0; $scope.IsTag = 1 }
                        else { value.Selected = !1 }
                    })
                }
                else { angular.forEach($scope.FAQData, function (value, key) { value.Selected = !1 }) }
            }
            else { angular.forEach($scope.FAQData, function (value, key) { value.Selected = !1 }) }
        })
    }; $scope.GetFAQ(); $scope.changeActive = function (data) {
        $scope.IsTag = 0; angular.forEach($scope.FAQData, function (value, key) {
            value.Selected = !1; if (value.IssueID == data.IssueID)
                value.FAQIsActive = 1; else value.FAQIsActive = 0
        }); $scope.KeyValue = ''
    }; $scope.ChangeFAQ = function (data) {
        angular.forEach($scope.FAQData, function (value, key) {
            if (value.SubIssueID == data.SubIssueID) { value.Selected = !0; $scope.IsTag = 1 }
            else { value.Selected = !1 }
        })
    }; $scope.isEmpty = function (str) { return typeof str == 'string' && !str.trim() || typeof str == 'undefined' || str === null }
})