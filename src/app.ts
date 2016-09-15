/// <reference path='../declarations/node/node.d.ts' />
/// <reference path='../declarations/express/express.d.ts' />

// Loosely derived from 
// http://www.software-architects.com/devblog/2014/06/04/Learn-by-Example-AngularJS-NodeJS-and-Typescript    

import BasicAuthenticationService = require('./authentication/BasicAuthenticationService');
import RegistrationAPIController = require('./registration/RegistrationAPIController');

require ('envs');

const express = require('express');
const app = express();
const port: number = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

const authenticationDisabled = process.env.AUTHENTICATION_DISABLED && process.env.AUTHENTICATION_DISABLED !== 'false';
if (!authenticationDisabled) {
    new BasicAuthenticationService.default(app);
}

app.listen(port);
new RegistrationAPIController.default(app);

console.info(`Listening to port: ${port}`);
