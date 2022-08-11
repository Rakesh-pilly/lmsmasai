import { LectureModel } from "../model/lectures_model";

export const createLecture = async (req, res, next) => {
  let { optional, scheduled, instructor, type, category, title } = req.body;

  let lecture = new LectureModel(req.body);

  try {
    lecture.save();
  } catch (err) {
    console.log(err);
    return res.status(200).json({ message: err.message });
  }

  return res.status(200).json({ message: "Lecture create succesfully" });
};

export const getAllLecture = async (req, res, next) => {
  let lectures;
    

  try {
    lectures = await LectureModel.find();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  if (lectures) {
    return res.status(200).json({ lectures });
  }

  return res.status(404).json({ message: "no lectures found" });
};

export const getLectureById = async (req, res, next) => {
  const lectureId = req.params.id;
  let lecture;
  try {
    lecture = await LectureModel.findById(lectureId);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  if (lecture) {
    return res.status(200).json({ lecture });
  }

  return res.status(404).json({ message: "No Lecture was found" });
};

export const updateLecture = async (req, res, next) => {
  let { optional, scheduled, instructor, type, category, title } = req.body;
  const lectureId = req.params.id;

  let lecture;

  try {
    lecture = await LectureModel.findByIdAndUpdate(lectureId, req.body);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  if (lecture) {
    return res.status(200).json({ messasge: "Lecture update succesfully" });
  }

  return;
};

export const deleteLecture = async (req, res, next) => {
  let lectureId = req.params.id;
  let lecture;
  try {
    lecture = await LectureModel.findByIdAndRemove(lectureId);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  if (lecture) {
    return res.status(200).json({ message: "delete lecture suseesfully" });
  }

  return res.status(400).json({ message: "error not found" });
};

export const distincLecture = async (req, res, next) => {
  let distinc;

  try {
    distinc = await LectureModel.aggregate([
      {
        $group: {
          _id: 0,

          type: { $addToSet: "$type" },
          category: { $addToSet: "$category" },

          instructor: { $addToSet: "$instructor" },

          optional: { $addToSet: "$optional" },
        },
      },
    ]);
  } catch (error) {
    console.error(error);
  }

  if (distinc) {
    return res.status(200).json(distinc);
  }

  return res.status(400).json({ message: "error in the distinc finding" });
};


