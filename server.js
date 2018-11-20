const express = require('express');
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const users = require('./routes/api/users');
const info = require('./routes/api/info');
const issue = require('./routes/api/issue');
const ticket = require('./routes/api/ticket');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const keys = require('./config/keys');
const mysql = require('mysql');
const app = express();
app.set('superSecret', keys.secretOrKey); // secret variable
const isEmpty = require('./validation/is-empty');
const moment = require('moment');
//var stringify = require('json-stringify');

const ActiveDirectory = require('activedirectory');
const config = { url: 'ldap://10.0.10.10:389',
               baseDN: 'dc=etechaces,dc=com',
        //        cache: false,
        // verbose : true,
               username: 'tickets',
               password: 'TicketPB@#1234@#' }

               //CN=tickets,OU=IT Developement,OU=PolicyBazaar.com,DC=Etechaces,DC=com            

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
//const db = require('./config/keys').mongoURI;
// connection configurations
const mysqldb = require('./config/keys').mysqldb;

const mc = mysql.createConnection(mysqldb);

// Connect to MongoDB
// mongoose
//   .connect(db)
//   .then(() => console.log('MongoDB Connected'))

//   .catch(err => console.log(err));



const validateLoginInput = require('./validation/login');
const port = process.env.PORT || 80;
var cors = require('cors');

// use it before all route definitions

app.use(cors({ origin: ['http://pbsupportuat.policybazaar.com','http://localhost:61750'] }));

app.post('/api/getAllFAQ', (req, res) => {
    if (isEmpty(req.body))
        return res.send({ error: true, data: null, message: 'error in request' });
    try {

        let _ISSUEID = req.body.ISSUEID;
        let _SUBISSUEID = req.body.SUBISSUEID;
        let _KeyWord =  req.body.KeyWord;
        if (!(parseInt(_ISSUEID) > 0)) {
            _ISSUEID = 0;
        }
        if (!(parseInt(_SUBISSUEID) > 0)) {
            _SUBISSUEID = 0;
        }
        mc.query('CALL sp_GETFaqDetails(?,?,?)', [_ISSUEID,_SUBISSUEID,_KeyWord], function (error, results, fields) {
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
app.post('/api/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    // // Check Validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    const email = req.body.email;
    const password = req.body.password;

    console.log(5);
    try {
        mc.query("CALL sp_LogInUser(?,?)", [email, password], function (error, results, fields) {
            if (error) {
                return res.send({ error: true, data: error, message: 'Incorrect User/Password0', token: null });
            }
            else {
                if (results.length > 0) {
                    var payload = {
                        admin: email
                    }
                    var token = jwt.sign(payload, app.get('superSecret'), {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    //return res.send({ error: false, data: results, message: 'success',token: token });
                    if (results.length > 0 && results[0].length>0)
                        return res.send({ error: false, data: results, message: 'success', token: token });
                    else
                        return res.send({ error: true, data: null, message: 'Incorrect User/Password1', token: null });
                }
                else {
                    return res.send({ error: true, data: null, message: 'Incorrect User/Password2', token: null });
                }

            }

        });
    }
    catch (err) {
        return res.send({ error: true, data: null, message: err, token: null });
    }

});

app.post('/api/logOut', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    // // Check Validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    const email = req.body.email;   

    console.log(5);
    try {
        mc.query("CALL sp_LogOut(?)", [email], function (error, results, fields) {
            // if (error) {
            //     return res.send({ error: true, data: error, message: 'Incorrect User/Password0', token: null });
            // }
            // else {
                
            // }
            return res.send({ error: false, data: "Success", message: "", token: null });
        });
    }
    catch (err) {
        return res.send({ error: true, data: null, message: err, token: null });
    }

});
app.post('/api/auth', (req, res) => {
    try {
        const ad = new ActiveDirectory(config);       
    //    var username = 'asmit';
    //    var password ='Oct@301,.0s' //'Nangal@1234';
    var username = req.body.username;
    var password = req.body.password;
    //    var username = req.body.username;
    //    var password = req.body.password;
       
       
       
        ad.findUser(username, function(err, user) {            
            if (err) {
                console.log('ERROR: ' +JSON.stringify(err));
                return;
            }        
            if (! user) console.log('User: ' + username + ' not found.');
            else 
            {
                console.log(user);
                username =username+ '@etechaces.com';     
                ad.authenticate(username, password, function(error, auth) {
                    if (error) {
                      console.log('ERROR: '+JSON.stringify(error));
                      return res.send({ error: true, data: error, message: error, token: null });
                    }
                    else{
                        if (auth) {
                            //console.log(user.description,JSON.stringify(user));
                            //console.log(auth);
                            try {
                               
                                let buff = new Buffer(password);  
                                let base64data = buff.toString('base64');
                                mc.query("CALL sp_LogInUser(?,?,?)", [user.description,JSON.stringify(user),base64data], function (mySqlerror, results, fields) {
                                    console.log(mySqlerror,results);
                                    if (mySqlerror) {                                       
                                        return res.send({ error: true, data: null, message: 'Incorrect User/Password0', token: null });
                                    }
                                    else {
                                        console.log(results);
                                        if (results.length > 0) {
                                            return res.send({ error: false, data: results, message: 'success', token: "" });
                                            var payload = {
                                                admin: username
                                            }
                                            var token = jwt.sign(payload, app.get('superSecret'), {
                                                expiresIn: 86400 // expires in 24 hours
                                            });
                                            //return res.send({ error: false, data: results, message: 'success',token: token });
                                            if (results.length > 0 && results[0].length>0)
                                                return res.send({ error: false, data: results, message: 'success', token: token });
                                            else
                                                return res.send({ error: true, data: null, message: 'Incorrect User/Password1', token: null });
                                        }
                                        else {
                                            return res.send({ error: true, data: null, message: 'Incorrect User/Password2', token: null });
                                        }
                        
                                    }
                        
                                });
                            }
                            catch (err) {
                                return res.send({ error: true, data: null, message: err, token: null });
                            }
                            //return res.send({ error: false, data: auth, message: error, token: null });
                        }
                        else {
                            console.log('Authentication failed!');
                            return res.send({ error: true, data: error, message: error, token: null });
                          }
                        }
                  });
                console.log(JSON.stringify(user));
            }
        });

    }
    catch (err) {
        console.log(err);
        return res.send({ error: true, data: null, message: err, token: null });
    }

});

//   app.use(function (req, res, next) {
//     console.log(req.body);
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

// app.use(function (req, res, next) {
//     console.log(req.body);
//     // check header or url parameters or post parameters for token
//     var token = req.body.token || req.param('token') || req.headers['x-access-token'];

//     // decode token
//     if (token) {

//         // verifies secret and checks exp
//         jwt.verify(token, app.get('superSecret'), function (err, decoded) {
//             if (err) {
//                 return res.json({ success: false, message: 'Failed to authenticate token.' });
//             } else {
//                 // if everything is good, save to request for use in other routes
//                 req.decoded = decoded;
//                 next();
//             }
//         });

//     } else {

//         // if there is no token
//         // return an error
//         return res.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });

//     }

// });

// Use Routes
app.use('/api/users', users);
app.use('/api/issue', issue);
app.use('/api/ticket', ticket);
app.use('/api/info', info);
app.use('/api/profile', profile);

//app.use('/api/posts', posts);

app.listen(port, () => console.log(`Server running on port ${port}`));
