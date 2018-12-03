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
router.post('/GetAdminTicketList', (req, res) => {
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
        mc.query('CALL sp_GetAdminTicketList(?,?,?,?,?,?,?,?)', [_EmpID,_Type,_QUERY,_From,_To,_IssueID,_SubIssueID,_StatusID], function (error, results, fields) {
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
        let _FollowUp = req.body.FollowUp;
        
        mc.query('CALL sp_UpdateTicketDetails(?,?,?,?,?,?)', [_TicketID,_CreatedBy,_StatusID,_IssueID,_SubIssueID,_FollowUp], function (error, results, fields) {
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