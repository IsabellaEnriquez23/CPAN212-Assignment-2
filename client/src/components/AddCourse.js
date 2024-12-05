import React, {useState, useEffect} from 'react'
import axios from 'axios'

const AddCourse = ({ editCourse, setEditCourse, setCourses, courseLength, setCourseLength }) => {
    const [name, setName] = useState("")
    const [department, setDepartment] = useState("")
    const [isOpen, setIsOpen] = useState(true)
    const [dispError, setDispError] = useState("")
    // cosnt [courseLength, setCourseLength] = useState()

    //checks if there is a course to be edited or if new course is being created
    useEffect(() => {
        console.log(courseLength)
        if (editCourse) {
          setName(editCourse.name)
          setDepartment(editCourse.department)
          setIsOpen(editCourse.isOpen)
        } else {
            setName("")
            setDepartment("")
            setIsOpen(true)
            // setCourseLength(courses.length)
        }
    }, [editCourse]);

    const handleNameChange = (event) => {
        setName(event.target.value);
        setDispError('')
        console.log(courseLength)
    };
    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
        setDispError('')
    };
    const handleIsOpenChange = (event) => {
        setIsOpen(event.target.value);
        setDispError()
    };

    const createCourse = () => {
        if (name.trim() === "" || department.trim() === ""){
            setDispError('Please fill name, department, and isOpen.')
        }
        else{
            let newLength = courseLength + 1
            axios.post('http://localhost:8000/courses', { id: newLength, name: name , department: department, isOpen:isOpen})
                .then((response) => {
                    setCourseLength(newLength)
                    setCourses((prevCourses) => [...prevCourses, response.data]);
                    setName("")
                    setDepartment("")
                    setIsOpen(true)
                })
                .catch((error) => {
                    console.error('Error creating course:', error);
                });
        }
    }
    

    const updateCourse = () => {
        if (name.trim() === "" || department.trim() === ""){
            setDispError('Please fill name and department.')
        }
        else{
            let currId = editCourse.id
            let updatedCourse = {id: currId, name: name, department: department, isOpen: isOpen}
            axios.put(`http://localhost:8000/courses/${editCourse.id}`, updatedCourse)
                .then((response) => {
                    console.log(response.data)
                    setCourses((prevCourses) =>
                        prevCourses.map((item) => (item.id === editCourse.id ? response.data : item))
                    );
                    setEditCourse(null);
                    setName("")
                    setDepartment("")
                    setIsOpen(true)
                })
                .catch((error) => {
                    console.error('Error updating course:', error);
                });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editCourse) {
            updateCourse();
        } else {
            createCourse();
        }
    }

    return (
        <div>
            <h2>{editCourse ? 'Edit Course' : 'Create Course'}</h2>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter course name"
            /><br/>
            <input
                type="text"
                value={department}
                onChange={handleDepartmentChange}
                placeholder="Enter department"
            /><br/>
            <span>Open Status: {String(isOpen)}</span>
            <button type="button" onClick={() => {setIsOpen(!isOpen)}}>Change Open Status</button>
            <button type="submit">{editCourse ? 'Update Course' : 'Create Course'}</button>
            <br/>{dispError && <span style={{color: 'red'}}>{dispError}</span>}
            </form>
        </div>
    );
}

export default AddCourse