const {user} = require("../model");


const create = async data => {
    try {
        const userObj = new user(data);
        const result = await userObj.save();
        return result;
    } catch (error) {
        console.log(error.message)
    }
}

const update = async (data, id) => {
    try {
        await user.findByIdAndUpdate(id, data);
        const result = await user.findById(id);
        return result;
    } catch (error) {
        console.log(error.message)
    }
}

const findOne = async query => {
    try {
        const result = await user.findOne(query);
        return result;
    } catch (error) {
        console.log(error.message);
    }
}

const getAll = async () => {
    try {
        const result = await user.find({});
        return result;
    } catch (error) {
        console.log(error.message);
    }
}

const remove = async id => {
    try {
        const result = await user.findByIdAndDelete(id);
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