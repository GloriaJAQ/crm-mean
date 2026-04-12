const router = require('express').Router();
module.exports = require('../utils/crudFactory')(router, require('../models/Cliente'));
