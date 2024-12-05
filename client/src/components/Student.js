import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const Student = () => {
    const {id} = useParams();
    const [student, setStudent] = useState(null)
    const [loading, setLoading] = useState(true);
    console.log("Item ID from URL:", id);
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/students/${id}`)
                .then((response) => {
                    console.log('Fetched student: ', response.data)
                    setStudent(response.data)
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching students: ', error)
                    setLoading(false);
                })
            }
    }, [id]);

    if (loading) {
        return <h4>Loading...</h4>
    }
    if (!student) {
        return <h2>No item found</h2>
    }

    return(
        <div>
            <h2> Student {student.id}</h2>
            <p>
                <b>Student:</b> {student.name}<br/>
                <b>Department:</b> {student.department}<br/>
                <b>Current Semester:</b> {student.semester}
            </p>
        </div>
    )
}

export default Student