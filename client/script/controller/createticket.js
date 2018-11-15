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
                $scope.Selected.IssueType = { ISSUEID: $routeParams.IssueID };
                $scope.Selected.SubIssueType = {  ISSUEID: $routeParams.IssueID, SUBISSUEID: $routeParams.SubIssueID };
            }
        });
    };
    $scope.GetAllIssueSubIssue();
    
    $scope.CreateTicket = function () {
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
                    alert('Ticket created successfully.');
                    $scope.Comments = '';
                    $scope.Selected.IssueType = undefined;
                    $scope.Selected.SubIssueType = undefined;
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
                alert('Ticket created successfully.');
                $scope.Comments = '';
                $scope.Selected.IssueType = undefined;
                $scope.Selected.SubIssueType = undefined;
                //$scope.IssueSubIssue = data.data.length > 0 ? data.data[0] : [];
                //if (!$scope.isEmpty($routeParams.IssueID) && !$scope.isEmpty($routeParams.SubIssueID)) {
                //    $scope.Selected.IssueType = { ISSUEID: $routeParams.IssueID };
                //    $scope.Selected.SubIssueType = { SUBISSUEID: $routeParams.SubIssueID };
                //}
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