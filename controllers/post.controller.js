const Donhang = require('../models/donhang.model');

module.exports.showItems = async (req, res) => {
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
}

module.exports.findItems = async (req, res) => {
    try {
        const posts = await Donhang.find();
        const matchedItems = await Donhang.findById(
            req.params.postId
        );
        res.render('allPosts', {
            posts: posts,
            matchedItems: matchedItems
        })
    } catch (err) {
        res.json({
            message: err
        });
    }
}

module.exports.postItem = async (req, res) => {
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
            res.redirect('/post'); // Có thể có lỗi chỗ này
        } catch (err) {
            res.json({
                message: err
            });
        }
    }
}

module.exports.deleteItem = async (req, res) => {
    try {
        const deleteItem = await Donhang.remove({
            _id: req.params.postId
        });
        const posts = await Donhang.find();
        res.redirect('/');
    } catch (err) {
        res.json({
            message: err
        });
    }
}