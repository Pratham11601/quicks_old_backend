// post.js
const express = require('express');
const app = express();

app.use(express.json());

const postsController = require('../controllers/post.controller');
const router = express.Router();

router.post('/', postsController.save);
router.get('/', postsController.show);
router.get('/active', postsController.showOnlyActive);
router.get('/history', postsController.showHistorydata);
router.get('/all', postsController.showeveryLead);

router.get('/nextfive', postsController.showOtherdata);
router.get('/from', postsController.getDistinctLocationFromValues);
router.get('/to', postsController.getDistinctLocationtoValues);
router.get('/:id', postsController.index);
router.patch('/:id', postsController.edit);

module.exports = router;