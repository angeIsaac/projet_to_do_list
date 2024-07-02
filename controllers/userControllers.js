const {userRepo} = require("../db/repository");


const postUser = async (req, res) => {
    const body = req.body;
    const result = await userRepo.create({...body});
    res.json(result).status(200);
}

const putUser = async (req, res) => {
    const {id} = req.params;
    const body = req.body;
    const result = await userRepo.update(body, id);
    res.json(result);
}

const getAllUser = async (req, res) => {
    const list = await userRepo.getAll();
    res.json(list);
}

const deleteUser = async (req, res) => {
    const {id} = req.params;
    const result = await userRepo.remove(id);
    res.json(result);
}


module.exports = {
    getAllUser,
    putUser,
    postUser,
    deleteUser
}