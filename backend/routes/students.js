const express = require('express')
const router = express.Router()

const { getAllStudents, createStudent, getStudent, updateStudent, deleteStudent } = require('../controllers/studentController')

router.route('/students').get(getAllStudents).post(createStudent)
router.route('/students/:id').get(getStudent).put(updateStudent)
router.route('/students/:id').delete(deleteStudent)
module.exports = router
