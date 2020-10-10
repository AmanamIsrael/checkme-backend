const router = require('express').Router();
const listController = require('../controllers/lists/lists.controller');
const verify = require('../middlewares/verifyToken');

router.get('/get-lists', verify, listController.getAllLists);
router.post('/create-list', verify, listController.createList);
router.patch('/update-list', verify, listController.updateList);
router.delete('/delete-list', verify, listController.deleteList);

module.exports = router;