const express = require('express');
const router = express.Router();
const tasks = require('../controller/indexController.js');

router.get("/", tasks.getTasks);
router.post("/", tasks.createTask);
router.delete("/:id/", tasks.deleteTask);
router.put("/finished/:id/",tasks.finishTask);
router.put("/edit/:id/", tasks.editTask);

module.exports = router;