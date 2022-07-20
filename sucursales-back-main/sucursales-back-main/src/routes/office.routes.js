'use strict'

const express = require('express');
const req = require('express/lib/request');
const api = express.Router();
const mdAuth = require('../services/authenticated');
const officeController = require('../controllers/office.controller');

api.post('/addOffice',[mdAuth.ensureAuth,], officeController.addOffice);
api.get('/getOffice/:id', [mdAuth.ensureAuth, ], officeController.getOffice);
api.get('/getOffices', [mdAuth.ensureAuth,], officeController.getOffices);
api.put('/update/:id', [mdAuth.ensureAuth, ], officeController.updateOffice);
api.delete('/delete/:id', [mdAuth.ensureAuth,], officeController.delete);

module.exports = api;