import { assignmentModel } from "../model/assignments_model";

export const createAssignment = async (req, res, next) => {
  let { optional, scheduled, instructor, type, category, title , status} = req.body;

  let assignment = new assignmentModel(req.body);

  try {
    assignment.save();
  } catch (err) {
    console.log(err);
    return res.status(200).json({ message: err.message });
  }

  return res.status(200).json({ message: "assignment create succesfully" });
};

export const getAllAssignment = async (req, res, next) => {
  let assignment;

  try {
    assignment = await assignmentModel.find();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  if (assignment) {
    return res.status(200).json({ assignment });
  }

  return res.status(404).json({ message: "no assignment found" });
};

export const getAssignmentById = async (req, res, next) => {
  const assignmentId = req.params.id;
  let assignment;
  try {
    assignment = await assignmentModel.findById(assignmentId);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  if (assignment) {
    return res.status(200).json({ assignment });
  }

  return res.status(404).json({ message: "No assignment was found" });
};

export const updateAssignment = async(req,res,next)=> {

    let { optional, scheduled, instructor, type, category, title } = req.body;
    const assignmentId = req.params.id;

    let assignment;

    try {
        assignment = await assignmentModel.findByIdAndUpdate(assignmentId, req.body)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }

    if(assignment){
        return res.status(200).json({messasge: "assignment update succesfully"})
    }

    return 

}

export const deleteAssignment = async(req,res,next)=> {

    let assignmentId = req.params.id;
    let assignment;
    try {
        assignment = await assignmentModel.findByIdAndRemove(assignmentId)
    } catch (error) {
        return res.status(400).json({message:error.message})
    }

    if(assignment){
        return res.status(200).json({message: "delete assignment suseesfully"})
    }

    return res.status(400).json({message: "error not found"})
}



export const deleteAassignment = async (req, res, next) => {
    let assignmentId = req.params.id;
    let assignment;
    try {
        assignment = await assignmentModel.findByIdAndRemove(assignmentId);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  
    if (assignment) {
      return res.status(200).json({ message: "delete assignment suseesfully" });
    }
  
    return res.status(400).json({ message: "error not found" });
  };
  
  export const distincAssignment= async (req, res, next) => {
    let distinc;
  
    try {
      distinc = await assignmentModel.aggregate([
        {
          $group: {
            _id: 0,
  
            type: { $addToSet: "$type" },
            category: { $addToSet: "$category" },
  
            instructor: { $addToSet: "$instructor" },
  
            optional: { $addToSet: "$optional" },
            status: {$addToSet: "$status"}
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
  