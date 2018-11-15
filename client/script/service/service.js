HRSupport.config(function ($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
});

HRSupport.service("HRSupportService", function ($http, $window) {
    this.GetFAQ = function (objGetFAQ) {
        
        var request = $http({
            method: "POST",
            url: config.serviceURL+"api/getAllFAQ",
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            },
            data:JSON.stringify(objGetFAQ)
        }).success(function (dataGetFAQ) {
            var test=dataGetFAQ;
            debugger;
            console.log(dataGetFAQ);
        })
            .error(function (error, status) {
                if (status == 401) {
                    alert('401');
                }
            });
        return request;
    }

    this.UploadFile = function (objReq) {

        var request = $http({
            method: "POST",
            url: config.fileUpload + "care.svc/UploadFile",
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            },
            data: JSON.stringify(objReq)
        }).success(function (data) {
            var test = data;
            debugger;
            console.log(data);
        })
            .error(function (error, status) {
                if (status == 401) {
                    alert('401');
                }
            });
        return request;
    }
    this.login = function (objlogin) {
        
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/auth",
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            },
            data:JSON.stringify(objlogin)
        }).success(function (data) {
            var test=data;           
        })
            .error(function (error, status) {
                if (status == 401) {
                    alert('401');
                }
            });
        return request;
    }

    this.getAllIssueSubIssue = function (Token) {

        var request = $http({
            method: "GET",
            url: config.serviceURL + "api/issue/getAllIssueSubIssue",
            headers: {
                'Content-Type': "application/json; charset=utf-8",
                'x-access-token': Token
            }
        }).success(function (dataGetFAQ) {
            var test = dataGetFAQ;
            debugger;
            console.log(dataGetFAQ);
        })
            .error(function (error, status) {
                if (status == 401) {
                    alert('401');
                }
            });
        return request;
    }
    this.getStatusMaster = function (Token) {

        var request = $http({
            method: "GET",
            url: config.serviceURL + "api/ticket/getStatusMaster",
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            }
        }).success(function (dataGetFAQ) {
            var test = dataGetFAQ;
            debugger;
            console.log(dataGetFAQ);
        })
            .error(function (error, status) {
                if (status == 401) {
                    alert('401');
                }
            });
        return request;
    }
    this.CreateNewTicket = function (objCreateNewTicket,Token) {

        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/CreateNewTicket",
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            },
            data: JSON.stringify(objCreateNewTicket)
        }).success(function (data) {
            var test = data;
            debugger;
            console.log(data);
        })
            .error(function (error, status) {
                if (status == 401) {
                    alert('401');
                }
            });
        return request;
    }
    this.GetAllTicketList = function (objGetAllTicketList, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/GetAllTicketList",
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            },
            data: JSON.stringify(objGetAllTicketList)
        }).success(function (data) {
            var test = data;
            debugger;
            console.log(data);
        })
        .error(function (error, status) {
                if (status == 401) {
                    alert('401');
                }
        });
        return request;
    }

    this.GetTicketDetails = function (objRequest, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/GetTicketDetails",
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            },
            data: JSON.stringify(objRequest)
        }).success(function (data) {
            var test = data;
            debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                alert('401');
            }
        });
        return request;
    }
    this.GetDashboardCount = function (objRequest, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/GetDashboardCount",
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            },
            data: JSON.stringify(objRequest)
        }).success(function (data) {
            var test = data;
            debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                alert('401');
            }
        });
        return request;
    }

    this.UpdateLocation = function (objRequest, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/info/UpdateLocation",
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            },
            data: JSON.stringify(objRequest)
        }).success(function (data) {
            var test = data;
            debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                alert('401');
            }
        });
        return request;
    }

    this.getAllEmployee = function (objRequest, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/profile/getAllEmployee",
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            },
            data: JSON.stringify(objRequest)
        }).success(function (data) {
            var test = data;
            debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                alert('401');
            }
        });
        return request;
    }

    this.GetUserTicketReport = function (objRequest, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/GetUserTicketReport",
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            },
            data: JSON.stringify(objRequest)
        }).success(function (data) {
            var test = data;
            debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                alert('401');
            }
        });
        return request;
    }

    this.LogOut = function (objRequest, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/logOut",
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            },
            data: JSON.stringify(objRequest)
        }).success(function (data) {
            var test = data;
            debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                alert('401');
            }
        });
        return request;
    }

    this.GetUserTicketData = function (objRequest, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/GetUserTicketData",
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            },
            data: JSON.stringify(objRequest)
        }).success(function (data) {
            var test = data;
            debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                alert('401');
            }
        });
        return request;
    }
    this.UpdateTicketRemarks = function (objRequest, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/UpdateTicketRemarks",
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            },
            data: JSON.stringify(objRequest)
        }).success(function (data) {
            var test = data;
            debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                alert('401');
            }
        });
        return request;
    }

    this.UpdateTicketDetails = function (objRequest, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/UpdateTicketDetails",
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            },
            data: JSON.stringify(objRequest)
        }).success(function (data) {
            var test = data;
            debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                alert('401');
            }
        });
        return request;
    }

    this.GetFAQ1 = function (objGetFAQ,token) {
        console.log(objGetFAQ);
        console.log(token);
        var request = $http({
            method: "POST",
            url: config.serviceURL+"api/issue/getAllFAQ",
            data: objGetFAQ,
            headers: {
                'Content-Type': "application/json; charset=utf-8",
                'x-access-token':token
            }
        }).success(function (data) {
            console.log(data);
        })
            .error(function (error, status) {
                if (status == 401) {
                    alert('401');
                }
            });
        return request;
    }

    this.UpdateTicketAgentBucket = function (objTicketBucketReq) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "HRSupportService.svc/UpdateTicketAgentBucket",
            data: JSON.stringify(objTicketBucketReq),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-access-token": btoa(JSON.parse($window.localStorage.getItem('UserDetails')).Token + "~" + JSON.parse($window.localStorage.getItem('UserDetails')).UserID)
            }
        }).success(function (data) {
            console.log(data);
        })
            .error(function (error, status) {
                if (status == 401) {
                    if (JSON.parse($window.localStorage.getItem('UserDetails')).UserRole.toLowerCase() == 'insurer') {
                        $window.location.href = '/index.html';
                    }
                    else {
                        $window.location.href = '/BMSLogout.html';
                    }
                }
            });
        return request;
    }
});