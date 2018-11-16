
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
router.get('/getAllIssueSubIssue', (req, res) => {
    mc.query('CALL sp_GETISSUEDETAILS()', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'success' });
    });  
});

router.get('/getlocationmaster', (req, res) => {
    mc.query('CALL sp_get_location_master()', function (error, results, fields) {
        if (error) { 
            return res.send({ error: true, data: null, message:error});
        }
        return res.send({ error: false, data: results, message: 'success' });
    });  
});

router.post('/UpdateLocation', (req, res) => {
    if (isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try {

        let _EmployeeID = req.body.EmployeeID;
        let _State = req.body.State;
        let _City =  req.body.City;
        let _Sector =  req.body.Sector;
        let _Building =  req.body.Building;
        let _Floor =  req.body.FloorNo;
        let _Seat =  req.body.Seat;
 
        mc.query('CALL sp_UpdateLocation(?,?,?,?,?,?,?)', 
        [_EmployeeID,_State,_City,_Sector,_Building,_Floor,_Seat], function (error, results, fields) {
            console.log(results);
            if (error) {
                return res.send({ error: true, data: null, message: error });
            }
            else
                return res.send({ error: false, data: results, message: 'success' });
        });
    }
    catch (err) {
        console.error(err);
        return res.send({ error: true, data: null, message: err });
    }
});

module.exports = router;