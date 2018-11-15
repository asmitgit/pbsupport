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
  let _EmployeeID = req.body.EmployeeID;
    mc.query('CALL sp_GetEmployeeDirectory(?)',[_EmployeeID], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'success' });
    });  
});


module.exports = router;