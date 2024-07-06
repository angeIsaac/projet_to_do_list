const {taskRepo} = require("../db/repository");


const postTAsk = async (req, res) => {
    const body = req.body;
    const result = await taskRepo.create({...body});
    res.json(result).status(200);
}

const putTask = async (req, res) => {
    const {id} = req.params;
    const body = req.body;
    const result = await taskRepo.update(body, id);
    res.json(result);
}

const getAllTask = async (req, res) => {
    const list = await taskRepo.getAll();
    res.json(list);
}

const deleteTask = async (req, res) => {
    const {id} = req.params;
    const result = await taskRepo.remove(id);
    res.json(result);
}

const deleteManyTasks = async (req, res) => {
    const {ids} = req.body;
    const result = await taskRepo.removeMany(ids);
    res.json(result);
}


module.exports = {
    getAllTask,
    putTask,
    postTAsk,
    deleteTask,
    deleteManyTasks
}