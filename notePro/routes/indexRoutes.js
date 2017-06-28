const express = require('express');
const router = express.Router();
const tasks = require('../controller/indexController.js');

router.get("/", tasks.getTasks);
router.post("/", tasks.createTask);
router.delete("/:id/", tasks.deleteTask);

module.exports = router;
