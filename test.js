function titleCase(str) {
  var splitStr = str.trim().split(' ');
  console.log(splitStr);
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);

  }
  // Directly return the joined string

  console.log(splitStr.join(' '));
}

titleCase('công ty TNHH lâm thái sơn');