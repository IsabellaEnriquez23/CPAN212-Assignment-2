const Course = require('../models/Course')

const getAllCourses = (req, res) => {
    const courses = Course.getAllCourses()
    res.json(courses)
}

const createCourse = (req, res) => {
    const newCourse = req.body
    
    Course.createCourse(newCourse)
    res.status(201).json(newCourse)
}

const getCourse = (req, res) => {
    const course = Course.getCourse(parseInt(req.params.id))
    if (!course){
        return res.status(404).json({message: "Course doesn't exist"})
    }
    res.json(course)
}

const updateCourse = (req, res) => {
    const updatedCourse = req.body

    const course = Course.updateCourse(parseInt(req.params.id), updatedCourse)
    if (!course){
        return res.status(404).json({message: "Course doesn't exist"})
    }
    res.json(course)
}

const deleteCourse = (req, res) => {
    const deleted = Course.deleteCourse(parseInt(req.params.id))
    if (!deleted){
        return res.status(404).json({message: "Course doesn't exist"})
    }
    res.status(200).json({message: "Course deleted"})
}

module.exports = {
    getAllCourses,
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse
}