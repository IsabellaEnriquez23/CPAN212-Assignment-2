const express = require('express')
const router = express.Router()

const { getAllCourses, createCourse, getCourse, updateCourse, deleteCourse } = require('../controllers/courseController')

router.route('/courses').get(getAllCourses).post(createCourse)
router.route('/courses/:id').get(getCourse).put(updateCourse)
router.route('/courses/:id').delete(deleteCourse)
module.exports = router
