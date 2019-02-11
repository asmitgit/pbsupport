const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const mysql = require('mysql');
const mysqldb = require('../../config/keys').mysqldb;
const mc = mysql.createConnection(mysqldb);
var moment = require('moment');
var app         = express();

    

app.set('superSecret', keys.secretOrKey); // secret variable
// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const isEmpty = require('../../validation/is-empty');
// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));
// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.get('/getStatusMaster', (req, res) => {
    mc.query('CALL sp_GetStatusMaster()', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'success' });
    });  
});

router.get('/getAllIssueSubIssue', (req, res) => {
    mc.query('CALL sp_GETISSUEDETAILS()', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'success' });
    });  
});

router.post('/RaiseRequest', (req, res) => {
    if(isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try{
        
        let _EmpID = req.body.EmpID;
        let _RequestType =  req.body.RequestType;
       
        let _TicketSubject =  req.body.TicketSubject;
        let _Comments = req.body.Comments;
        let _FileName = req.body.FileName;
        let _FileURL = req.body.FileURL;
        mc.query('CALL sp_RaiseRequest(?,?,?,?,?,?)',
         [_EmpID,_RequestType,_TicketSubject,_Comments,_FileURL,_FileName], function (error, results, fields) {
            console.log(results);
            if (error) 
            {
                return res.send({ error: true, data: null, message: error});
            }
            else
                return res.send({ error: false, data: results, message: 'success' });
        });  
    }
    catch(err){
        console.error(err);
        return res.send({ error: true, data: null, message: err});
    }
});

router.post('/CreateNewTicket', (req, res) => {
    if(isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try{
        
        let _EmpID = req.body.EmpID;
        let _IssueID =  req.body.IssueID;
        let _SubIssueID = req.body.SubIssueID;
        let _TicketSubject =  req.body.TicketSubject;
        let _Comments = req.body.Comments;
        let _FileName = req.body.FileName;
        let _FileURL = req.body.FileURL;
        mc.query('CALL sp_CreateNewTicket(?,?,?,?,?,?,?)',
         [_EmpID,_IssueID,_SubIssueID,_TicketSubject,_Comments,_FileURL,_FileName], function (error, results, fields) {
            console.log(results);
            if (error) 
            {
                return res.send({ error: true, data: null, message: error});
            }
            else
                return res.send({ error: false, data: results, message: 'success' });
        });  
    }
    catch(err){
        console.error(err);
        return res.send({ error: true, data: null, message: err});
    }
});
router.post('/GetSpocListANDUpdate', (req, res) => {
    console.log(req.body);
    if(isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try{
        
        let _TicketID = req.body.TicketID;
        let _AssignTo =  req.body.AssignTo;
        let _UserID =  req.body.UserID;
        let _Type =  req.body.Type;
        
       

        mc.query('CALL sp_GetSpocListANDUpdate(?,?,?,?)', [_TicketID,_AssignTo,_UserID,_Type], function (error, results, fields) {
            console.log(results);
            if (error) 
            {
                return res.send({ error: true, data: null, message: error});
            }
            else
                return res.send({ error: false, data: results, message: 'success' });
        });  
    }
    catch(err){
        console.error(err);
        return res.send({ error: true, data: null, message: err});
    }
});

router.post('/GetAdminDashboardCount', (req, res) => {
    if(isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try{
        
        let _EMPID = req.body.EMPID;
        let _IssueType = req.body.IssueType;
        mc.query('CALL sp_GetAdminDashboardCount(?,?)', [_EMPID,_IssueType], function (error, results, fields) {
            console.log(results);
            if (error) 
            {
                return res.send({ error: true, data: null, message: error});
            }
            else
                return res.send({ error: false, data: results, message: 'success' });
        });  
    }
    catch(err){
        console.error(err);
        return res.send({ error: true, data: null, message: err});
    }
});
router.post('/GetAdminTicketList', (req, res) => {
    console.log(req.body);
    if(isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try{
        
        let _EmpID = req.body.EmpID;
        let _IssueType =  req.body.IssueType;
        let _QUERY =  req.body.QUERY;

        // var timestampFrom = moment.unix(req.body.From);
        // var timestampTo = moment.unix(req.body.To);
        let _From =  req.body.From;
        let _To =    req.body.To;
       


        let _IssueID = req.body.IssueID;
        let _SubIssueID =  req.body.SubIssueID;
        let _StatusID =  req.body.StatusID;
        let _TicketID =  req.body.TicketID;
        console.log(_From,_To);
        mc.query('CALL sp_GetAdminTicketData(?,?,?,?,?,?,?,?,?)',
         [_EmpID,_IssueType,_QUERY,_From,_To,_IssueID,_SubIssueID,_StatusID,_TicketID], function (error, results, fields) {
            console.log(results);
            if (error) 
            {
                return res.send({ error: true, data: null, message: error});
            }
            else
                return res.send({ error: false, data: results, message: 'success' });
        });  
    }
    catch(err){
        console.error(err);
        return res.send({ error: true, data: null, message: err});
    }
});
router.post('/GetAllTicketList', (req, res) => {
    console.log(req.body);
    if(isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try{
        
        let _EmpID = req.body.EmpID;
        let _Type =  req.body.Type;
        let _QUERY =  req.body.QUERY;

        // var timestampFrom = moment.unix(req.body.From);
        // var timestampTo = moment.unix(req.body.To);
        let _From =  req.body.From;
        let _To =    req.body.To;
       


        let _IssueID = req.body.IssueID;
        let _SubIssueID =  req.body.SubIssueID;
        let _StatusID =  req.body.StatusID;
        console.log(_From,_To);
        mc.query('CALL sp_GetAllTicketList(?,?,?,?,?,?,?,?)', [_EmpID,_Type,_QUERY,_From,_To,_IssueID,_SubIssueID,_StatusID], function (error, results, fields) {
            console.log(results);
            if (error) 
            {
                return res.send({ error: true, data: null, message: error});
            }
            else
                return res.send({ error: false, data: results, message: 'success' });
        });  
    }
    catch(err){
        console.error(err);
        return res.send({ error: true, data: null, message: err});
    }
});
router.post('/GetTicketDetails', (req, res) => {
    if(isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try{
        
        let _TicketID = req.body.TicketID;
        mc.query('CALL sp_GetTicketDetails(?)', [_TicketID], function (error, results, fields) {
            console.log(results);
            if (error) 
            {
                return res.send({ error: true, data: null, message: error});
            }
            else
                return res.send({ error: false, data: results, message: 'success' });
        });  
    }
    catch(err){
        console.error(err);
        return res.send({ error: true, data: null, message: err});
    }
});
router.post('/GetTicketDetailsAuth', (req, res) => {
    if(isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try{
        //IN _TicketID INT,IN _Type INT,IN _EmployeeID VARCHAR(50),IN _UserID INT
        let _TicketID = req.body.TicketID;
        let _Type = req.body.Type;
        let _EmployeeID = req.body.EmployeeID;
        let _UserID = req.body.UserID;
        mc.query('CALL sp_GetTicketDetailsAuth(?,?,?,?)', [_TicketID,_Type,_EmployeeID,_UserID], function (error, results, fields) {
            console.log(results);
            if (error) 
            {
                return res.send({ error: true, data: null, message: error});
            }
            else
                return res.send({ error: false, data: results, message: 'success' });
        });  
    }
    catch(err){
        console.error(err);
        return res.send({ error: true, data: null, message: err});
    }
});
router.post('/UpdateTicketRemarks', (req, res) => {
    if(isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try{
        
        let _TicketID = req.body.TicketID;
        let _Comments = req.body.Comments;
        let _CreatedBy = req.body.CreatedBy;
        let _ReplyType = req.body.ReplyType;
        let _FileName = req.body.FileName;
        let _FileURL = req.body.FileURL;
        mc.query('CALL sp_UpdateTicketRemarks(?,?,?,?,?,?)',
         [_TicketID,_Comments,_CreatedBy,_ReplyType,_FileURL,_FileName], function (error, results, fields) {
            console.log(results);
            if (error) 
            {
                return res.send({ error: true, data: null, message: error});
            }
            else
                return res.send({ error: false, data: results, message: 'success' });
        });  
    }
    catch(err){
        console.error(err);
        return res.send({ error: true, data: null, message: err});
    }
});
router.post('/UpdateTicketDetails', (req, res) => {
    if(isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try{
        
        let _TicketID = req.body.TicketID;       
        let _CreatedBy = req.body.CreatedBy;
        let _StatusID = req.body.StatusID;
        let _IssueID = req.body.IssueID;
        let _SubIssueID = req.body.SubIssueID;
        let _FollowUp = req.body.FollowUp==''? '2001-01-07': req.body.FollowUp;
        let _IsSupport = req.body.IsSupport;
        
        mc.query('CALL sp_UpdateTicketDetails(?,?,?,?,?,?,?)',
         [_TicketID,_CreatedBy,_StatusID,_IssueID,_SubIssueID,_FollowUp,_IsSupport], function (error, results, fields) {
            console.log(results);
            if (error) 
            {
                return res.send({ error: true, data: null, message: error});
            }
            else
                return res.send({ error: false, data: results, message: 'success' });
        });  
    }
    catch(err){
        console.error(err);
        return res.send({ error: true, data: null, message: err});
    }
});

router.post('/GetDashboardCount', (req, res) => {
    if(isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try{
        
        let _EMPID = req.body.EMPID;       
        let _TYPE = req.body.TYPE;
       
        
        mc.query('CALL sp_GetDashboardCount(?,?)', [_EMPID,_TYPE], function (error, results, fields) {
            console.log(results);   
            if (error) 
            {
                return res.send({ error: true, data: null, message: error});
            }
            else
                return res.send({ error: false, data: results, message: 'success' });
        });  
    }
    catch(err){
        console.error(err);
        return res.send({ error: true, data: null, message: err});
    }
});
router.post('/GetUserTicketReport', (req, res) => {
    if(isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try{
        
        let _MgrID = req.body.MgrID;   
        let _Type = req.body.Type; 
        
        mc.query('CALL sp_GetUserTicketReport(?,?)', [_MgrID,_Type], function (error, results, fields) {
            console.log(results);   
            if (error) 
            {
                return res.send({ error: true, data: null, message: error});
            }
            else
                return res.send({ error: false, data: results, message: 'success' });
        });  
    }
    catch(err){
        console.error(err);
        return res.send({ error: true, data: null, message: err});
    }
});

router.post('/GetAllUserReport', (req, res) => {
    if(isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try{        
        let _MgrID = req.body.MgrID;   
        let _MgrEmployeeID = req.body.MgrEmployeeID; 
        let _MgrName = req.body.MgrName;   
        let _Type = req.body.Type; 
        
        mc.query('CALL sp_GetAllUserReport(?,?,?,?)', [_MgrID,_MgrEmployeeID,_MgrName,_Type], function (error, results, fields) {
            console.log(results);   
            if (error) 
            {
                return res.send({ error: true, data: null, message: error});
            }
            else
                return res.send({ error: false, data: results, message: 'success' });
        });
    }
    catch(err){
        console.error(err);
        return res.send({ error: true, data: null, message: err});
    }
});
router.post('/GetAllUserReportData', (req, res) => {
    if(isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try{
        
        let _EmpID = req.body.EmpID;   
        let _Type = req.body.Type;
        let _IsOwn = req.body.IsOwn;         
        mc.query('CALL sp_GetAllUserReportData(?,?,?)', [_EmpID,_Type,_IsOwn], function (error, results, fields) {
            console.log(results);   
            if (error) 
            {
                return res.send({ error: true, data: null, message: error});
            }
            else
                return res.send({ error: false, data: results, message: 'success' });
        });  
    }
    catch(err){
        console.error(err);
        return res.send({ error: true, data: null, message: err});
    }
});
router.post('/GetMGRDashboard', (req, res) => {
    if(isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try{
        
        let _MgrEmployeeID = req.body.MgrEmployeeID;   
        let _UserEmployeeID = req.body.UserEmployeeID; 
        let _Type = req.body.Type; 
        console.log(req.body);   
        mc.query('CALL sp_GetMGRDashboard(?,?,?)', [_MgrEmployeeID,_UserEmployeeID,_Type], function (error, results, fields) {
            console.log(results);   
            if (error) 
            {
                return res.send({ error: true, data: null, message: error});
            }
            else
                return res.send({ error: false, data: results, message: 'success' });
        });  
    }
    catch(err){
        console.error(err);
        return res.send({ error: true, data: null, message: err});
    }
});
router.post('/GetUserTicketData', (req, res) => {
    if(isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try{
        
        let _EmpID = req.body.EmpID;   
        let _Type = req.body.Type; 
        
        mc.query('CALL sp_GetUserTicketData(?,?)', [_EmpID,_Type], function (error, results, fields) {
            console.log(results);   
            if (error) 
            {
                return res.send({ error: true, data: null, message: error});
            }
            else
                return res.send({ error: false, data: results, message: 'success' });
        });  
    }
    catch(err){
        console.error(err);
        return res.send({ error: true, data: null, message: err});
    }
});
module.exports = router;