const fs = require('fs');
const path = require('path');

const courses = require('../data/courseData');
const courseDataPath = path.join(__dirname, '../data/courseData.js');

class Course{
    static getAllCourses (){
        //return object of all courses
        return courses
    }

    static getCourse(id){
        //return course object by searching array of courses for the matching id
        return courses.find(course => (course.id == id))
    }

    static updateCourse(id, updatedCourse){
        const i = courses.findIndex(course => (course.id === id))

        //findIndex returns -1 if index is not found
        if (i !== -1){
            //replace existing course with new updated course values
            courses[i] = {...courses[i], ...updatedCourse}
            fs.writeFile(courseDataPath, `module.exports = ${JSON.stringify(courses, null, 2)};`, (err) => {
                if (err) {
                  console.error('Error saving data:', err);
                }
            })
            return courses[i]
        }
        return null
    }

    static createCourse(newCourse){
        //add new course to course array
        courses.push(newCourse)
        fs.writeFile(courseDataPath, `module.exports = ${JSON.stringify(courses, null, 2)};`, (err) => {
            if (err) {
              console.error('Error saving data:', err);
            }
        })
        return newCourse
    }

    static deleteCourse(id){
        const i = courses.findIndex(course => (course.id === id))
        
        //findIndex returns -1 if index is not found
        if (i !== -1){
            //deletes 1 course element from index where course exists
            courses.splice(i, 1)
            fs.writeFile(courseDataPath, `module.exports = ${JSON.stringify(courses, null, 2)};`, (err) => {
                if (err) {
                  console.error('Error saving data:', err);
                }
            })
            return true
        }
        return false
    }
}

module.exports = Course;