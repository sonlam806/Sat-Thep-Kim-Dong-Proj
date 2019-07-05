// const low = require('lowdb');
// const FileSync = require('lowdb/adapters/FileSync');

// const adapter = new FileSync('db.json');
// const db = low(adapter);

// db.defaults({
//         items: []
//     })
//     .write()


// Khai báo biến lấy từ DOM

var select = document.getElementById('select');
var canh2 = document.getElementById('canh2');
var canh1 = document.getElementById('canh1');
var bung = document.getElementById('bung');
var cao = document.getElementById('cao');
var dai = document.getElementById('dai');
var day = document.getElementById('day');
var khoiluong = document.getElementById('khoiluong');
var giacong = document.getElementById('giacong');
var dongia = document.getElementById('dongia');
var soluong = document.getElementById('soluong');
var thanhtien = document.getElementById('thanhtien');
var addTable = document.getElementById('addTable');
var save = document.getElementById('save');
var customer = document.getElementById('customer');

// Lấy giá trị khi người dùng nhập
var selectValue;
var canh2Value;
var canh1Value;
var bungValue;
var caoValue;
var daiValue;
var dayValue;
var khoiluongValue;
var giacongValue;
var dongiaValue;
var soluongValue;
var thanhtienValue;

// addEventListener for input fields
select.addEventListener('change', function () {
    selectValue = select.value.toLowerCase();
});
canh2.addEventListener('change', function () {
    canh2Value = parseInt(canh2.value);
});
canh1.addEventListener('change', function () {
    canh1Value = parseInt(canh1.value);
});
bung.addEventListener('change', function () {
    bungValue = parseInt(bung.value);
});

dai.addEventListener('change', function () {
    daiValue = parseInt(dai.value);
});
day.addEventListener('change', function () {
    dayValue = parseInt(day.value);
    if (selectValue == 'c') {
        khoiluongValue = ((canh2Value * 2 + canh1Value * 2 + bungValue) * daiValue * dayValue * 7.85) / 1000000;
        khoiluong.value = khoiluongValue.toFixed(3);
        khoiluong.innerHTML = khoiluong.value;
    }
});

giacong.addEventListener('change', function () {
    giacongValue = parseInt(giacong.value);
    if (selectValue == 'c') {
        dongiaValue = khoiluongValue * giacongValue;
        dongia.value = dongiaValue;
        dongia.innerHTML = dongia.value;
    }
})

soluong.addEventListener('change', function () {
    soluongValue = parseInt(soluong.value);
    if (selectValue == 'c') {
        thanhtienValue = dongiaValue * soluongValue;
        thanhtien.value = thanhtienValue;
        thanhtien.innerHTML = thanhtien.value;
    }
});

// Add table
addTable.addEventListener('click', newTable);

function newTable() {
    var div = document.createElement("div");
    var content = "<table style='width:100%' id='dataTable'><tr><td><select name='' id='select'><option value='option'>Select 1 option below</option><option value='C'>Loại C</option><option value='L'>Loại L</option><option value='Tam'>Tấm</option><option value='Vit'>Vít</option><option value='Ong'>Ống</option><option value='ZU'>Z, U</option><option value='Tron'>Tròn</option><option value='Vanh'>Vành</option></select></td></tr><tr><td rowspan='2'><span>Ảnh mẫu</span><img src='pic4.jpg' alt='' width='300' height='200' /></td></tr></table><table style='width:100%' id='dataTable'><tr><th>Cánh 2</th><th>Cánh 1</th><th>Bụng, FI</th><th>Dài</th><th>Dày</th></tr><tr><td><input type='text' placeholder='Cánh 2' id='canh2' /></td><td><input type='text' placeholder='Cánh 1' id='canh1' /></td><td><input type='text' placeholder='Bụng, FI' id='bung' /></td><td><input type='text' placeholder='Dài' id='dai' /></td><td><input type='text' placeholder='Dày' id='day' /></td></tr><tr><th>Khối lượng</th><th colspan='2'>Gia công</th><th>Đơn giá</th><th>Số lượng</th></tr><tr><td><input placeholder='KL' id='khoiluong' /></td><td colspan='2'><input type='text' placeholder='Cắt, Chấn, Ống, Vít' id='giacong'/></td><td><input type='text' placeholder='Đơn giá' id='dongia' /></td><td><input type='text' placeholder='SL' id='soluong' /></td></tr><tr><td colspan='6'><span>Thành tiền</span><input type='text' placeholder='Thành tiền' id='thanhtien' /></td></tr></table>";
    var element = document.getElementById('table');
    div.innerHTML = content;
    element.appendChild(div);
};

// save data
save.addEventListener('click', saveData);

function resetFields() {
    select.value = "option";
    canh2.value = "";
    canh1.value = "";
    bung.value = "";
    dai.value = "";
    day.value = "";
    khoiluong.innerHTML = "";
    giacong.value = "";
    dongia.innerHTML = "";
    soluong.value = "";
    thanhtien.innerHTML = "";
};

function checkLoaiThep() {
    if (select.value == "option") {
        alert('Vui lòng lựa chọn loại thép trước khi thanh toán!');
        select.value = "";
    }

}

function saveData() {

    var div = document.createElement("div");
    var content = '<table><tr><th>Khách hàng</th><th>Loại thép</th><th>Dài</th><th>Dày</th><th>Đơn giá</th><th>Số lượng</th><th>Thành tiền</th></tr><tr><td>' + customer.value + '</td><td>' + selectValue.toUpperCase() + '</td><td>' + daiValue + '</td><td>' + dayValue + '</td><td>' + dongiaValue + '</td><td>' + soluongValue + '</td><td>' + thanhtienValue + '</td></tr></table>';
    div.innerHTML = content;
    var element = document.getElementById('dataSaved');
    element.appendChild(div);
    resetFields();


};
// Process database
// var item = {
//     'loaithep": selectValue,
//     "canh2": canh2Value,
//     "canh1": canh1Value,
//     "bung": bungValue,
//     "dai": daiValue,
//     "day": dayValue,
//     "khoiluong": khoiluongValue,
//     "giacong": giacongValue,
//     "dongia": dongiaValue,
//     "soluong": soluongValue,
//     "thanhtien": thanhtienValue
// }
// db.get('items').push(item).write();