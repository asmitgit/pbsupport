angular.module("HRSupport", ["ngRoute", "ui.bootstrap", "ui.filters"]).config(["$routeProvider",
          function ($routeProvider) {
              debugger;
        $routeProvider.
            when('/pbsupport', {
                templateUrl: 'views/dashboard.html',
                controller: 'HomeCTRL'
            })
            .when('/pbsupport/CreateTicket/:IssueID/:SubIssueID', {
                  templateUrl: 'views/createticket.html',
                  controller: 'CreateTicketCTRL'
            })
             .when('/pbsupport/CreateTicket', {
                 templateUrl: 'views/createticket.html',
                 controller: 'CreateTicketCTRL'
             })
             .when('/pbsupport/MyTickets', {
                 templateUrl: 'views/myTickets.html',
                 controller: 'MyTicketsCTRL'
             })
            .when('/pbsupport/AssignedTickets', {
                templateUrl: 'views/myAssignedTickets.html',
                controller: 'AssignedTicketsCTRL'
            })
             .when('/pbsupport/MGRDashboardTickets', {
                 templateUrl: 'views/mgrDashboard.html',
                 controller: 'MGRDashboardCTRL'
             })
              .when('/pbsupport/MySpanTickets', {
                  templateUrl: 'views/mySpanTickets.html',
                  controller: 'SpanTicketsCTRL'
              })
             .when('/pbsupport/UserReport', {
                 templateUrl: 'views/user-report.html',
                 controller: 'UserReportCTRL'
             })
            .when('/pbsupport/AdminUserReport', {
                templateUrl: 'views/admin-user-report.html',
                controller: 'mgrUserReportCTRL'
            })
            .when('/pbsupport/TicketDetails/:TicketID', {
                templateUrl: 'views/ticketDetails.html',
                controller: 'TicketDetailsCTRL'
            })
            .when('/pbsupport/MyTicketDetails/:TicketID', {
                templateUrl: 'views/MyTicketDetails.html',
                controller: 'MyTicketDetailsCTRL'
            })
            .when('/pbsupport/EmployeeDirectory', {
                templateUrl: 'views/EmployeeDirectory.html',
                controller: 'EmployeeDirectoryCTRL'
            })
             .when('/pbsupport/EmployeeDirectory/Details/:EmpID', {
                 templateUrl: 'views/EmployeeDetails.html',
                 controller: 'EmployeeDirectoryCTRL'
             })
             .when('/pbsupport/Admin/AllTickets', {
                 templateUrl: 'views/AllTickets.html',
                 controller: 'AllTicketsCTRL'
             })


            .when('/TicketSystem/OpenTicket/:UserID/:UserName/:UserRole/:ProductID/:GroupID/:EmployeeID/:TicketID', {
                templateUrl: 'view/landingpage/landingpage.html',
                controller: 'OpenTicketCtrl'
            })
            .otherwise('/pbsupport', {
                templateUrl: 'home.html',
                controller: 'HomeCTRL'
            })
    }]);