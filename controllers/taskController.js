import ErrorHandler from "../middlewares/error.js";
import {Task} from "../models/taskModel.js";


export const newTask =async (req,res,next) => {
    try {
        const {title, description} = req.body;
        await Task.create({title, description, user: req.user})

        res.status(201).json({
            success: true,
            message: "Task Added"
        })
    } catch (error) {
        next(error);
    }
} 

export const getMyTask = async(req, res, next) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({user: userId});

        res.status(200).json({
            success: true,
            tasks,
        })
    } catch (error) {
        next(error);
    }
}

export const updateTask = async(req, res, next) => {
   try {
        const {id} = req.params;
        const task = await Task.findById(id);

        // if we use error then we can only give message and not status code hence we have created a error handler to accpet both message and status code
        // if(!task) return next(new Error("Invalid ID"))
        if(!task) return next(new ErrorHandler("Invalid ID", 404))

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated"
        })
   } catch (error) {
        next(error);
   }
}

export const deleteTask = async(req, res, next) => {
    try {
        const {id} = req.params;
        const task = await Task.findById(id);

        if(!task) return next(new ErrorHandler("Invalid ID", 404))

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task Deleted"
        })
    } catch (error) {
        next(error);
    }
}