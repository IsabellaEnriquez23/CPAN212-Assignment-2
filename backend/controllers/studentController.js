const Student = require('../models/Student')

const getAllStudents = (req, res) => {
    const students = Student.getAllStudents()
    res.json(students)
}

const createStudent = (req, res) => {
    const newStudent = req.body
    
    Student.createStudent(newStudent)
    res.status(201).json(newStudent)
}

const getStudent = (req, res) => {
    const student = Student.getStudent(parseInt(req.params.id))
    if (!student){
        return res.status(404).json({message: "Student doesn't exist"})
    }
    res.json(student)
}

const updateStudent = (req, res) => {
    const updatedStudent = req.body

    const student = Student.updateStudent(parseInt(req.params.id), updatedStudent)
    if (!student){
        return res.status(404).json({message: "Student doesn't exist"})
    }
    res.json(student)
}

const deleteStudent = (req, res) => {
    const deleted = Student.deleteStudent(parseInt(req.params.id))
    if (!deleted){
        return res.status(404).json({message: "Student doesn't exist"})
    }
    res.status(200).json({message: "Student deleted"})
}

module.exports = {
    getAllStudents,
    createStudent,
    getStudent,
    updateStudent,
    deleteStudent
}