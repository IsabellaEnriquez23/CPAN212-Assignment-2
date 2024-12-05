import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AddCourse from './AddCourse'

const CourseList = () => {
    const [courses, setCourses] = useState([])
    const [editCourse, setEditCourse] = useState(null)
    const [courseLength, setCourseLength] = useState()
    const [addCourseObj, setAddCourseObj] = useState()

    useEffect(() => {
        axios.get('http://localhost:8000/courses')
            .then((response) => {
                setCourses(response.data)
                setCourseLength(response.data.length)
            })
            .catch((error) => {
                console.error('Error fetching courses: ', error)
            })
    })

    const handleEdit = (course) => {
        setEditCourse(course)
        setAddCourseObj(<AddCourse 
            editCourse={course} 
            setEditCourse={setEditCourse} 
            setCourses={setCourses} 
            courseLength={courseLength} 
            setCourseLength={setCourseLength}/>);
    }
    
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/courses/${id}`)
        .then(() => {
            setCourses(courses.filter((course) => course.id !== id));
        })
        .catch((error) => {
            console.error('Error deleting item:', error);
        });
    }

    const onAddCourseClick = (event) => {
        setAddCourseObj(<AddCourse 
            editCourse={null} 
            setEditCourse={setEditCourse} 
            setCourses={setCourses} 
            courseLength={courseLength} 
            setCourseLength={setCourseLength}/>);
      }

    return(
        <div>
            <h2>Course List</h2>
            <button onClick={onAddCourseClick}>Add Course</button>
            {addCourseObj}

            <ul>
                {courses.map((course) => (
                <li key={course.id}>
                    <b>Course:</b> {course.name}<br/>
                    <b>Department:</b> {course.department}<br/>
                    <b>Is Open:</b> {String(course.isOpen)}
                    <button onClick={() => handleEdit(course)}>Edit</button>
                    <button onClick={() => handleDelete(course.id)}>Delete</button><br/><br/>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default CourseList