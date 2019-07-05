const express = require('express');
const app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);


app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));


app.get('/', (req, res) => res.render('index'));
app.get('/test', (req, res) => res.render('test'));

// Xử lý dữ liệu gửi lên từ người dùng
io.on("connection", function (socket) {
    socket.emit('news', {
        hello: "hello world"
    });
})