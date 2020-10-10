const router = require('express').Router();
const listController = require('../controllers/lists/lists.controller');
const verify = require('../middlewares/verifyToken');

router.get('/get-lists/:userId', verify, listController.getAllLists);
router.post('/create-list', verify, listController.createList);
router.patch('/update-list/:id/:authorId', verify, listController.updateList);
router.delete('/delete-list/:id/:authorId', verify, listController.deleteList);

module.exports = router;