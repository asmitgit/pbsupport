HRSupport.controller("FAQCtrl", function ($scope, HRSupportService, $rootScope,$uibModal, $routeParams, $window) {
    
    // var modalInstanceSameCtrl;

    // $scope.cancel = function () {
    //     modalInstanceSameCtrl.close();
    // };
    
    // $scope.OpenLogin = function (data) {
    //     // modalInstanceSameCtrl = $uibModal.open({
    //     //     animation: true,
    //     //     size: 'sml',
    //     //     //scope: $scope,
    //     //     controller: "LoginCTRL",
    //     //     templateUrl: 'light/login.html'
    //     // });
    //     $window.location.href = '/light/login.html';
    // };
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    $scope.KeyValue = '';

    if (getParameterByName('key') != '') {
        $scope.KeyValue = getParameterByName('key');
    }
    $scope.GetFAQ = function () {
        var _objGetFAQ = { "ISSUEID": 0, "SUBISSUEID": 0, "KeyWord": 'blank'};

        HRSupportService.GetFAQ(_objGetFAQ).success(function (data) {

            $scope.FAQData = data.data.length > 0 ? data.data[0] : [];
            if (parseInt(getParameterByName('id')) > 0) {
                angular.forEach($scope.FAQData, function (value, key) {
                    if (value.IssueID == parseInt(getParameterByName('id')))
                        value.FAQIsActive = 1;
                    else
                        value.FAQIsActive = 0;
                });
                if (!$scope.isEmpty(getParameterByName('subissue'))) {
                    //$scope.KeyValue = getParameterByName('subissue');
                    angular.forEach($scope.FAQData, function (value, key) {
                        if (value.SubIssueID == getParameterByName('subissue')) {
                            value.Selected = true;
                        }
                        else {
                            value.Selected = false;
                        }
                    });
                }
                else {
                    angular.forEach($scope.FAQData, function (value, key) {
                        value.Selected = true;
                    });
                }
            }
            else {
                angular.forEach($scope.FAQData, function (value, key) {
                    value.Selected = true;
                });
            }
        });

    };

    $scope.GetFAQ();

    $scope.changeActive = function (data) {
        angular.forEach($scope.FAQData, function (value, key) {
            value.Selected = true;
            if(value.IssueID==data.IssueID)
                value.FAQIsActive=1;
            else
                value.FAQIsActive=0;
        });
        $scope.KeyValue = '';
    };

    $scope.ChangeFAQ = function (data) {
        angular.forEach($scope.FAQData, function (value, key) {
            if (value.SubIssueID == data.SubIssueID) {
                value.Selected = true;
            }
            else {
                value.Selected = false;
            }
        });
    };

    $scope.isEmpty = function (str) {
        return typeof str == 'string' && !str.trim() || typeof str == 'undefined' || str === null;
    };
 

});