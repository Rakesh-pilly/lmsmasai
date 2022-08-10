import mongoose from "mongoose";

const Schema = mongoose.Schema;


const lectureSchema = new Schema({
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
  
})

export const LectureModel = mongoose.model("Lecture", lectureSchema);




