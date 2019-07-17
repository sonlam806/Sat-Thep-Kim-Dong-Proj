var data = {
  "date": "14 07 2019",
  "id": "01",
  "username": "shindo",
  "donhang": [{
    "date": "15 07 2019",
    "loaihang": [{
      'stt': '1',
      'loaithep': 'C'
    }]
  }]
};
data.donhang[0].loaihang.push({
  'stt': '2',
  'loaithep': 'L'
});

data.donhang.push({
  "date": '16 07 2019',
  "loaihang": [{
    'stt': '1',
    'loaithep': 'tam'
  }]
})
console.log(data.donhang[1]);