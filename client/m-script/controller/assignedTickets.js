﻿HRSupport.controller("AssignedTicketsCTRL", function (e, t, a, n, s, o) { function u(e) { var t = e.getMonth() + 1; return t < 10 ? "0" + t : "" + t } function i(e) { var t = e.getDate(); return t < 10 ? "0" + t : "" + t } function r(e) { var t = Math.floor(e).toString(); return e.toString().replace(/.*\./, "") + "." + t } e.UserDetails = JSON.parse(o.localStorage.getItem("UserDetails")), e.isEmpty = function (e) { return "string" == typeof e && !e.trim() || void 0 === e || null === e }, e.Msg = "", e.Selected = { IssueType: void 0, SubIssueType: void 0, Status: void 0 }, e.GetDashboardCount = function (a) { var n = { EMPID: e.UserDetails.EMPData[0].EmpID, TYPE: a }; t.GetDashboardCount(n, e.UserDetails.Toket).success(function (t) { e.TicketCount = t.data.length > 1 ? t.data[0] : [] }) }, e.GetDashboardCount(2), e.GetAllIssueSubIssue = function () { t.getAllIssueSubIssue(e.UserDetails.Toket).success(function (t) { e.IssueSubIssue = t.data.length > 0 ? t.data[0] : [] }) }, e.getStatusMaster = function () { t.getStatusMaster(e.UserDetails.Toket).success(function (t) { e.StatusList = t.data.length > 0 ? t.data[0] : [] }) }, e.getStatusMaster(), e.GetAllIssueSubIssue(), e.ActiveSearch = function (t) { e.ActiveSearchType = t }, e.ActiveSearchType = 2, e.ToDate = new Date, e.FromDate = new Date, e.GetAllTicketList = function (a) { var n = { EmpID: e.UserDetails.EMPData[0].EmpID, Type: 2, QUERY: a, From: e.FromDate.getFullYear() + "-" + u(e.FromDate) + "-" + i(e.FromDate), To: e.ToDate.getFullYear() + "-" + u(e.ToDate) + "-" + i(e.ToDate), IssueID: e.Selected.IssueType ? e.Selected.IssueType.ISSUEID : 0, SubIssueID: e.Selected.SubIssueType ? e.Selected.SubIssueType.SUBISSUEID : 0, StatusID: e.Selected.Status ? e.Selected.Status.StatusID : 0 }; t.GetAllTicketList(n, e.UserDetails.Toket).success(function (t) { null != t.data && (e.TicketList = t.data.length > 1 ? t.data[0] : []) }) }, e.noitems = [], e.clickRow = function () { alert("You clicked the row.") }, e.centsThenDollars = function (e, t) { var a = r(e), n = r(t); return a > n ? 1 : a === n ? 0 : -1 }, e.today = function () { e.dt = new Date }, e.today(), e.clear = function () { e.dt = null }, e.inlineOptions = { customClass: function (t) { var a = t.date; if ("day" === t.mode) for (var n = new Date(a).setHours(0, 0, 0, 0), s = 0; s < e.events.length; s++) { var o = new Date(e.events[s].date).setHours(0, 0, 0, 0); if (n === o) return e.events[s].status } return "" }, minDate: new Date, showWeeks: !0 }, e.NumberOfDays = 0, e.DateChange = function () { 1 == e.Selected.DateRange.ID ? e.NumberOfDays = 0 : 2 == e.Selected.DateRange.ID ? e.NumberOfDays = 7 : 3 == e.Selected.DateRange.ID ? e.NumberOfDays = 15 : 4 == e.Selected.DateRange.ID && (e.NumberOfDays = 30), e.ToDate = Date.now(), e.FromDate = Date.now() - 24 * e.NumberOfDays * 60 * 60 * 1e3 }, e.dateOptions = { formatYear: "yy", maxDate: new Date(2020, 5, 22), minDate: new Date, startingDay: 1 }, e.toggleMin = function () { e.inlineOptions.minDate = e.inlineOptions.minDate ? null : new Date, e.dateOptions.minDate = e.inlineOptions.minDate }, e.toggleMin(), e.open1 = function () { e.popup1.opened = !0 }, e.open2 = function () { e.popup2.opened = !0 }, e.setDate = function (t, a, n) { e.dt = new Date(t, a, n) }, e.formats = ["dd-MMMM-yyyy", "yyyy/MM/dd", "dd.MM.yyyy", "shortDate"], e.format = e.formats[0], e.altInputFormats = ["M!/d!/yyyy"], e.popup1 = { opened: !1 }, e.popup2 = { opened: !1 }; var D = new Date; D.setDate(D.getDate() + 1); var l = new Date; l.setDate(D.getDate() + 1), e.events = [{ date: D, status: "full" }, { date: l, status: "partially" }] });