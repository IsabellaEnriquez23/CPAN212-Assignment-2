import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState ('')
    const [email, setEmail] = useState ('')
    const [password, setPassword] = useState ('')
    const [password2, setPassword2] = useState ('')
    const [error, setError] = useState ('')

    const navigate = useNavigate()
    const submit = async (e) => {
        e.preventDefault();
        console.log('Register route hit')
        
        if (!(email && username && password && password2)){
            setError("All boxes have to be filled out!")
        // }else if (props.accounts[username] !== undefined){
            // setError("Your username is already taken. Please enter a different username.")
        }else if (!(password === password2)){
            setError("Passwords do not match.")
        }else{
            
            try {
            await axios.post('/register', { username, email, password }, { withCredentials: true });
            window.location.href = '/login'; // Redirect to login page
            } catch (error) {
            console.error('Error registering:', error);
            }
        };
    }
    const login = () => {
        navigate(`/login`)
    }
    
    return(
        <div>
            <br/><label for="username">Username: </label><br/>
            <input id="username" type="text" value={username} onChange={(e)=> {setUsername(e.target.value)}}/><br/>
            <label for="email">Email: </label><br/>
            <input id="email" type="text" value={email} onChange={(e)=> {setEmail(e.target.value)}}/><br/>
            <label id="password">Password: </label><br/>
            <input id="password" type="password" value={password} onChange={(e)=> {setPassword(e.target.value)}}/><br/>
            <label for="password2">Re-Enter Password: </label><br/>
            <input id="password2" type="password" value={password2} onChange={(e)=> {setPassword2(e.target.value)}}/><br/>
            <div style={ {height: '30px'} }>
                {error && <p style={{ color: 'darkred' }}><b>{error}</b></p>}
            </div>
            <button class="button" onClick={submit}><b>Register</b></button>
            
            <br/>
            <p><b>Already have an account?</b> 
            <b><span style={{color: "lightblue"}} onClick={login}>Login</span></b></p>
            
        </div>
    );
     
}
export default Register