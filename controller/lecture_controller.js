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

  let { optional, scheduled, instructor, type, category, title } = req.query;
  let flag = false;
  let q = {};
  q["$and"] = [];
  if (title && title.trim() !== "") {
    let reg = new RegExp(`^${title}`);
    q["$and"].push({ title: { $regex: reg } });
    flag = true;
  }

  if (category && category.trim() !== "") {
    q["$and"].push({ category: category });

    flag = true;
  }


  if (type && type.trim() !== "") {
    q["$and"].push({ type: type });

    flag = true;
  }
  if (scheduled && scheduled.trim() !== "") {
    q["$and"].push({ scheduled: scheduled });

    flag = true;
  }

  if (instructor && instructor.trim() !== "") {
    q["$and"].push({ instructor: instructor });

    flag = true;
  }

  if (optional && optional.trim() !== "") {

    let bol = false

    if(optional.trim() === "Yes" || (optional.trim() === "yes") ){
        bol = true;
    }
    q["$and"].push({ optional: bol });

    flag = true;
  }

  if (!flag) {
    q = {};
  }

  try {
    lectures = await LectureModel.find(q);
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
