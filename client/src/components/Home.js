import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'

const Home = (props) => {
    const navigate = useNavigate()

    const logout = () => {
        axios.get('/logout', { withCredentials: true })
          .then(() => props.setUser(null));
      };

    return(
        <div>
            {/* <nav>
                <Link to="/">Home</Link><br/>
                {props.username ? 
                <div>
                    <h3>Welcome, {props.username}!</h3>
                    <Link to="/students">All Students</Link><br/>
                    <Link to="/courses">All Courses</Link>
                    <br/><br/><button onClick={logout}>Logout</button>
                </div>
                :
                <div>
                    <h3>Not logged in. Please log in</h3>
                    <Link to="/login">Login</Link>
                </div>
                }
                

            </nav> */}
            <h2>Home</h2>
            {props.username && <span>{props.username}</span>}
        </div>
    )
}

export default Home;