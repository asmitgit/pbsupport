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
    $scope.UpdateAssignmentFlag = 0;
    $scope.UpdateAssignment = function (inType) {
        if (inType == 1) {
            var _objReq = { TicketID: $scope.TicketID, AssignTo: 0, UserID: $scope.UserDetails.EMPData[0].EmpID, Type: 1 };
            HRSupportService.GetSpocListANDUpdate(_objReq, $scope.UserDetails.Toket).success(function (data) {
                $scope.SpocList = data.data.length > 0 ? data.data[0] : [];
            });
            $scope.UpdateAssignmentFlag = 1;
        }
        else if (inType == 2) {
            if ($scope.Selected.Spoc && $scope.Selected.Spoc != undefined) {
                var _objReq = { TicketID: $scope.TicketID, AssignTo: $scope.Selected.Spoc.EmpID, UserID: $scope.UserDetails.EMPData[0].EmpID, Type: 2 };
                HRSupportService.GetSpocListANDUpdate(_objReq, $scope.UserDetails.Toket).success(function (data) {
                    $scope.SpocList = data.data.length > 0 ? data.data[0] : [];
                });
                $scope.UpdateAssignmentFlag = 0;
                alert('Úpdated successfully.');
            }
            else{
                alert('Please select spoc.');
                return false;
            }
        }
        else if (inType == 3) {
            $scope.UpdateAssignmentFlag = 0;
        }
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
    $scope.IsEdit = 0;
    $scope.EditCancel = function (type) {
        $scope.IsEdit = type;
    };
    $scope.TicketReply = '';
    $scope.HRComments = '';
    $scope.GetTicketDetails = function () {
        var objRequest = {
            "TicketID": $scope.TicketID
        };
        HRSupportService.GetTicketDetails(objRequest, $scope.UserDetails.Toket).success(function (data) {
            $scope.TicketDetails = data.data.length > 1 ? data.data[0] : [];
            $scope.Location = data.data.length > 1 ? data.data[2] : [];
            $scope.TicketComments = data.data.length > 2 ? data.data[1] : [];
            $scope.Selected.Status = { StatusID: $scope.TicketDetails[0].StatusID };
            $scope.Selected.IssueType = { ISSUEID: $scope.TicketDetails[0].IssueID };
            $scope.Selected.SubIssueType = { SUBISSUEID: $scope.TicketDetails[0].SubIssueID };
            $scope.TicketDetails[0].FollowUp = new Date($scope.TicketDetails[0].FollowUp) ;
            //if (!$scope.isEmpty($routeParams.IssueID) && !$scope.isEmpty($routeParams.SubIssueID)) {
            //    $scope.Selected.IssueType = { ISSUEID: $routeParams.IssueID };
            //    $scope.Selected.SubIssueType = { SUBISSUEID: $routeParams.SubIssueID };
            //}
            
            if ($scope.TicketDetails[0].StatusID == 4 || $scope.TicketDetails[0].StatusID == 6) {
                $scope.InActive = true;
            }
            else if ($scope.TicketDetails[0].StatusID == 5) {
                $scope.StatusList.splice(5, 1);
                $scope.StatusList.splice(0, 3);
            }
            else {
                $scope.StatusList.splice(4, 2);
            }
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
        if ($scope.isEmpty(_Comments)) {
            alert('Remark should not be blank.');
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
                HRSupportService.UpdateTicketRemarks(objRequest, $scope.UserDetails.Toket).success(function (data) {
                    if (!data.error) {
                        alert('Updated sussessfully');
                        $scope.FileAttachments = [];
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
                    $scope.FileAttachments = [];
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
                //"FollowUp": $scope.isEmpty($scope.TicketDetails[0].FollowUp) ? '' : moment($scope.TicketDetails[0].FollowUp).format("YYYY-MM-YY")
                "FollowUp": $scope.isEmpty($scope.TicketDetails[0].FollowUp) ? '' : $scope.TicketDetails[0].FollowUp.getFullYear() + "-" + (getMonth($scope.TicketDetails[0].FollowUp)) + '-' + getDate($scope.TicketDetails[0].FollowUp)
            };

            HRSupportService.UpdateTicketDetails(objRequest, $scope.UserDetails.Toket).success(function (data) {
                if (!data.error) {
                    alert('Updated sussessfully');
                    $scope.GetTicketDetails();
                    $scope.IsEdit = 0;
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

    /*
   Datepicker
   */

    $scope.noitems = [];

    $scope.clickRow = function () {
        alert('You clicked the row.');
    }

    function swapBeforeAndAfterDecimal(number) {
        var beforeDecimal = Math.floor(number).toString();
        var afterDecimal = number.toString().replace(/.*\./, '');

        return afterDecimal + '.' + beforeDecimal;
    }

    $scope.centsThenDollars = function (a, b) {
        var aSwapped = swapBeforeAndAfterDecimal(a);
        var bSwapped = swapBeforeAndAfterDecimal(b);

        if (aSwapped > bSwapped) {
            return 1;
        } else if (aSwapped === bSwapped) {
            return 0;
        } else {
            return -1;
        }
    }

    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };
    $scope.NumberOfDays = 0;
    $scope.ToDate = Date.now();
    
    $scope.DateChange = function () {
        if ($scope.Selected.DateRange.ID == 1) {
            $scope.NumberOfDays = 0;
        }
        else if ($scope.Selected.DateRange.ID == 2) {
            $scope.NumberOfDays = 7;
        }
        else if ($scope.Selected.DateRange.ID == 3) {
            $scope.NumberOfDays = 15;
        }
        else if ($scope.Selected.DateRange.ID == 4) {
            $scope.NumberOfDays = 30;
        }

        $scope.ToDate = Date.now();
        //$scope.FromDate = Date.now() - ($scope.NumberOfDays * 24 * 60 * 60 * 1000);
    };
    $scope.dateOptions = {
        //dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
          mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
      {
          date: tomorrow,
          status: 'full'
      },
      {
          date: afterTomorrow,
          status: 'partially'
      }
    ];

    function getDayClass(data) {
        var date = data.date,
          mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };
    function getMonth(date) {
        var month = date.getMonth() + 1;
        return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
    };

    function getDate(date) {
        var month = date.getDate();
        return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
    };


});