HRSupport.controller("MGRDashboardCTRL", function ($scope, HRSupportService, $rootScope, $uibModal, $routeParams, $window) {
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
    $scope.GetDashboardCount(4);

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

    $scope.GetAllTicketList = function (QUERY) {
        var objRequest = {
            "EmpID": $scope.UserDetails.EMPData[0].EmpID,
            "Type": 4,
            "QUERY": QUERY,
            "From": moment($scope.FromDate).format("YYYY-MM-YY"),
            "To": moment($scope.ToDate).format("YYYY-MM-YY"),
            "IssueID": $scope.Selected.IssueType ? $scope.Selected.IssueType.ISSUEID : 0,
            "SubIssueID": $scope.Selected.SubIssueType ? $scope.Selected.SubIssueType.SUBISSUEID : 0,
            "StatusID": $scope.Selected.Status ? $scope.Selected.Status.StatusID : 0
        };
        HRSupportService.GetAllTicketList(objRequest, $scope.UserDetails.Toket).success(function (data) {
            if (data.data != null) {
                $scope.TicketList = data.data.length > 1 ? data.data[0] : [];
            }
            else {

            }
        });
    };

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
    $scope.ToDate = Date.now();
    $scope.FromDate = Date.now() + ($scope.NumberOfDays * 24 * 60 * 60 * 1000);
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