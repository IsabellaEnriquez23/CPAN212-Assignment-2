import React, {useState, useEffect} from 'react'
import axios from 'axios'

const AddStudent = ({ editStudent, setEditStudent, setStudents, studentLength, setStudentLength }) => {
    const [name, setName] = useState("")
    const [department, setDepartment] = useState("")
    const [semester, setSemester] = useState("")
    const [dispError, setDispError] = useState("")
    // cosnt [studentLength, setStudentLength] = useState()

    //checks if there is a student to be edited or if new student is being created
    useEffect(() => {
        console.log(studentLength)
        if (editStudent) {
          setName(editStudent.name)
          setDepartment(editStudent.department)
          setSemester(editStudent.semester)
        } else {
            setName("")
            setDepartment("")
            setSemester('')
            // setStudentLength(students.length)
        }
    }, [editStudent]);

    const handleNameChange = (event) => {
        setName(event.target.value);
        setDispError('')
        console.log(studentLength)
    };
    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
        setDispError('')
    };
    const handleSemesterChange = (event) => {
        setSemester(String(event.target.value));
        setDispError('')
    };

    const createStudent = () => {
        if (name.trim() === "" || department.trim() === "" || semester.trim() === ""){
            setDispError('Please fill name, department, and semester.')
        }
        else{
            let newLength = studentLength + 1
            axios.post('http://localhost:8000/students', { id: newLength, name: name , department: department, semester:parseInt(semester)})
                .then((response) => {
                    setStudentLength(newLength)
                    setStudents((prevStudents) => [...prevStudents, response.data]);
                    setName("")
                    setDepartment("")
                    setSemester('')
                })
                .catch((error) => {
                    console.error('Error creating student:', error);
                });
        }
    }
    

    const updateStudent = () => {
        if (name.trim() === "" || department.trim() === "" || semester.trim() === ""){
            setDispError('Please fill name, department, and semester.')
        }
        else{
            let currId = editStudent.id
            let updatedStudent = {id: currId, name: name, department: department, semester: parseInt(semester)}
            axios.put(`http://localhost:8000/students/${editStudent.id}`, updatedStudent)
                .then((response) => {
                    console.log(response.data)
                    setStudents((prevStudents) =>
                        prevStudents.map((item) => (item.id === editStudent.id ? response.data : item))
                    );
                    setEditStudent(null);
                    setName("")
                    setDepartment("")
                    setSemester('')
                })
                .catch((error) => {
                    console.error('Error updating student:', error);
                });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editStudent) {
            updateStudent();
        } else {
            createStudent();
        }
    }

    return (
        <div>
            <h2>{editStudent ? 'Edit Student' : 'Create Student'}</h2>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter student name"
            /><br/>
            <input
                type="text"
                value={department}
                onChange={handleDepartmentChange}
                placeholder="Enter department"
            /><br/>
            <input
                type="number"
                value={semester}
                onChange={handleSemesterChange}
                placeholder="Enter semester number"
            /><br/>
            <button type="submit">{editStudent ? 'Update Student' : 'Create Student'}</button>
            <br/>{dispError && <span style={{color: 'red'}}>{dispError}</span>}
            </form>
        </div>
    );
}

export default AddStudent