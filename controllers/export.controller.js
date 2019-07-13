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
    let postDate = posts[0].date.getDate();
    let postMonth = posts[0].date.getMonth();
    let postYear = posts[0].date.getFullYear();
    let totalPrice = 0;
    for (let i = 0; i < posts.length; i++) {
      totalPrice += posts[i].thanhtien;
    }
    res.render('export', {
      posts: posts,
      customerName: customerName,
      postDate: postDate,
      postMonth: postMonth,
      postYear: postYear,
      totalPrice: totalPrice
    });
  } catch (err) {
    res.render('export');
  }
}