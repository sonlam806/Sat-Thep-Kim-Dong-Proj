const Donhang = require("../models/donhang.model");
const moment = require("moment");

module.exports.showItems = async (req, res) => {
  try {
    const today = moment().format('DD MM YYYY');

    let allPosts = await Donhang.find({
      date: today
    });

    let time = new Date;
    let presentDate = time.getDate();
    let presentMonth = time.getMonth();
    let presentYear = time.getFullYear();
    let totalPrice = 0;
    for (let i = 0; i < allPosts.length; i++) {
      totalPrice += allPosts[i].thanhtien;
    }
    res.render('index', {
      posts: allPosts,
      presentDate: presentDate,
      presentMonth: ++presentMonth,
      presentYear: presentYear,
      totalPrice: totalPrice
    });
  } catch (err) {
    res.json({
      message: err
    });
  }
};
// Find item by ID
module.exports.findItems = async (req, res) => {
  try {
    const matchedItems = await Donhang.findById(req.params.postId);
    res.render("allPosts", {
      matchedItems: matchedItems
    });
  } catch (err) {
    res.json({
      message: err
    });
  }
};

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
    res.render("search", {
      result: result,
      totalPrice: totalPrice
    });
  } catch (err) {
    res.json({
      message: err
    });
  }
};

// Post new item
module.exports.postItem = async (req, res) => {
  function titleCase(str) {
    var splitStr = str.trim().split(' ');

    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }
  let customerInput = titleCase(req.body.customer);
  let postDate = moment().format('DD MM YYYY');
  const post = new Donhang({
    customer: customerInput,
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
    phoi: req.body.phoi,
    date: postDate
  });
  try {
    const savedPost = await post.save();
    res.redirect("/"); // Có thể có lỗi chỗ này
  } catch (err) {
    res.json({
      message: err
    });
  }
};

module.exports.updateItem = async (req, res) => {
  try {
    const updatedPost = await Donhang.updateOne({
      _id: req.params.postId
    }, {
      $set: req.body
    });
    res.redirect("/");
  } catch (err) {
    res.json({
      message: err
    });
  }
};

module.exports.deleteItem = async (req, res) => {
  try {
    const deleteItem = await Donhang.remove({
      _id: req.params.postId
    });
    const posts = await Donhang.find();
    res.redirect("/");
  } catch (err) {
    res.json({
      message: err
    });
  }
};