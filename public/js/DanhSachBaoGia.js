function DanhSachBaoGia() {
  this.DSBG = [];
  this.ThemBaoGia = function(newBG) {
    this.DSBG.push(newBG);
  };
  this.SuaBaoGia = function(ID, updateBG) {
    var jsonDanhSachDonHang = localStorage.getItem("DanhSachDonHang");
    var mangDanhSachDonHang = JSON.parse(jsonDanhSachDonHang);
    this.DSBG = mangDanhSachDonHang;
    for (var i = 0; i < this.DSBG.length; i++) {
      if (ID == i) {
        this.DSBG[i] = updateBG;
        return this.DSBG;
      }
    }
    jsonDanhSachDonHang = JSON.stringify(danhSachBaoGia.DSBG);
    localStorage.setItem("DanhSachDonHang", jsonDanhSachDonHang);
  };
  this.XoaBaoGia = function(xoaDonHang) {
    // Sau này sửa thành session storage để khi tắt trang đi làm lại dữ liệu sẽ không còn
    var jsonDanhSachDonHang = localStorage.getItem("DanhSachDonHang");
    var mangDanhSachDonHang = JSON.parse(jsonDanhSachDonHang);
    this.DSBG = mangDanhSachDonHang;
    for (var i = 0; i < xoaDonHang.length; i++) {
      for (var j = 0; j < this.DSBG.length; j++) {
        if (xoaDonHang[i] == j) {
          this.DSBG.splice(j, 1); // Không thể xóa được nhiều dữ liệu một lần vì xong 1 lần splice thì index của mảng thay đổi
          // ví dụ [1, 2] then [2]; giá trị của 2 có index biến đổi thành 0;
        }
      }
    }
    jsonDanhSachDonHang = JSON.stringify(danhSachBaoGia.DSBG);
    localStorage.setItem("DanhSachDonHang", jsonDanhSachDonHang);
  };
  this.TimKiemBaoGia = function(keyWord) {
    var jsonDanhSachDonHang = localStorage.getItem("DanhSachDonHang");
    var mangDanhSachDonHang = JSON.parse(jsonDanhSachDonHang);
    this.DSBG = mangDanhSachDonHang;
    var listMatched = new DanhSachBaoGia();
    for (var i = 0; i < this.DSBG.length; i++) {
      var donhang = this.DSBG[i];
      if (donhang.Customer.toLowerCase().indexOf(keyWord) != -1) {
        listMatched.ThemBaoGia(donhang);
      }
    }
    return listMatched;
  };
  this.TimKiemBaoGiaTheoID = function(ID) {
    for (var i = 0; i < this.DSBG.length; i++) {
      if (ID == i) {
        return this.DSBG[i];
      }
    }
  };
}
