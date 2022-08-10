import mongoose from "mongoose";

const Schema = mongoose.Schema;


const assignmentsSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    type : {
        type: String,
        required: true
    },
    instructor : {
        type: String,
        required: true
    },

    scheduled : {
        type: Date,
        required: true
    },
    optional : {
        type: Boolean,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
  
})

export const assignmentModel = mongoose.model("Assignment", assignmentsSchema);




