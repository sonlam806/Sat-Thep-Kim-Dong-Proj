module.exports.checkInput = function (req, res, next) {
    var errors = [];
    if (!req.body.customer) {
        res.render('post', {
            errors: errors.push('Vui lòng nhập tên Khách hàng'),
            values: values = req.body
        });

        return;
    }
    if (!req.body.loaithep) {
        res.render('post', {
            errors: errors.push('Vui lòng lựa chọn loại thép trước khi tính tiền'),
            values: values = req.body
        })
        return;
    }
    if (!req.body.thanhtien) {
        res.render('post', {
            errors: errors.push('Vui lòng xem lại mục tính tiền!'),
            values: values = req.body
        })
        return;
    }

    next();
};