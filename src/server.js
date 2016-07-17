'use strict';

import express from 'express';
import bodyParser from 'body-parser';

import home from './modules/home';

import webhook from './modules/webhook';

const app = express();

app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', home.handleGet);

// webhook
app.post('/webhook', webhook.handlePost);

// Sign up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
});