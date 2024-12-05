const fs = require('fs');
const path = require('path');

const students = require('../data/studentData');
const studentDataPath = path.join(__dirname, '../data/studentData.js');

class Student{
    static getAllStudents(){
        //return object of all students
        return students
    }

    static getStudent(id){
        //return student object by searching array of students for the matching id
        return students.find(student => (student.id == id))
    }

    static updateStudent(id, updatedStudent){
        const i = students.findIndex(student => (student.id === id))

        //findIndex returns -1 if index is not found
        if (i !== -1){
            //replace existing student with new updated student values
            students[i] = {...students[i], ...updatedStudent}
            fs.writeFile(studentDataPath, `module.exports = ${JSON.stringify(students, null, 2)};`, (err) => {
                if (err) {
                  console.error('Error saving data:', err);
                }
            })
            return students[i]
        }
        return null
    }

    static createStudent(newStudent){
        //add new student to student array
        students.push(newStudent)
        fs.writeFile(studentDataPath, `module.exports = ${JSON.stringify(students, null, 2)};`, (err) => {
            if (err) {
              console.error('Error saving data:', err);
            }
        })
        return newStudent
    }

    static deleteStudent(id){
        const i = students.findIndex(student => (student.id === id))
        
        //findIndex returns -1 if index is not found
        if (i !== -1){
            //deletes 1 student element from index where student exists
            students.splice(i, 1)
            fs.writeFile(studentDataPath, `module.exports = ${JSON.stringify(students, null, 2)};`, (err) => {
                if (err) {
                  console.error('Error saving data:', err);
                }
            })
            return true
        }
        return false
    }
}

module.exports = Student;