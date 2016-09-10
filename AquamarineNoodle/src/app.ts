/// <reference path='../declarations/node/node.d.ts' />
/// <reference path='../declarations/express/express.d.ts' />
 
// Loosely derived from 
// http://www.software-architects.com/devblog/2014/06/04/Learn-by-Example-AngularJS-NodeJS-and-Typescript

const port: number = process.env.PORT || 3000;

const express = require('express');
const bodyParser = require('body-parser')

import RegistrationController = require('./registration/RegistrationController');

const app = express();
app.use(bodyParser());
var registrationController = new RegistrationController.default(app);

app.listen(port);