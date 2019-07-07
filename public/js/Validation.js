function Validation() {
    this.KiemTraRong = function (value) {
        if (value.trim() === "" || value.trim() === "option") {
            return true;
        }
        return false;
    }
}