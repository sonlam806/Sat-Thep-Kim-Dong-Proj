const express = require('express');
const router = express.Router();
const Donhang = require('../models/donhang.model');
const checkInput = require('../middlewares/checkInput.middleware');


router.get('/', async (req, res) => {
    try {
        const posts = await Donhang.find();
        res.render('post', {
            posts: posts
        })
    } catch (err) {
        res.json({
            message: err
        });
    }
});

router.post('/', checkInput.checkInput, async (req, res) => {
    const post = new Donhang({
        customer: req.body.customer,
        loaithep: req.body.loaithep,
        canh2: req.body.canh2,
        canh1: req.body.canh1,
        bung: req.body.bung,
        cao: req.body.cao,
        dai: req.body.dai,
        day: req.body.day,
        khoiluong: req.body.khoiluong,
        dongia: req.body.dongia,
        giacong: req.body.giacong,
        soluong: req.body.soluong,
        thanhtien: req.body.thanhtien,
        phoi: req.body.phoi
    });

    var error = 0;
    // Validation
    if (req.body.customer == '' || req.body.loaithep == "option") {
        error++;
    }
    if (error > 0) {
        return;
    } else {
        try {
            const savedPost = await post.save()
            res.json(savedPost);
        } catch (err) {
            res.json({
                message: err
            });
        }
    }


});










module.exports = router;