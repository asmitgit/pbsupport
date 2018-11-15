HRSupport.controller("homeCTRL", function ($scope, HRSupportService, $rootScope, $uibModal, $routeParams, $window) {
   
    $scope.isEmpty = function (str) {
        return typeof str == 'string' && !str.trim() || typeof str == 'undefined' || str === null;
    };
    $scope.Msg = '';
    $scope.Selected = { IssueType: undefined, SubIssueType: undefined };
    $scope.GetAllIssueSubIssue = function () {
        HRSupportService.getAllIssueSubIssue("").success(function (data) {
            $scope.IssueSubIssue = data.data.length > 0 ? data.data[0] : [];
            if (!$scope.isEmpty($routeParams.IssueID) && !$scope.isEmpty($routeParams.SubIssueID)) {
                $scope.Selected.IssueType = { ISSUEID: $routeParams.IssueID };
                $scope.Selected.SubIssueType = { ISSUEID: $routeParams.IssueID, SUBISSUEID: $routeParams.SubIssueID };
            }
        });
    };
    $scope.GetAllIssueSubIssue();

    $scope.search = function () {
        var _url = '/faq.html?id=' + $scope.Selected.SubIssueType.ISSUEID + '&subissue=' + $scope.Selected.SubIssueType.SUBISSUEID;
        $window.location.href = _url;
    };
});