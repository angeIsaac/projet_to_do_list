const express = require("express");
const taskRouter = express.Router();
const authenticate = require("../middlewares/authenticate");
const { taskControllers: {deleteTask, postTAsk, putTask, getAllTask}} = require("../controllers");

taskRouter.use(authenticate);
taskRouter.post("/", postTAsk);
taskRouter.put("/:id", putTask);
taskRouter.delete("/:id", deleteTask);
taskRouter.get("/", getAllTask);


// taskRouter.route("/task")
//     .post(postTAsk)
//     .get(getAllTask);

// taskRouter.route("/task/:id")
//     .delete(deleteTask)
//     .put(putTask);

module.exports = taskRouter;