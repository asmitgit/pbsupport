HRSupport.controller("CreateTicketCTRL", function ($scope, HRSupportService, $rootScope, $uibModal, $routeParams, $window) {
    $scope.UserDetails = JSON.parse($window.localStorage.getItem('UserDetails'));

    $scope.isEmpty = function (str) {
        return typeof str == 'string' && !str.trim() || typeof str == 'undefined' || str === null;
    };
    $scope.Msg = '';
    $scope.Selected = { IssueType: undefined, SubIssueType: undefined };
    $scope.GetAllIssueSubIssue = function () {        
        HRSupportService.getAllIssueSubIssue($scope.UserDetails.Toket).success(function (data) {
            $scope.IssueSubIssue = data.data.length > 0 ? data.data[0] : [];
            if (!$scope.isEmpty($routeParams.IssueID) && !$scope.isEmpty($routeParams.SubIssueID)) {
                $scope.Selected.IssueType = { ISSUEID: parseInt($routeParams.IssueID), SUBISSUEID: parseInt($routeParams.SubIssueID) };
                //$scope.Selected.SubIssueType = {  ISSUEID: $routeParams.IssueID, SUBISSUEID: $routeParams.SubIssueID };
            }
        });
    };
    $scope.GetAllIssueSubIssue();
    $scope.DeleteRow = function (index, type) {
        if (type == 1) {

        }
        $scope.FileAttachments.splice(index, 1);

    }
    $scope.IsDisabled = false;

    $scope.ClickOkCancel = function (clickType) {
        //ok
        if (clickType == 1) {
            $scope.IsComments = true;
            
        }
        //cancel
        else if (clickType == 2) {
            $scope.IsComments = true;
            $scope.Selected.IssueType = undefined;
            $scope.Selected.SubIssueType = undefined;
        }

       
    }

    $scope.CheckMessage = function () {       
            if ($scope.Selected.IssueType.ISSUEID == 4) {
                $scope.IsComments = false;
            }
            else {
                $scope.IsComments = true;
            }        
    }

    $scope.IsComments = true;

    $scope.CreateTicket = function () {
        $scope.IsDisabled = true;
        if ($scope.isEmpty($scope.Selected.IssueType)) {
            alert('Please select issue type');
            $scope.IsDisabled = false;
            return false;
        }
        else if ($scope.isEmpty($scope.Selected.SubIssueType)) {
            alert('Please select sub issue type');
            $scope.IsDisabled = false;
            return false;
        }
        else if ($scope.isEmpty($scope.Comments) || $scope.Comments.length<=10) {
            alert('Query should be more than 10 char');
            $scope.IsDisabled = false;
            return false;
        }
        else {
            var objCreateTicket = {
                "EmpID": $scope.UserDetails.EMPData[0].EmpID,
                "IssueID": $scope.Selected.IssueType.ISSUEID,
                "SubIssueID": $scope.Selected.SubIssueType.SUBISSUEID,
                "TicketSubject": $scope.Selected.IssueType.ISSUENAME + '(' + $scope.Selected.SubIssueType.SUBISSUENAME + ')' + $scope.UserDetails.EMPData[0].EmployeeID,
                "Comments": $scope.Comments,
                "FileURL": "",
                "FileName": ""
            };
            
            if ($scope.FileAttachments.length > 0) {
                HRSupportService.UploadFile($scope.FileAttachments, $scope.UserDetails.Toket).success(function (data) {
                    console.log(data);
                    $scope.FileAttachments = data
                    objCreateTicket.FileURL = $scope.FileAttachments[0].AttachmentURL;
                    objCreateTicket.FileName = $scope.FileAttachments[0].FileName;

                    HRSupportService.CreateNewTicket(objCreateTicket, $scope.UserDetails.Toket).success(function (data) {
                        var _EmailRequest = {
                            "CommunicationDetails": {
                                "LeadID": 0,
                                "Conversations": [
                                  {
                                      "From": "noreply-pbsupprt@policybazaar.com",
                                      "ToReceipent":
                                          data.data[0][0].EmailID.split(',')
                                      ,
                                      "BccEmail": ["asmit@policybazaar.com"],
                                      "CCEmail": null,
                                      "Body": "<html><body>Hi , <br/> A new ticket is raised by employee, request you to address it immediately. <br/><br/><br/>" +
                                          "<table border='1' style='border-collapse:collapse'>"+
                                         
                                          + "<tr> <td >EmployeeID</td>  <td>" + $scope.UserDetails.EMPData[0].EmployeeID + "</td> </tr> " +
                                          "<tr><td >Employee Name</td> <td >" + $scope.UserDetails.EMPData[0].Name + "</td> </tr> " +
                                          "<tr><td >Function Name</td> <td >" + $scope.UserDetails.EMPData[0].FunctionName + "</td> </tr> " +
                                          "<tr><td >Ticket#</td>  <td >" + data.data[0][0].TicketDispID + "</td> </tr> " +
                                          " <tr><td >Issue</td><td >" + $scope.Selected.IssueType.ISSUENAME + "</td> </tr> " +
                                          " <tr><td >Concern</td><td >" + $scope.Comments + "</td> </tr></table>"
                                          + "<br/><a href='http://pbsupport.policybazaar.com/' target='_blank'>Click here to login</a></body></html>",
                                      "Subject": "Ticket Service Request " + data.data[0][0].TicketDispID+": "
                                          + $scope.Selected.IssueType.ISSUENAME
                                         ,
                                      "CreatedBy": "Asmit",
                                      "MailAttachments": [],
                                      "UserID": 124,
                                      "AutoTemplate": true
                                  }
                                ],
                                "CommunicationType": 1
                            }
                        };
                        
                            var _objNoti = [{

                                "empid": data.data[0][0].AssignToCode,
                                "uid": data.data[0][0].AssignToCode,
                                "entID": data.data[0][0].TicketDispID,
                                "url": "http://pbsupport.policybazaar.com/home.html#/pbsupport/TicketDetails/" + data.data[0][0].TicketID,
                                "msg": "New ticket : " + data.data[0][0].TicketDispID,
                                "read": false,
                                "type": 1,
                                "CBy": "124",
                                "Source": "PBSUPPORT"
                            }]
                            HRSupportService.AddNotification(_objNoti).success(function (dataNoti) {

                            });
                       
                        HRSupportService.SendEmail(_EmailRequest).success(function (data) {

                        });
                        alert('Ticket created successfully.');
                        console.log('/home.html#/pbsupport/MyTicketDetails/' + data.data[0][0].TicketID);
                        $window.location.href = '/home.html#/pbsupport/MyTicketDetails/' + data.data[0][0].TicketID;

                       

                        //$scope.IssueSubIssue = data.data.length > 0 ? data.data[0] : [];
                        //if (!$scope.isEmpty($routeParams.IssueID) && !$scope.isEmpty($routeParams.SubIssueID)) {
                        //    $scope.Selected.IssueType = { ISSUEID: $routeParams.IssueID };
                        //    $scope.Selected.SubIssueType = { SUBISSUEID: $routeParams.SubIssueID };
                        //}
                    });
                });
            }
            else {
                HRSupportService.CreateNewTicket(objCreateTicket, $scope.UserDetails.Toket).success(function (data) {
                    var _EmailRequest = {
                        "CommunicationDetails": {
                            "LeadID": 0,
                            "Conversations": [
                              {
                                  "From": "noreply-pbsupprt@policybazaar.com",
                                  "ToReceipent": 
                                      data.data[0][0].EmailID.split(',')
                                  ,
                                  "BccEmail": ["asmit@policybazaar.com"],
                                  "CCEmail": null,
                                  "Body": "<html><body>Hi , <br/> A new ticket is raised by employee, request you to address it immediately. <br/><br/><br/>" +
                                          "<table border='1' style='border-collapse:collapse'>"
                                  + "<tr> <td >EmployeeID</td>  <td>" + $scope.UserDetails.EMPData[0].EmployeeID + "</td> </tr> " +
                                          "<tr><td >Employee Name</td> <td >" + $scope.UserDetails.EMPData[0].Name + "</td> </tr> " +
                                          "<tr><td >Function Name</td> <td >" + $scope.UserDetails.EMPData[0].FunctionName + "</td> </tr> " +
                                          "<tr><td >Ticket#</td>  <td >" + data.data[0][0].TicketDispID + "</td> </tr> " +
                                          " <tr><td >Issue</td><td >" + $scope.Selected.IssueType.ISSUENAME + "</td> </tr> " +
                                          " <tr><td >Concern</td><td >" + $scope.Comments + "</td> </tr></table>"
                                          + "<br/><a href='http://pbsupport.policybazaar.com/' target='_blank'>Click here to login</a></body></html>",
                                  "Subject": "Ticket Service Request " + data.data[0][0].TicketDispID + ": "
                                      + $scope.Selected.IssueType.ISSUENAME
                                         ,
                                  "CreatedBy": "Asmit",
                                  "MailAttachments": [],
                                  "UserID": 124,
                                  "AutoTemplate": true
                              }
                            ],
                            "CommunicationType": 1
                        }
                    };
                    var _objNoti = [{

                        "empid": data.data[0][0].AssignToCode,
                        "uid": data.data[0][0].AssignToCode,
                        "entID": data.data[0][0].TicketDispID,
                        "url": "http://pbsupport.policybazaar.com/home.html#/pbsupport/TicketDetails/" + data.data[0][0].TicketID,
                        "msg": "New ticket : " + data.data[0][0].TicketDispID,
                        "read": false,
                        "type": 1,
                        "CBy": "124",
                        "Source": "PBSUPPORT"
                    }]
                    HRSupportService.AddNotification(_objNoti).success(function (dataNoti) {

                    });
                    HRSupportService.SendEmail(_EmailRequest).success(function (data) {

                    });
                    alert('Ticket created successfully.');
                    $window.location.href = '/home.html#/pbsupport/MyTicketDetails/' + data.data[0][0].TicketID;
                    //$scope.IssueSubIssue = data.data.length > 0 ? data.data[0] : [];
                    //if (!$scope.isEmpty($routeParams.IssueID) && !$scope.isEmpty($routeParams.SubIssueID)) {
                    //    $scope.Selected.IssueType = { ISSUEID: $routeParams.IssueID };
                    //    $scope.Selected.SubIssueType = { SUBISSUEID: $routeParams.SubIssueID };
                    //}
                });
            }
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