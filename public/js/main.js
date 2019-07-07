var danhSachBaoGia = new DanhSachBaoGia();
var validate = new Validation();

// Get DOM Elements
function DomID(id) {
    var element = document.getElementById(id);
    return element;
}

// Load Data from database
function getLocalStorage() {
    var jsonDanhSachDonHang = localStorage.getItem("DanhSachDonHang");
    var mangDanhSachDonHang = JSON.parse(jsonDanhSachDonHang);
    if (mangDanhSachDonHang) {
        danhSachBaoGia.DSBG = mangDanhSachDonHang;
        updateItems(danhSachBaoGia);
    }
}

getLocalStorage();
// Save data to database
function setLocalStorage() {
    var jsonDanhSachDonHang = JSON.stringify(danhSachBaoGia.DSBG);
    localStorage.setItem("DanhSachDonHang", jsonDanhSachDonHang);
}

// Save new Item
function LuuDuLieu() {
    // Get data from user
    var customer = DomID("customer").value;
    var select = DomID("select").value;
    var canh2 = DomID("canh2").value;
    var canh1 = DomID("canh1").value;
    var bung = DomID("bung").value;
    var cao = DomID('cao').value;
    var dai = DomID("dai").value;
    var day = DomID("day").value;
    var khoiluong = DomID("khoiluong").value;
    var giacong = DomID("giacong").value;
    var dongia = DomID("dongia").value;
    var soluong = DomID("soluong").value;
    var thanhtien = DomID("thanhtien").value;
    var phoi = DomID("phoi").value;
    var error = 0;
    // Validation
    if (checkInputEmpty("customer", customer)) {
        error++;
    }
    if (checkInputEmpty("select", select) == "option") {
        error++;
    }

    if (error > 0) {
        return;
    } else {
        // Add new Báo giá
        var baogia = new BaoGia(
            customer,
            select,
            canh2,
            canh1,
            bung,
            cao,
            dai,
            day,
            khoiluong,
            dongia,
            giacong,
            soluong,
            thanhtien,
            phoi
        );
        danhSachBaoGia.ThemBaoGia(baogia);
        updateItems(danhSachBaoGia);
        setLocalStorage();
        resetFields();
    }
}
// Checking value of item
function checkInputEmpty(ID, value) {
    if (validate.KiemTraRong(value)) {
        return (DomID(ID).style.borderColor = "red");
    } else {
        DomID(ID).style.borderColor = "green";
    }
}
// Update item to show on the tabl1
function updateItems(DanhSachBaoGia) {
    var lstTableShowItems = document.getElementById("tbodyShowItems");
    var tdTotalPrice = document.getElementById("totalPrice");
    var total = 0;
    tdTotalPrice.innerHTML = "";
    lstTableShowItems.innerHTML = ""; // Sử dụng forEach

    for (var i = 0; i < DanhSachBaoGia.DSBG.length; i++) {
        var donHang = DanhSachBaoGia.DSBG[i];
        // Tạo thẻ tr
        var trDonHang = document.createElement("tr");
        trDonHang.id = "trDonHang";
        // Tạo thẻ td cho các đơn hàng
        var tdCheckbox = document.createElement("td");
        var ckbDonHang = document.createElement("input");
        ckbDonHang.setAttribute("type", "checkbox");
        ckbDonHang.setAttribute("class", "checkbox-customer");
        ckbDonHang.setAttribute("value", i);
        tdCheckbox.append(ckbDonHang);
        var note = document.createElement("td");
        var editButton = document.createElement("button");
        editButton.setAttribute("onclick", "editItem(" + i + ")");
        editButton.setAttribute("class", "btn btn-primary");
        editButton.innerText = "Sửa thông tin";
        note.appendChild(editButton);

        var tdKhachHang = TaoTheTD("customerShow", donHang.Customer);
        var tdLoaiThep = TaoTheTD("selectShow", donHang.Loaithep);
        var tdSoluong = TaoTheTD("soluongShow", donHang.Soluong);
        var tdDongia = TaoTheTD("dongiaShow", donHang.Dongia);
        var tdThanhtien = TaoTheTD("thanhtienShow", donHang.Thanhtien);
        trDonHang.appendChild(tdCheckbox);
        trDonHang.appendChild(tdKhachHang);
        trDonHang.appendChild(tdLoaiThep);
        trDonHang.appendChild(tdSoluong);
        trDonHang.appendChild(tdDongia);
        trDonHang.appendChild(tdThanhtien);
        trDonHang.appendChild(note);
        // Append các tr vào tdbodyShowItems
        lstTableShowItems.appendChild(trDonHang);
        total += Math.ceil(parseInt(donHang.Thanhtien));
        var result = total.toString();
        tdTotalPrice.innerHTML = result;
    }
}

function TaoTheTD(className, value) {
    var td = document.createElement("td");
    td.className = className;
    td.innerHTML = value;
    return td;
}

function checkLoaiThep() {
    var select = DomID('select');
    var customer = DomID('customer');
    if (customer.value == "") {
        alert("Vui lòng điền tên khách hàng");
        return;
    } else if (select.value == "option") {
        alert("Vui lòng lựa chọn loại thép trước khi thanh toán!");
        return;
    }
}

function resetFields() {
    DomID("customer").value = "";
    DomID("select").value = "option";
    DomID("bung").value = "";
    DomID('cao').value = '';
    DomID("canh2").value = "";
    DomID("canh1").value = "";
    DomID("dai").value = "";
    DomID("day").value = "";
    DomID("khoiluong").value = "";
    DomID("giacong").value = "";
    DomID("dongia").value = "";
    DomID("soluong").value = "";
    DomID("thanhtien").value = "";
    DomID("phoi").value = "";
}

function deleteItems() {
    var listItems = document.getElementsByClassName("checkbox-customer");
    var listItemsChecked = []; // Mảng đơn hàng check muốn xóa theo tên khách hàng
    for (i = 0; i < listItems.length; i++) {
        if (listItems[i].checked) {
            listItemsChecked.push(listItems[i].value);
        }
    }
    danhSachBaoGia.XoaBaoGia(listItemsChecked);
    updateItems(danhSachBaoGia);
}

function searchItem() {
    var searchInput = document.getElementById("searchInput").value.toLowerCase();
    var listMatched = danhSachBaoGia.TimKiemBaoGia(searchInput);
    updateItems(listMatched);
}

function editItem(id) {
    var donHang = danhSachBaoGia.TimKiemBaoGiaTheoID(parseInt(id));
    var editItem = DomID("editItem");
    var luuDuLieuButton = DomID("saveButton");
    luuDuLieuButton.innerHTML = "";
    editItem.innerHTML = "";
    var saveButton = document.createElement("button");
    saveButton.setAttribute("onclick", "saveItem(" + id + ")");
    saveButton.setAttribute("class", "btn btn-primary mr-2");
    saveButton.innerText = "Lưu hóa đơn";
    editItem.appendChild(saveButton);

    DomID("customer").value = donHang.Customer;
    DomID("select").value = donHang.Loaithep;
    DomID("canh2").value = donHang.Canh2;
    DomID("canh1").value = donHang.Canh1;
    DomID("bung").value = donHang.Bung;
    DomID("dai").value = donHang.Dai;
    DomID("day").value = donHang.Day;
    DomID("khoiluong").value = donHang.Khoiluong;
    DomID("dongia").value = donHang.Dongia;
    DomID("giacong").value = donHang.Giacong;
    DomID("soluong").value = donHang.Soluong;
    DomID("thanhtien").value = donHang.Thanhtien;
    DomID("phoi").value = donHang.Phoi;
}

function saveItem(id) {
    // Get data from user
    var customer = DomID("customer").value;
    var select = DomID("select").value;
    var canh2 = DomID("canh2").value;
    var canh1 = DomID("canh1").value;
    var bung = DomID("bung").value;
    var cao = DomID('cao').value;
    var dai = DomID("dai").value;
    var day = DomID("day").value;
    var khoiluong = DomID("khoiluong").value;
    var giacong = DomID("giacong").value;
    var dongia = DomID("dongia").value;
    var soluong = DomID("soluong").value;
    var thanhtien = DomID("thanhtien").value;
    var phoi = DomID("phoi").value;
    var error = 0;
    // Validation
    if (checkInputEmpty("customer", customer)) {
        return error++;
    }
    if (checkInputEmpty("select", select) == "option") {
        return error++;
    }


    if (error > 0) {
        return;
    } else {
        // Add new Báo giá
        var baogia = new BaoGia(
            customer,
            select,
            canh2,
            canh1,
            bung,
            cao,
            dai,
            day,
            khoiluong,
            dongia,
            giacong,
            soluong,
            thanhtien,
            phoi
        );
        danhSachBaoGia.SuaBaoGia(id, baogia);
        updateItems(danhSachBaoGia);
        setLocalStorage();
        resetFields();
        var editItem = DomID("editItem");
        editItem.innerHTML = "";
        var luuDuLieuButton = DomID("saveButton");
        luuDuLieuButton.innerHTML =
            '<a href="#table2" onclick="LuuDuLieu()" class="btn btn-primary mr-2">Lưu đơn hàng mới';
    }
}

// Công thức tính các loại thép

function tinhtien() {
    checkLoaiThep();
    var customer = DomID("customer").value;
    var select = DomID("select").value;
    var canh2 = parseInt(DomID("canh2").value);
    var canh1 = parseInt(DomID("canh1").value);
    var bung = parseInt(DomID("bung").value);
    var cao = parseInt(DomID("cao").value);
    var dai = parseInt(DomID("dai").value);
    var day = parseInt(DomID("day").value);
    var giacong = parseInt(DomID("giacong").value);
    var soluong = parseInt(DomID("soluong").value);

    var khoiluong = DomID("khoiluong");
    var dongia = DomID("dongia");
    var thanhtien = DomID("thanhtien");
    var phoi = DomID("phoi"); // Phôi chưa nhận giá trị từ ban đầu, khi sử dụng phải thêm .value;
    if (select.toLowerCase() === "c") {
        khoiluong.value =
            (((canh2 * 2 + canh1 * 2 + bung) * dai * day * 7.85) / 1000000).toFixed(2);
        khoiluong.innerHTML = khoiluong.value;
        dongia.value = khoiluong.value * giacong;
        dongia.innerHTML = dongia.value;
        thanhtien.value = dongia.value * soluong;
        thanhtien.innerHTML = thanhtien.value;
        phoi.value = canh2 * 2 + canh1 * 2 + bung - day * 8;
        phoi.innerHTML = phoi.value;
    } else if (select.toLowerCase() === "l") {
        phoi.value = canh1 + bung - day * 2;
        khoiluong.value = (phoi.value * dai * day * 7.85) / 1000000;
        dongia.value = khoiluong.value * giacong;
        thanhtien.value = dongia.value * soluong;

        khoiluong.innerHTML = khoiluong.value;
        dongia.innerHTML = dongia.value;
        thanhtien.innerHTML = thanhtien.value;
        phoi.innerHTML = phoi.value;
    } else if (select.toLowerCase() === "tấm") {
        // Tính toán giá trị
        khoiluong.value = (((canh1 + bung) * dai * day * 7.85) / 1000000).toFixed(2);
        dongia.value = khoiluong.value * giacong;
        thanhtien.value = dongia.value * soluong;
        // Xuất ra cho người dùng dạng string
        khoiluong.innerHTML = khoiluong.value;
        dongia.innerHTML = dongia.value;
        thanhtien.innerHTML = thanhtien.value;
    } else if (select.toLowerCase() === "vít") {
        // Tính toán giá trị
        khoiluong.value = (((canh2 * 2 + canh1 * 2 + (cao - bung / 2 - day) * 2 - day * 8 + ((bung + day) * 3.14) / 2) / 1000000) * 7.85 * giacong).toFixed(2);
        dongia.value = Math.round(khoiluong.value * giacong);
        thanhtien.value = Math.round((dongia.value * soluong));
        phoi.value = Math.round((canh2 * 2 + canh1 * 2 + (cao - bung / 2 - day) * 2 - day * 8 + ((bung + day) * 3.14) / 2));

        // Xuất ra cho người dùng dạng string
        khoiluong.innerHTML = khoiluong.value;
        dongia.innerHTML = dongia.value;
        thanhtien.innerHTML = thanhtien.value;
        phoi.innerHTML = phoi.value;
    } else if (select.toLowerCase() === "ống") {
        // Tính toán giá trị
        phoi.value = Math.round((bung - day) * 3.14);
        khoiluong.value = ((phoi.value * day * dai * 7.85) / 1000000).toFixed(2);
        dongia.value = Math.round(khoiluong.value * giacong);
        thanhtien.value = Math.round((dongia.value * soluong));

        // Xuất ra cho người dùng dạng string
        khoiluong.innerHTML = khoiluong.value;
        dongia.innerHTML = dongia.value;
        thanhtien.innerHTML = thanhtien.value;
        phoi.innerHTML = phoi.value;
    } else if (select.toLowerCase() === "z, u") {
        // Tính toán giá trị
        phoi.value = Math.round((canh2 + canh1 + bung - day * 4));
        khoiluong.value = (((canh2 + canh1 + bung) * dai * day * 7.85) / 1000000).toFixed(2);
        dongia.value = Math.round(khoiluong.value * giacong);
        thanhtien.value = Math.round((dongia.value * soluong));

        // Xuất ra cho người dùng dạng string
        khoiluong.innerHTML = khoiluong.value;
        dongia.innerHTML = dongia.value;
        thanhtien.innerHTML = thanhtien.value;
        phoi.innerHTML = phoi.value;
    } else if (select.toLowerCase() === "tròn") {
        // Tính toán giá trị

        khoiluong.value = ((((bung * bung) / 1000) * 6.25 * day) / 1000).toFixed(2);
        dongia.value = Math.round(khoiluong.value * giacong);
        thanhtien.value = Math.round((dongia.value * soluong));

        // Xuất ra cho người dùng dạng string
        khoiluong.innerHTML = khoiluong.value;
        dongia.innerHTML = dongia.value;
        thanhtien.innerHTML = thanhtien.value;

    }
}