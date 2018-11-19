HRSupport.controller("TicketDetailsCTRL", function ($scope, HRSupportService, $rootScope, $uibModal, $routeParams, $window) {
    $scope.UserDetails = JSON.parse($window.localStorage.getItem('UserDetails'));

    $scope.isEmpty = function (str) {
        return typeof str == 'string' && !str.trim() || typeof str == 'undefined' || str === null;
    };
    $scope.Msg = '';
    $scope.Selected = { IssueType: undefined, SubIssueType: undefined, Status: undefined };
    $scope.getStatusMaster = function () {
        HRSupportService.getStatusMaster($scope.UserDetails.Toket).success(function (data) {
            $scope.StatusList = data.data.length > 0 ? data.data[0] : [];
            //if (!$scope.isEmpty($routeParams.IssueID) && !$scope.isEmpty($routeParams.SubIssueID)) {
            //    $scope.Selected.IssueType = { ISSUEID: $routeParams.IssueID };
            //    $scope.Selected.SubIssueType = { SUBISSUEID: $routeParams.SubIssueID };
            //}
        });
    };

    $scope.GetAllIssueSubIssue = function () {
        HRSupportService.getAllIssueSubIssue($scope.UserDetails.Toket).success(function (data) {
            $scope.IssueSubIssue = data.data.length > 0 ? data.data[0] : [];
            //if (!$scope.isEmpty($routeParams.IssueID) && !$scope.isEmpty($routeParams.SubIssueID)) {
            //    $scope.Selected.IssueType = { ISSUEID: $routeParams.IssueID };
            //    $scope.Selected.SubIssueType = { SUBISSUEID: $routeParams.SubIssueID };
            //}
        });
    };
    $scope.GetAllIssueSubIssue();
    $scope.getStatusMaster();
    $scope.TicketID = $routeParams.TicketID;
    $scope.ActivType = 1;
    $scope.ChangeActive = function (type) {
        $scope.ActivType = type;
    };
    $scope.TicketReply = '';
    $scope.HRComments = '';
    $scope.GetTicketDetails = function () {
        var objRequest = {
            "TicketID": $scope.TicketID
        };
        HRSupportService.GetTicketDetails(objRequest, $scope.UserDetails.Toket).success(function (data) {
            $scope.TicketDetails = data.data.length > 1 ? data.data[0] : [];
            $scope.TicketComments = data.data.length > 2 ? data.data[1] : [];
            $scope.Selected.Status = { StatusID: $scope.TicketDetails[0].StatusID };
            $scope.Selected.IssueType = { ISSUEID: $scope.TicketDetails[0].IssueID };
            $scope.Selected.SubIssueType = { SUBISSUEID: $scope.TicketDetails[0].SubIssueID };
            //if (!$scope.isEmpty($routeParams.IssueID) && !$scope.isEmpty($routeParams.SubIssueID)) {
            //    $scope.Selected.IssueType = { ISSUEID: $routeParams.IssueID };
            //    $scope.Selected.SubIssueType = { SUBISSUEID: $routeParams.SubIssueID };
            //}
        });
    };
    $scope.GetTicketDetails();

    $scope.UpdateTicketRemarks = function (ReplyType) {
        var _Comments='';
        if(ReplyType==2){
            _Comments = $scope.TicketReply;
        }
        else{
            _Comments= $scope.HRComments ;
        }
        var objRequest = {
            "TicketID": $scope.TicketID,
            "Comments": _Comments,
            "CreatedBy": $scope.UserDetails.EMPData[0].EmpID,
            "ReplyType": ReplyType,
            "FileURL": "",
            "FileName": ""
        };
        if ($scope.FileAttachments.length > 0) {
            HRSupportService.UploadFile($scope.FileAttachments, $scope.UserDetails.Toket).success(function (data) {
                console.log(data);
                $scope.FileAttachments = data
                objRequest.FileURL = $scope.FileAttachments[0].AttachmentURL;
                objRequest.FileName = $scope.FileAttachments[0].FileName;
                HRSupportService.UpdateTicketRemarks(objRequest, $scope.UserDetails.Toket).success(function (data) {
                    if (!data.error) {
                        alert('Updated sussessfully');
                        if (ReplyType == 2) {
                            $scope.TicketReply = '';
                        }
                        else {
                            $scope.HRComments = '';
                        }
                        $scope.GetTicketDetails();
                    }
                });
            });
        }
        else {
            HRSupportService.UpdateTicketRemarks(objRequest, $scope.UserDetails.Toket).success(function (data) {
                if (!data.error) {
                    alert('Updated sussessfully');
                    if (ReplyType == 2) {
                        $scope.TicketReply = '';
                    }
                    else {
                        $scope.HRComments = '';
                    }
                    $scope.GetTicketDetails();
                }
            });
        }
      
    };
    $scope.minDate = new Date();
    $scope.UpdateTicketDetails = function (ReplyType) {
        var _Comments = '';
        if (ReplyType == 1) {
            _Comments = $scope.TicketReply;
        }
        else {
            _Comments = $scope.HRComments;
        }
        var objRequest = {
            "TicketID": $scope.TicketID,
            "CreatedBy": $scope.UserDetails.EMPData[0].EmpID,
            "StatusID": $scope.Selected.Status.StatusID,
            "IssueID": $scope.Selected.IssueType.ISSUEID,
            "SubIssueID": $scope.Selected.SubIssueType.SUBISSUEID,
            "FollowUp": $scope.isEmpty($scope.TicketDetails[0].FollowUp) ? '' : moment($scope.TicketDetails[0].FollowUp).format("YYYY-MM-YY")
        };

        HRSupportService.UpdateTicketDetails(objRequest, $scope.UserDetails.Toket).success(function (data) {
            if (!data.error) {
                alert('Updated sussessfully');
                $scope.GetTicketDetails();
            }
        });

    };

    $scope.FileAttachments = [];
    $scope.file_changed = function (element) {
        //debugger;
        $scope.FileAttachments = [];
        var FileData = [];

        $scope.$apply(function (scope) {
            //$scope.DocumentList
            var j = 0; var k = element.files.length;
            for (var i = 0 ; i < element.files.length; i++) {
                var photofile = element.files[i];

                var fileReader = new FileReader();
                var _img = {
                    "FileName": photofile.name,
                    "AttachemntContent": '',//btoa(fileLoadedEvent.target.result),
                    "AttachmentURL": ""
                };
                FileData.push(_img);

                fileReader.onload = function (fileLoadedEvent) {

                    if (fileLoadedEvent.target.readyState == FileReader.DONE) {
                        FileData[j].AttachemntContent = btoa(fileLoadedEvent.target.result);
                        FileData[j].FileName
                        j++;
                        if (j == k) {
                            $scope.FileAttachments = FileData;
                            $scope.$apply();
                        }
                    }
                    //$scope.FileName = element.files[0].name;
                    //$scope.Size = element.files[0].size
                    //$scope.FileStringData = btoa(fileLoadedEvent.target.result);

                };
                if (element.files.length > 0) {
                    fileReader.readAsBinaryString(photofile);
                }
            }

        });

        //alert($scope.FileAttachments.length);
    };
});