const mongoose = require('mongoose');

const Donhang = new mongoose.Schema({
    customer: {
        type: String,
        default: ''
    },
    loaithep: {
        type: String,
        default: ''
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
    day: {
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
    giacong: {
        type: Number,
        default: 0
    },
    soluong: {
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
    date: {
        type: Date,
        default: new Date
    }
});

module.exports = mongoose.model('Donhang', Donhang);