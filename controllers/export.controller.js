const Donhang = require("../models/donhang.model");
const moment = require("moment");


module.exports.getPdfItems = async (req, res) => {
  try {
    const today = moment().startOf('day');
    let posts = await Donhang.find({
      date: {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate()
      }
    });
    let customerName = posts[0].customer;
    let renderTime = moment().format('L');
    let totalPrice = 0;
    for (let i = 0; i < posts.length; i++) {
      totalPrice += posts[i].thanhtien;
    }
    res.render('export', {
      posts: posts,
      customerName: customerName,
      renderTime: renderTime,
      totalPrice: totalPrice
    });
  } catch (err) {
    res.json({
      message: err
    });
  }
}