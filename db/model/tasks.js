const {Schema, model} = require("mongoose");
const {ObjectId} = Schema.Types;

const tasksSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner:{
        type: ObjectId,
        required: true,
    }
})

module.exports =  model("tasks", tasksSchema);