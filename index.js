const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://SinhLeVan:S1nh123456@sat-thep-kim-dong-njfys.mongodb.net/test?retryWrites=true&w=majority"
);

const Validation = require('./public/js/Validation.js');

const postRoute = require('./routes/post.route');


app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());



app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));

app.use('/post', postRoute);

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));