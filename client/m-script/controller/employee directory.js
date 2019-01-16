HRSupport.controller("EmployeeDirectoryCTRL", function ($scope, HRSupportService, $rootScope, $uibModal, $routeParams, $window) {
    $scope.UserDetails = JSON.parse($window.localStorage.getItem('UserDetails')); $scope.FilterType = [{ FilterID: 1, FilterType: 'Name' }, { FilterID: 2, FilterType: 'Employee ID' }, { FilterID: 3, FilterType: 'Email ID' }, { FilterID: 5, FilterType: 'HR Spoc(Emp ID)' }]; $scope.Selected = { FilterType: undefined }; $scope.RequestType = 0; $scope.RequestInfo = function (type) {
        if (type == $scope.RequestType) { $scope.RequestType = 0 }
        else { $scope.RequestType = type }
    }; $scope.isEmpty = function (str) { return typeof str == 'string' && !str.trim() || typeof str == 'undefined' || str === null }; $scope.RaiseRequest = function (type) {
        var _Reason = ""; if (type == 1) { _Reason = $scope.ContactReason }
        else { _Reason = $scope.CTCReason }
        if ($scope.isEmpty(_Reason) || _Reason.length <= 10) { alert('Reason should be more than 10 char'); return !1 }
        _Reason = 'Please share contact number for ' + $scope.EmpData[0].EmployeeID + '<br/>Reason : ' + _Reason; var objCreateTicket = { "EmpID": $scope.UserDetails.EMPData[0].EmpID, "RequestType": type, "TicketSubject": 'New request from ' + $scope.UserDetails.EMPData[0].EmployeeID, "Comments": _Reason, "FileURL": "", "FileName": "" }; HRSupportService.RaiseRequest(objCreateTicket, $scope.UserDetails.Toket).success(function (data) { var _EmailRequest = { "CommunicationDetails": { "LeadID": 0, "Conversations": [{ "From": "noreply-pbsupprt@policybazaar.com", "ToReceipent": data.data[0][0].EmailID.split(','), "BccEmail": ["asmit@policybazaar.com"], "CCEmail": null, "Body": "<html><body>Hi , <br/> A new ticket is raised by employee, request you to address it immediately." + " <br/>Employee Concern : " + _Reason + "<br/>Employee Details <br/>Ticket# : " + data.data[0][0].TicketDispID + "<br/>Employee Name : " + $scope.UserDetails.EMPData[0].Name + "<br/>Employee ID : " + $scope.UserDetails.EMPData[0].EmployeeID + "</body></html>", "Subject": "New request from " + $scope.UserDetails.EMPData[0].EmployeeID + " : Ticket#" + data.data[0][0].TicketDispID, "CreatedBy": "Asmit", "MailAttachments": [], "UserID": 124, "AutoTemplate": !0 }], "CommunicationType": 1 } }; HRSupportService.SendEmail(_EmailRequest).success(function (data) { }); alert('Request Raised'); $scope.RequestType = 0; $scope.ContactReason = ''; $scope.CTCReason = '' })
    }; $scope.SearchEmployee = function (type) {
        var objRequest = { "FilterID": undefined, "EmployeeID": undefined, "Key": undefined }; if (type == 1) {
            if ($scope.Selected.FilterType != undefined) { objRequest = { "FilterID": $scope.Selected.FilterType.FilterID, "EmployeeID": $scope.UserDetails.EMPData[0].EmpID, "Key": $scope.KeyValue } }
            else { alert('Please select filter type'); return !1 }
        }
        if ($routeParams.EmpID && type == 2) { objRequest = { "FilterID": 4, "EmployeeID": $scope.UserDetails.EMPData[0].EmpID, "Key": atob($routeParams.EmpID) } }
        HRSupportService.getAllEmployee(objRequest, $scope.UserDetails.Toket).success(function (data) {
            if (data.data != null) { $scope.EmpData = data.data.length > 1 ? data.data[0] : [] }
            else { }
        })
    }; $scope.OpenDetails = function (EmployeeID) { $window.location.href = '/home.html#/pbsupport/EmployeeDirectory/Details/' + btoa(EmployeeID) }; $scope.SearchEmployee(2)
})