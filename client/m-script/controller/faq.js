HRSupport.controller("FAQCtrl", function (e, a, t, s, n, o) { function c(e) { e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); var a = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(location.search); return null === a ? "" : decodeURIComponent(a[1].replace(/\+/g, " ")) } e.OpenLogin = function (a) { e.Login.EmployeeID = "", e.Login.Password = "", e.IsNo = 1, e.SelectedFAQ = a }, e.LoginData = { EmployeeID: "", Password: "" }, e.Cancel = function (a) { e.IsNo = 0 }, e.NoClick = function (e) { e.IsNo = !0 }, e.Login = function () { var t = { username: e.LoginData.EmployeeID, password: e.LoginData.Password }; a.login(t).success(function (a) { if (console.log(a), a.error) return alert(a.message), !1; o.localStorage.removeItem("UserDetails"), o.localStorage.setItem("UserDetails", JSON.stringify({ EMPData: a.data[0], Token: a.token, IsLocSet: 0, Location: a.data[1], Issue: { IssueID: c("issue"), SubIssueID: c("subissue") } })), e.UserDetails = JSON.parse(o.localStorage.getItem("UserDetails")), e.IsNo = 0, o.location.href = "/home.html#/pbsupport/CreateTicket/" + e.SelectedFAQ.IssueID + "/" + e.SelectedFAQ.SubIssueID }) }, e.KeyValue = "", "" != c("key") && (e.KeyValue = c("key")), e.IsNo = 0, e.IsTag = 0, e.GetFAQ = function () { a.GetFAQ({ ISSUEID: 0, SUBISSUEID: 0, KeyWord: "blank" }).success(function (a) { e.FAQData = a.data.length > 0 ? a.data[0] : [], parseInt(c("id")) > 0 ? (angular.forEach(e.FAQData, function (e, a) { e.IssueID == parseInt(c("id")) ? e.FAQIsActive = 1 : e.FAQIsActive = 0 }), e.isEmpty(c("subissue")) ? angular.forEach(e.FAQData, function (e, a) { e.Selected = !1 }) : angular.forEach(e.FAQData, function (a, t) { a.SubIssueID == c("subissue") ? (a.Selected = !0, e.IsTag = 1) : a.Selected = !1 })) : angular.forEach(e.FAQData, function (e, a) { e.Selected = !1 }) }) }, e.GetFAQ(), e.changeActive = function (a) { e.IsTag = 0, angular.forEach(e.FAQData, function (e, t) { e.Selected = !1, e.IssueID == a.IssueID ? e.FAQIsActive = 1 : e.FAQIsActive = 0 }), e.KeyValue = "" }, e.ChangeFAQ = function (a) { angular.forEach(e.FAQData, function (t, s) { t.SubIssueID == a.SubIssueID ? (t.Selected = !0, e.IsTag = 1) : t.Selected = !1 }) }, e.isEmpty = function (e) { return "string" == typeof e && !e.trim() || void 0 === e || null === e } });