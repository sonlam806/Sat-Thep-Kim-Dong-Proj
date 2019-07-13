const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');



router.get('/download', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/export/showPDF', {
    waitUntil: 'networkidle2'
  });
  await page.pdf({
    path: 'donhang.pdf',
    format: 'A4'
  });

  await browser.close();
  res.redirect('/');

});

router.get('/showPDF', (req, res) => {
  res.render('export');
})


module.exports = router;