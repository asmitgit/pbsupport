HRSupport.controller("AssignedTicketsCTRL", function ($scope, HRSupportService, $rootScope, $uibModal, $routeParams, $window) {
    $scope.UserDetails = JSON.parse($window.localStorage.getItem('UserDetails'));

    $scope.isEmpty = function (str) {
        return typeof str == 'string' && !str.trim() || typeof str == 'undefined' || str === null;
    };
    $scope.Msg = '';
    $scope.Selected = { IssueType: undefined, SubIssueType: undefined, Status: undefined };

    
    $scope.GetDashboardCount = function (_Type) {
        var objRequest = {
            "EMPID": $scope.UserDetails.EMPData[0].EmpID,
            "TYPE": _Type

        };
        HRSupportService.GetDashboardCount(objRequest, $scope.UserDetails.Toket).success(function (data) {
            $scope.TicketCount = data.data.length > 1 ? data.data[0] : [];
        });
    };
    $scope.GetDashboardCount(2);

    $scope.GetAllIssueSubIssue = function () {
        HRSupportService.getAllIssueSubIssue($scope.UserDetails.Toket).success(function (data) {
            $scope.IssueSubIssue = data.data.length > 0 ? data.data[0] : [];
            //if (!$scope.isEmpty($routeParams.IssueID) && !$scope.isEmpty($routeParams.SubIssueID)) {
            //    $scope.Selected.IssueType = { ISSUEID: $routeParams.IssueID };
            //    $scope.Selected.SubIssueType = { SUBISSUEID: $routeParams.SubIssueID };
            //}
        });
    };
    $scope.getStatusMaster = function () {
        HRSupportService.getStatusMaster($scope.UserDetails.Toket).success(function (data) {
            $scope.StatusList = data.data.length > 0 ? data.data[0] : [];
            //if (!$scope.isEmpty($routeParams.IssueID) && !$scope.isEmpty($routeParams.SubIssueID)) {
            //    $scope.Selected.IssueType = { ISSUEID: $routeParams.IssueID };
            //    $scope.Selected.SubIssueType = { SUBISSUEID: $routeParams.SubIssueID };
            //}
        });
    };
    $scope.getStatusMaster();
    $scope.GetAllIssueSubIssue();

    $scope.ActiveSearch = function (data) {
        $scope.ActiveSearchType = data;
    };
    $scope.ActiveSearchType = 2;

    function getMonth(date) {
        var month = date.getMonth() + 1;
        return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
    }

    function getDate(date) {
        var month = date.getDate();
        return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
    }
    $scope.ToDate = new Date;
    $scope.FromDate = new Date;
    $scope.TicketID = '';
    $scope.orderByField = 'CreatedON';
    $scope.reverseSort = false;
    $scope.sortData = function (columnIndex) {
        $scope.reverseSort = ($scope.sortColumn == columnIndex) ? !$scope.reverseSort : false;
        $scope.sortColumn = columnIndex;
    }
    $scope.exportData = function () {
        alasql.fn.datetime = function (dateStr) {
            var date = new Date(dateStr);
            return date.toLocaleString();
        };

        alasql('SELECT TicketDispID,EmployeeID,Name,Building,Floor,AssignName,AssignToEID,TATDate,CreatedON,ISSUENAME,SUBISSUENAME,StatusName,LastUpdatedOn,FollowUp INTO XLSX("Data_' + Date.now() + '.xlsx",{headers:true}) FROM ?', [$scope.TicketList]);
        //    TicketDetailsID AS TicketID,datetime(CreatedOn) AS CreatedOn, LeadID,IssueName AS Issue,ProductName,SupplierName,AssignedToName,
        //FollowUpOn ,LastUpdatedOn AS LastPBRepliedOn,LastRepliedOn AS LastCustomerRepliedOn INTO XLSX("Data_' + Date.now() + '.xlsx",{headers:true}) FROM ?', [$scope.TicketList]);
    };
    $scope.GetAllTicketList = function (QUERY) {
        var objRequest = {
            "EmpID": $scope.UserDetails.EMPData[0].EmpID,
            "Type": 2,
            "QUERY": QUERY,
            "From": $scope.FromDate.getFullYear() + "-" + (getMonth($scope.FromDate)) + '-' + getDate($scope.FromDate), //moment($scope.FromDate).format("YYYY-MM-YY"),
            "To": $scope.ToDate.getFullYear() + "-" + (getMonth($scope.ToDate)) + '-' + getDate($scope.ToDate), //moment($scope.FromDate).format("YYYY-MM-YY"),
            "IssueID": $scope.Selected.IssueType ? $scope.Selected.IssueType.ISSUEID : 0,
            "SubIssueID": $scope.Selected.SubIssueType ? $scope.Selected.SubIssueType.SUBISSUEID : 0,
            "StatusID": $scope.Selected.Status ? $scope.Selected.Status.StatusID : 0,
            "TicketID": $scope.TicketID.trim()
        };
        $window.localStorage.removeItem('PrevPage');
        $window.localStorage.removeItem('QueryFilter');
        $window.localStorage.setItem('QueryFilter',
            JSON.stringify(objRequest));
        $window.localStorage.setItem('PrevPage', 2);

        HRSupportService.GetAllTicketList(objRequest, $scope.UserDetails.Toket).success(function (data) {
            if (data.data != null) {
                $scope.TicketList = data.data.length > 1 ? data.data[0] : [];
            }
            else {

            }
        });
    };

    $scope.LoadPrevData = function () {
        $scope.PrevPage = JSON.parse($window.localStorage.getItem('PrevPage'));
        $scope.QueryFilter = JSON.parse($window.localStorage.getItem('QueryFilter'));
        $window.localStorage.removeItem('PrevPage');
        $window.localStorage.removeItem('QueryFilter');
        if ($scope.PrevPage == 2) {
            HRSupportService.GetAllTicketList($scope.QueryFilter, $scope.UserDetails.Toket).success(function (data) {
                if (data.data != null) {
                    $scope.TicketList = data.data.length > 1 ? data.data[0] : [];
                }
                else {

                }
            });
        }
    };
    $scope.LoadPrevData();
    //$scope.GetAllTicketList();

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
        $scope.FromDate = Date.now() - ($scope.NumberOfDays * 24 * 60 * 60 * 1000);
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
    }

});