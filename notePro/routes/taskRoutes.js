const express = require('express');
const router = express.Router();
const tasks = require('../controller/indexController.js');

router.post("/create/", tasks.createTask);
router.get("/", tasks.getTasks);
router.get("/:id/", tasks.getTask);
router.put("/edit/:id/", tasks.editTask);
router.put("/finished/:id/", tasks.finishTask);
router.delete("/:id/", tasks.deleteTask);

module.exports = router;