const express = require('express');
const router = express.Router();

const checkInput = require('../middlewares/checkInput.middleware');
const controller = require('../controllers/post.controller');

router.get('/', controller.showItems);

router.post('/', checkInput.checkInput, controller.postItem);

router.get('/:postId', controller.findItems);

// router.put('')


router.get('/delete/:postId', controller.deleteItem);










module.exports = router;