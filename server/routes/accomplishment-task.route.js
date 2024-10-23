const express = require('express');
const router = express.Router();
const {getAccomplishmentTaskById, addAccomplishmentTask} = require('../controllers/accomplishment-task.controller.js');

router.get('/:userId', getAccomplishmentTaskById);
router.post('/', addAccomplishmentTask);

module.exports = router;