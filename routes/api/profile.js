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
router.post('/getAllEmployee', (req, res) => {
  let _FilterID = req.body.FilterID;
  let _EmployeeID = req.body.EmployeeID;
  let _Key = req.body.Key;

    mc.query('CALL sp_GetEmployeeDirectory(?,?,?)',[_EmployeeID,_FilterID,_Key], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'success' });
    });  
});

router.post('/sp_GetLoginLogout', (req, res) => {
    console.log(req.body);
    if(isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try{        
        let _MgrID = req.body.MgrID;   
        let _MgrEmployeeID = req.body.MgrEmployeeID; 
          
        let _Type = req.body.Type; 
        
        mc.query('CALL sp_GetLoginLogout(?,?,?)', [_MgrID,_MgrEmployeeID,_Type], function (error, results, fields) {
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