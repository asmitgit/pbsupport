﻿HRSupport.controller("MyTicketDetailsCTRL", function ($scope, HRSupportService, $rootScope, $uibModal, $routeParams, $sce, $window) {
    $scope.UserDetails = JSON.parse($window.localStorage.getItem('UserDetails'));

    $scope.isEmpty = function (str) {
        return typeof str == 'string' && !str.trim() || typeof str == 'undefined' || str === null;
    };
   
    $scope.TicketID = $routeParams.TicketID;
    
    $scope.TicketReply = '';
   
    $scope.GetTicketDetails = function () {
        var objRequest = {
            "TicketID": $scope.TicketID,
            "Type": 2,
            "EmployeeID": $scope.UserDetails.EMPData[0].EmployeeID, "UserID": $scope.UserDetails.EMPData[0].EmpID
        };
        HRSupportService.GetTicketDetails(objRequest, $scope.UserDetails.Toket).success(function (data) {
            $scope.TicketDetails = data.data.length > 1 ? data.data[0] : [];
            if ($scope.TicketDetails[0].RESULT == "1") {
                $scope.CommentList = [];
                $scope.TicketComments = data.data.length > 2 ? data.data[1] : [];

                angular.forEach($scope.TicketComments, function (value, key) {
                    value.Comments = $sce.trustAsHtml(value.Comments);
                    this.push(value);
                }, $scope.CommentList);

            }
            else {
                alert('Invalid data.');
            }
            //$scope.Selected.Status = { StatusID: $scope.TicketDetails[0].StatusID };
            //$scope.Selected.IssueType = { ISSUEID: $scope.TicketDetails[0].IssueID };
            //$scope.Selected.SubIssueType = { SUBISSUEID: $scope.TicketDetails[0].SubIssueID };
            //if (!$scope.isEmpty($routeParams.IssueID) && !$scope.isEmpty($routeParams.SubIssueID)) {
            //    $scope.Selected.IssueType = { ISSUEID: $routeParams.IssueID };
            //    $scope.Selected.SubIssueType = { SUBISSUEID: $routeParams.SubIssueID };
            //}
        });
    };
    $scope.GetTicketDetails();

    $scope.UpdateTicketRemarks = function (ReplyType) {
        var _Comments = '';

        _Comments = $scope.TicketReply;

        if ($scope.isEmpty(_Comments)) {
            alert('Remark should not be blank');
            return false;
        }

        if ($scope.isEmpty(_Comments) || _Comments.length <= 10) {
            alert('Query should be more than 10 char');
            return false;
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
                if ($scope.TicketDetails[0].StatusID == 4) {
                    var _objNoti = [{

                        "empid": $scope.TicketDetails[0].AssignToEmployeeID,
                        "uid": $scope.TicketDetails[0].AssignToEmployeeID,
                        "entID": $scope.TicketDetails[0].TicketDispID,
                        "url": "http://pbsupportuat.policybazaar.com/home.html#/pbsupport/TicketDetails/" + $scope.TicketDetails[0].TicketID,
                        "msg": "Ticket reopen : " + $scope.TicketDetails[0].TicketDispID,
                        "read": false,
                        "type": 1,
                        "CBy": "124",
                        "Source": "PBSUPPORT"
                    }]
                    HRSupportService.AddNotification(_objNoti).success(function (dataNoti) {

                    });
                }
                HRSupportService.UpdateTicketRemarks(objRequest, $scope.UserDetails.Toket).success(function (data) {
                    if (!data.error) {
                        alert('Updated sussessfully');
                        $scope.FileAttachments = [];
                        $scope.GetTicketDetails();
                        $scope.TicketReply = '';


                    }
                });
            });
        }
        else {
            if ($scope.TicketDetails[0].StatusID == 4) {
                var _objNoti = [{

                    "empid": $scope.TicketDetails[0].AssignToEmployeeID,
                    "uid": $scope.TicketDetails[0].AssignToEmployeeID,
                    "entID": $scope.TicketDetails[0].TicketDispID,
                    "url": "http://pbsupportuat.policybazaar.com/home.html#/pbsupport/TicketDetails/" + $scope.TicketDetails[0].TicketID,
                    "msg": "Ticket reopen : " + $scope.TicketDetails[0].TicketDispID,
                    "read": false,
                    "type": 1,
                    "CBy": "124",
                    "Source": "PBSUPPORT"
                }]
                HRSupportService.AddNotification(_objNoti).success(function (dataNoti) {

                });
            }
            HRSupportService.UpdateTicketRemarks(objRequest, $scope.UserDetails.Toket).success(function (data) {
                if (!data.error) {
                    alert('Updated sussessfully');
                    $scope.GetTicketDetails();
                    $scope.TicketReply = '';

                }
            });
        }
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