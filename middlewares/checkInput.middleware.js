module.exports.checkInput = function (req, res, next) {
    if (!req.body.customer) {
        res.render('post', {
            errors: errors = ['Vui lòng nhập tên Khách hàng'],
            values: values = req.body
        });

        return;
    }
    if (!req.body.loaithep) {
        res.render('post', {
            errors: errors = ['Vui lòng lựa chọn loại thép trước khi tính tiền'],
            values: values = req.body
        })
        return;
    }
    next();
};