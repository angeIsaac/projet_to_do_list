const express = require("express");
const userRouter = express.Router();
const { userControlers: {deleteUser, postUser, putUser, getAllUser}} = require("../controllers");

userRouter.post("/", postUser);
userRouter.put("/:id", putUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/", getAllUser);


// userRouter.route("/user")
//     .post(postUser)
//     .get(getAllUser);

// userRouter.route("/user/:id")
//     .delete(deleteUser)
//     .put(putUser);

module.exports = userRouter;