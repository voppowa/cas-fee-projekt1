const express = require('express');
const router = express.Router();
const tasks = require('../controller/indexController.js');

router.get("/", tasks.getTasks);
router.get("/:id/", tasks.getTask);
router.post("/create/", tasks.createTask);
router.put("/finished/:id/", tasks.finishTask);
router.put("/edit/:id/", tasks.editTask);


module.exports = router;