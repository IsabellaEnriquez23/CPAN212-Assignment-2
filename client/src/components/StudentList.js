import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AddStudent from './AddStudent'

const StudentList = () => {
    const [students, setStudents] = useState([])
    const [editStudent, setEditStudent] = useState(null)
    const [studentLength, setStudentLength] = useState()
    const [addStudentObj, setAddStudentObj] = useState()

    useEffect(() => {
        axios.get('http://localhost:8000/students')
            .then((response) => {
                setStudents(response.data)
                setStudentLength(response.data.length)
            })
            .catch((error) => {
                console.error('Error fetching students: ', error)
            })
    })

    const handleEdit = (student) => {
        setEditStudent(student)
        setAddStudentObj(<AddStudent 
            editStudent={student} 
            setEditStudent={setEditStudent} 
            setStudents={setStudents} 
            studentLength={studentLength} 
            setStudentLength={setStudentLength}/>);
    }
    
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/students/${id}`)
        .then(() => {
            setStudents(students.filter((student) => student.id !== id));
        })
        .catch((error) => {
            console.error('Error deleting item:', error);
        });
    }

    const onAddStudentClick = (event) => {
        setAddStudentObj(<AddStudent 
            editStudent={null} 
            setEditStudent={setEditStudent} 
            setStudents={setStudents} 
            studentLength={studentLength} 
            setStudentLength={setStudentLength}/>);
      }

    return(
        <div>
            <h2>Student List</h2>
            <button onClick={onAddStudentClick}>Add Student</button>
            {addStudentObj}

            <ul>
                {students.map((student) => (
                <li key={student.id}>
                    <b>Student:</b> {student.name}<br/>
                    <b>Department:</b> {student.department}<br/>
                    <b>Current Semester:</b> {student.semester}
                    <button onClick={() => handleEdit(student)}>Edit</button>
                    <button onClick={() => handleDelete(student.id)}>Delete</button><br/><br/>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default StudentList