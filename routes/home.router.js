const express = require('express');
const router = express.Router();

const checkInput = require('../middlewares/checkInput.middleware');
const controller = require('../controllers/home.controller');

router.get('/', controller.showItems);

router.post('/', checkInput.checkInput, controller.postItem);

router.get('/:postId', controller.findItems);

// Search items
router.get('/search', controller.searchItems);

// Update a post

router.post('/update/:postId', checkInput.checkInput, controller.updateItem);



// Delete a post
router.get('/delete/:postId', controller.deleteItem);


module.exports = router;