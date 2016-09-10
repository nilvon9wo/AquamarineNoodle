const port: number = 3000;

import express = require('express');
import bodyParser = require('body-parser');

import RegistrationController = require('./registration/RegistrationController');

const app = express();
app.use(bodyParser());
var registrationController = new RegistrationController.default(app);

app.listen(process.env.PORT || port);