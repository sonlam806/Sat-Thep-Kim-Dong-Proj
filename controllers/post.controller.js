const Donhang = require('../models/donhang.model');

module.exports.showItems = async (req, res) => {
    try {
        let totalPrice = 0;

        const posts = await Donhang.find();

        for (let i = 0; i < posts.length; i++) {
            totalPrice = totalPrice + posts[i].thanhtien;
        }
        res.render('post', {
            posts: posts,
            totalPrice: totalPrice
        })
    } catch (err) {
        res.json({
            message: err
        });
    }
}
// Find item by ID
module.exports.findItems = async (req, res) => {
    try {

        const matchedItems = await Donhang.findById(
            req.params.postId
        );
        res.render('allPosts', {
            matchedItems: matchedItems
        })
    } catch (err) {
        res.json({
            message: err
        });
    }
}

// Find item by Name
module.exports.searchItems = async (req, res) => {
    try {
        var q = req.query.q.toLowerCase();
        let totalPrice = 0;
        const searchItems = await Donhang.find();

        let result = searchItems.filter(function (item) {
            return item.customer.toLowerCase().indexOf(q) !== -1;
        });
        for (let i = 0; i < result.length; i++) {
            totalPrice += result[i].thanhtien;
        }
        res.render('search', {
            result: result,
            totalPrice: totalPrice
        });
    } catch (err) {
        res.json({
            message: err
        });
    }
}

// Post new item
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
            res.redirect('/'); // Có thể có lỗi chỗ này
        } catch (err) {
            res.json({
                message: err
            });
        }
    }
}

module.exports.updateItem = async (req, res) => {
    try {
        const updatedPost = await Donhang.updateOne({
            _id: req.params.postId
        }, {
            $set: req.body
        });
        res.redirect('/');
    } catch (err) {
        res.json({
            message: err
        })
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