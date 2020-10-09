const router = require('express').Router();
const listController = require('../controllers/lists/lists');
const verify = require('../middlewares/verifyToken');

router.get('/get-lists', verify, listController.getAllLists);
router.post('/create-list', verify, listController.createList);
router.patch('/update-list/:id', verify, listController.updateList);
router.delete('/delete-list/:id', verify, listController.deleteList);

module.exports = router;