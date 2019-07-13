const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const controller = require('../controllers/export.controller');


router.get('/download', controller.download);

router.get('/showPDF', controller.getPdfItems)


module.exports = router;