// Get DOM Elements
function DomID(id) {
  var element = document.getElementById(id);
  return element;
}

// Search Đơn hàng
function searchItem() {
  let searchInput = DomID("searchInput").value.toLowerCase();
  //   let trArray = Array.from(document.querySelectorAll(".tenKhachHang"));
  let trArray = document.querySelectorAll(".tenKhachHang");

  for (let i = 0; i < trArray.length; i++) {
    // name = trArray[i].getElementsByClassName("customer");
    if (trArray[i].outerText.toLowerCase().indexOf(searchInput) === -1) {
      trArray[i].setAttribute("style", "display:none");
    } else if (
      searchInput == "" ||
      trArray[i].outerText.toLowerCase().indexOf(searchInput) > -1
    ) {
      trArray[i].removeAttribute("style");
    }
  }
}

// Công thức tính các loại thép

function tinhtien() {
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
    khoiluong.value = (
      ((canh2 * 2 + canh1 * 2 + bung) * dai * day * 7.85) /
      1000000
    ).toFixed(2);
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
    khoiluong.value = (((canh1 + bung) * dai * day * 7.85) / 1000000).toFixed(
      2
    );
    dongia.value = khoiluong.value * giacong;
    thanhtien.value = dongia.value * soluong;
    // Xuất ra cho người dùng dạng string
    khoiluong.innerHTML = khoiluong.value;
    dongia.innerHTML = dongia.value;
    thanhtien.innerHTML = thanhtien.value;
  } else if (select.toLowerCase() === "vít") {
    // Tính toán giá trị
    khoiluong.value = (
      ((canh2 * 2 +
        canh1 * 2 +
        (cao - bung / 2 - day) * 2 -
        day * 8 +
        ((bung + day) * 3.14) / 2) /
        1000000) *
      7.85 *
      giacong
    ).toFixed(2);
    dongia.value = Math.round(khoiluong.value * giacong);
    thanhtien.value = Math.round(dongia.value * soluong);
    phoi.value = Math.round(
      canh2 * 2 +
        canh1 * 2 +
        (cao - bung / 2 - day) * 2 -
        day * 8 +
        ((bung + day) * 3.14) / 2
    );

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
    thanhtien.value = Math.round(dongia.value * soluong);

    // Xuất ra cho người dùng dạng string
    khoiluong.innerHTML = khoiluong.value;
    dongia.innerHTML = dongia.value;
    thanhtien.innerHTML = thanhtien.value;
    phoi.innerHTML = phoi.value;
  } else if (select.toLowerCase() === "z, u") {
    // Tính toán giá trị
    phoi.value = Math.round(canh2 + canh1 + bung - day * 4);
    khoiluong.value = (
      ((canh2 + canh1 + bung) * dai * day * 7.85) /
      1000000
    ).toFixed(2);
    dongia.value = Math.round(khoiluong.value * giacong);
    thanhtien.value = Math.round(dongia.value * soluong);

    // Xuất ra cho người dùng dạng string
    khoiluong.innerHTML = khoiluong.value;
    dongia.innerHTML = dongia.value;
    thanhtien.innerHTML = thanhtien.value;
    phoi.innerHTML = phoi.value;
  } else if (select.toLowerCase() === "tròn") {
    // Tính toán giá trị

    khoiluong.value = ((((bung * bung) / 1000) * 6.25 * day) / 1000).toFixed(2);
    dongia.value = Math.round(khoiluong.value * giacong);
    thanhtien.value = Math.round(dongia.value * soluong);

    // Xuất ra cho người dùng dạng string
    khoiluong.innerHTML = khoiluong.value;
    dongia.innerHTML = dongia.value;
    thanhtien.innerHTML = thanhtien.value;
  }
}
