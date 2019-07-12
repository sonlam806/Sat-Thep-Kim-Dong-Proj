const Donhang = require("../models/donhang.model");
const moment = require('moment');


module.exports.checkHomepageInput = async function (req, res, next) {
	var errors = [];
	if (!req.body.customer) {
		errors.push('Vui lòng nhập tên Khách hàng');
	}
	if (!req.body.loaithep) {
		errors.push('Vui lòng lựa chọn loại thép trước khi tính tiền')
	}
	if (!req.body.thanhtien) {
		errors.push('Vui lòng xem lại mục tính tiền!')

	}
	const today = moment().startOf('day');
	let allPosts = await Donhang.find({
		date: {
			$gte: today.toDate(),
			$lte: moment(today).endOf('day').toDate()
		}
	});
	let renderTime = moment().format('L');
	let totalPrice = 0;
	for (let i = 0; i < allPosts.length; i++) {
		totalPrice += allPosts[i].thanhtien;
	}
	if (errors.length) {
		res.render('index', {
			errors: errors,
			values: req.body,
			renderTime: renderTime,
			posts: allPosts
		});
		return;
	}

	next();
};