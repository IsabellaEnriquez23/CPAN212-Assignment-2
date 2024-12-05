import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const login = () => {
        if (!(username && password)){
            setError("Please enter your username and password!")
        }
        // else if(!(username in props.accounts)){
        //     setError("Username does not exist.")
        // }
        // else if(props.accounts[username].password != password){
        //     setError("Incorrect Password.")
        // }
        // else{
        //     props.setCurrAccount(username)
        //     navigate(`/newsletter/${username}`)
        // }
    }

    const signup = () => {
        navigate(`/register`)
    }

    const handleLogin = async (e) => {
        // axios.delete(`http://localhost:8000/students/${id}`)
        // .then(() => {
        //     setStudents(students.filter((student) => student.id !== id));
        // })
        // .catch((error) => {
        //     console.error('Error deleting item:', error);
        // });
        e.preventDefault();
        try {
        await axios.post('/login', { username, password }, { withCredentials: true });
        window.location.href = '/'; // Redirect after successful login
        } catch (error) {
        console.error('Error logging in:', error);
        }
    }


    return(
        <div>
            <h2>Login</h2>
            <div>
                <label id="username">Username </label><br/>
                <input id="username" type="text"  value={username} 
                onChange={(e)=> {setUsername(e.target.value)}}/>
                <br/><br/>
                <label id="password">Password </label><br/>
                <input id="password" type="password" value={password} 
                onChange={(e)=> {setPassword(e.target.value)}}/>
                <div style={ {height: '50px', padding:'12px'} }>
                    {error && <p style={{ color: 'darkred' }}><b>{error}</b></p>}
                </div>
                <button onClick={handleLogin}>Login</button>
                <br/>
                <p ><b>Don't have an account? </b> 
                <b><span style={{color: "lightblue"}} onClick={signup}>Sign Up</span></b></p>
            </div>
        
            

        </div>
    )
}
export default Login