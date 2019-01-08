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
                'Content-Type': "application/json; charset=utf-8", "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            },
            data:JSON.stringify(objGetFAQ)
        }).success(function (dataGetFAQ) {
            var test=dataGetFAQ;
            //debugger;
            console.log(dataGetFAQ);
        })
            .error(function (error, status) {
                if (status == 401) {
                    $window.location.href = '/light/login.html';
                }
            });
        return request;
    }

    this.SendEmail = function (objReq) {
        var request = $http({
            method: "POST",
            url: "http://matrixliveapi.policybazaar.com/Communication/Communication.svc/send",
            headers: {
                'Content-Type': "application/json; charset=utf-8", "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            },
            data: JSON.stringify(objReq)
        }).success(function (data) {
            var test = data;
            //debugger;
            console.log(data);
        })
            .error(function (error, status) {
                if (status == 401) {
                    $window.location.href = '/light/login.html';
                }
            });
        return request;
    }

    this.GetSpocListANDUpdate = function (objReq, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/GetSpocListANDUpdate",
            headers: {
                'Content-Type': "application/json; charset=utf-8", "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            },
            data: JSON.stringify(objReq)
        }).success(function (data) {
            var test = data;
            //debugger;
            console.log(data);
        })
            .error(function (error, status) {
                if (status == 401) {
                    $window.location.href = '/light/login.html';
                }
            });
        return request;
    }
    this.UploadFile = function (objReq) {

        var request = $http({
            method: "POST",
            url: config.fileUpload + "care.svc/UploadFile",
            headers: {
                'Content-Type': "application/json; charset=utf-8", "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            },
            data: JSON.stringify(objReq)
        }).success(function (data) {
            var test = data;
            //debugger;
            console.log(data);
        })
            .error(function (error, status) {
                if (status == 401) {
                    $window.location.href = '/light/login.html';
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
                    $window.location.href = '/light/login.html';
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
                "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            }
        }).success(function (dataGetFAQ) {
            var test = dataGetFAQ;
            //debugger;
            console.log(dataGetFAQ);
        })
            .error(function (error, status) {
                if (status == 401) {
                    $window.location.href = '/light/login.html';
                }
            });
        return request;
    }
    this.getStatusMaster = function (Token) {

        var request = $http({
            method: "GET",
            url: config.serviceURL + "api/ticket/getStatusMaster",
            headers: {
                'Content-Type': "application/json; charset=utf-8", "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            }
        }).success(function (dataGetFAQ) {
            var test = dataGetFAQ;
            //debugger;
            console.log(dataGetFAQ);
        })
            .error(function (error, status) {
                if (status == 401) {
                    $window.location.href = '/light/login.html';
                }
            });
        return request;
    }

    this.getlocationmaster = function (Token) {

        var request = $http({
            method: "GET",
            url: config.serviceURL + "api/info/getlocationmaster",
            headers: {
                'Content-Type': "application/json; charset=utf-8", "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            }
        }).success(function (dataGetFAQ) {
            var test = dataGetFAQ;
            //debugger;
            console.log(dataGetFAQ);
        })
            .error(function (error, status) {
                if (status == 401) {
                    $window.location.href = '/light/login.html';
                }
            });
        return request;
    }

    this.RaiseRequest = function (objCreateNewTicket, Token) {

        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/RaiseRequest",
            headers: {
                'Content-Type': "application/json; charset=utf-8", "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            },
            data: JSON.stringify(objCreateNewTicket)
        }).success(function (data) {
            var test = data;
            //debugger;
            console.log(data);
        })
            .error(function (error, status) {
                if (status == 401) {
                    $window.location.href = '/light/login.html';
                }
            });
        return request;
    }

    this.CreateNewTicket = function (objCreateNewTicket,Token) {

        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/CreateNewTicket",
            headers: {
                'Content-Type': "application/json; charset=utf-8", "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            },
            data: JSON.stringify(objCreateNewTicket)
        }).success(function (data) {
            var test = data;
            //debugger;
            console.log(data);
        })
            .error(function (error, status) {
                if (status == 401) {
                    $window.location.href = '/light/login.html';
                }
            });
        return request;
    }
    this.GetAllTicketList = function (objGetAllTicketList, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/GetAllTicketList",
            headers: {
                'Content-Type': "application/json; charset=utf-8", "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            },
            data: JSON.stringify(objGetAllTicketList)
        }).success(function (data) {
            var test = data;
            //debugger;
            console.log(data);
        })
        .error(function (error, status) {
                if (status == 401) {
                    $window.location.href = '/light/login.html';
                }
        });
        return request;
    }

    this.GetAdminTicketList = function (objGetAllTicketList, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/GetAdminTicketList",
            headers: {
                'Content-Type': "application/json; charset=utf-8", "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            },
            data: JSON.stringify(objGetAllTicketList)
        }).success(function (data) {
            var test = data;
            //debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                $window.location.href = '/light/login.html';
            }
        });
        return request;
    }
    this.GetTicketDetails = function (objRequest, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/GetTicketDetails",
            headers: {
                'Content-Type': "application/json; charset=utf-8", "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            },
            data: JSON.stringify(objRequest)
        }).success(function (data) {
            var test = data;
            //debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                $window.location.href = '/light/login.html';
            }
        });
        return request;
    }
    this.GetDashboardCount = function (objRequest, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/GetDashboardCount",
            headers: {
                'Content-Type': "application/json; charset=utf-8",
                "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            },
            data: JSON.stringify(objRequest)
        }).success(function (data) {
            var test = data;
            //debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                $window.location.href = '/light/login.html';
            }
        });
        return request;
    }

    this.UpdateLocation = function (objRequest, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/info/UpdateLocation",
            headers: {
                'Content-Type': "application/json; charset=utf-8", "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            },
            data: JSON.stringify(objRequest)
        }).success(function (data) {
            var test = data;
            //debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                $window.location.href = '/light/login.html';
            }
        });
        return request;
    }

    this.getAllEmployee = function (objRequest, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/profile/getAllEmployee",
            headers: {
                'Content-Type': "application/json; charset=utf-8", "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            },
            data: JSON.stringify(objRequest)
        }).success(function (data) {
            var test = data;
            //debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                $window.location.href = '/light/login.html';
            }
        });
        return request;
    }

    this.GetUserTicketReport = function (objRequest, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/GetUserTicketReport",
            headers: {
                'Content-Type': "application/json; charset=utf-8", "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            },
            data: JSON.stringify(objRequest)
        }).success(function (data) {
            var test = data;
            //debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                $window.location.href = '/light/login.html';
            }
        });
        return request;
    }

    this.GetMGRDashboard = function (objRequest, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/GetMGRDashboard",
            headers: {
                'Content-Type': "application/json; charset=utf-8", "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            },
            data: JSON.stringify(objRequest)
        }).success(function (data) {
            var test = data;
            //debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                $window.location.href = '/light/login.html';
            }
        });
        return request;
    }

    this.LogOut = function (objRequest, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/logOut",
            headers: {
                'Content-Type': "application/json; charset=utf-8", "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            },
            data: JSON.stringify(objRequest)
        }).success(function (data) {
            var test = data;
            //debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                $window.location.href = '/light/login.html';
            }
        });
        return request;
    }

    this.GetUserTicketData = function (objRequest, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/GetUserTicketData",
            headers: {
                'Content-Type': "application/json; charset=utf-8", "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            },
            data: JSON.stringify(objRequest)
        }).success(function (data) {
            var test = data;
            //debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                $window.location.href = '/light/login.html';
            }
        });
        return request;
    }
    this.UpdateTicketRemarks = function (objRequest, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/UpdateTicketRemarks",
            headers: {
                'Content-Type': "application/json; charset=utf-8", "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            },
            data: JSON.stringify(objRequest)
        }).success(function (data) {
            var test = data;
            //debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                $window.location.href = '/light/login.html';
            }
        });
        return request;
    }

    this.UpdateTicketDetails = function (objRequest, Token) {
        var request = $http({
            method: "POST",
            url: config.serviceURL + "api/ticket/UpdateTicketDetails",
            headers: {
                'Content-Type': "application/json; charset=utf-8", "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            },
            data: JSON.stringify(objRequest)
        }).success(function (data) {
            var test = data;
            //debugger;
            console.log(data);
        })
        .error(function (error, status) {
            if (status == 401) {
                $window.location.href = '/light/login.html';
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
                "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            }
        }).success(function (data) {
            console.log(data);
        })
            .error(function (error, status) {
                if (status == 401) {
                    $window.location.href = '/light/login.html';
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
                "auth-token": JSON.parse($window.localStorage.getItem('UserDetails')).Token
            }
        }).success(function (data) {
            console.log(data);
        })
            .error(function (error, status) {
                if (status == 401) {
                    $window.location.href = '/light/login.html';
                }
            });
        return request;
    }
});