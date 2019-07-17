const mongoose = require('mongoose');

const Donhang = new mongoose.Schema({
  date: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    required: true
  },
  tongduno: {
    type: Number,
    default: 0
  },
  donhang: [{
    date: {
      type: String,
      default: ''
    },
    madonhang: {
      type: String,
      default: ''
    },
    tongthanhtien: {
      type: Number,
      default: 0
    },
    tra: {
      type: Number,
      default: 0
    },
    duno: {
      type: Number,
      default: 0
    },
    ngaygiao: {
      type: String,
      default: ''
    },
    loaihang: [{
      stt: {
        type: Number,
        default: 1
      },
      loaithep: {
        type: String,
        default: ''
      },
      day: {
        type: Number,
        default: 0
      },
      canh2: {
        type: Number,
        default: 0
      },
      canh1: {
        type: Number,
        default: 0
      },
      bung: {
        type: Number,
        default: 0
      },
      cao: {
        type: Number,
        default: 0
      },
      dai: {
        type: Number,
        default: 0
      },
      donvitinh: {
        type: Number,
        default: 0
      },
      soluong: {
        type: Number,
        default: 0
      },
      khoiluong: {
        type: Number,
        default: 0
      },
      dongia: {
        type: Number,
        default: 0
      },
      thanhtien: {
        type: Number,
        default: 0
      },
      phoi: {
        type: Number,
        default: 0
      },

    }]
  }]
});

module.exports = mongoose.model('Donhang', Donhang);