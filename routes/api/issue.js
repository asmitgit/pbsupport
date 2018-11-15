
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

router.post('/getAllFAQ', (req, res) => {
    if(isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try{
        
        let _ISSUEID = req.body.ISSUEID;
        let _SUBISSUEID =  req.body.SUBISSUEID;
        let _KeyWord =  req.body.KeyWord;
        if(! (parseInt(_ISSUEID)>0))
        {
            _ISSUEID=0;
        }
        if(! (parseInt(_SUBISSUEID)>0))
        {
            _SUBISSUEID=0;
        }
        mc.query('CALL sp_GETFaqDetails(?,?,?)', [_ISSUEID,_SUBISSUEID,_KeyWord], function (error, results, fields) {
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