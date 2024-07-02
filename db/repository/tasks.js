const {task} = require("../model");


const create = async data => {
    try {
        const taskObj = new task(data);
        const result = await taskObj.save();
        return result;
    } catch (error) {
        console.log(error.message)
    }
}

const update = async (data, id) => {
    try {
        await task.findByIdAndUpdate(id, data);
        const result = await task.findById(id);
        return result;
    } catch (error) {
        console.log(error.message)
    }
}

const findOne = async query => {
    try {
        const result = await task.findOne(query);
        return result;
    } catch (error) {
        console.log(error.message);
    }
}

const getAll = async () => {
    try {
        const result = await task.find({});
        return result;
    } catch (error) {
        console.log(error.message);
    }
}

const remove = async id => {
    try {
        const result = await task.findByIdAndDelete(id);
        return result;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    create, findOne, 
    getAll, 
    update, 
    remove
}