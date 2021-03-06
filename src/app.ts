/// <reference path='../declarations/node/node.d.ts' />
/// <reference path='../declarations/express/express.d.ts' />

// Loosely derived from 
// http://www.software-architects.com/devblog/2014/06/04/Learn-by-Example-AngularJS-NodeJS-and-Typescript    

import BasicAuthenticationService = require('./authentication/BasicAuthenticationService');
import RegistrationAPIController = require('./registration/RegistrationAPIController');
import EnvironmentHelper = require('./helpers/EnvironmentHelper');

require('envs');

const express = require('express');
const app = express();
const port: number = process.env.PORT || 3000;
const environmentHelper = new EnvironmentHelper.default(process.env);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

environmentHelper.conditionalDo({
    defaultTo: true,
    propertyName: 'UI_SERVER_ENABLED',
    func() {
        const uiDirectory = process.env.CLIENT_DIRECTORY || __dirname + '/../client';
        app.use(express.static(uiDirectory));
    }
});

environmentHelper.conditionalDo({
    defaultTo: false,
    doIf: false,
    propertyName: 'AUTHENTICATION_DISABLED',
    func() {
        new BasicAuthenticationService.default(app);
    }
});

app.listen(port);
new RegistrationAPIController.default(app);

console.info(`Listening to port: ${port}`);
