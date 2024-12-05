import './App.css';
import Home from './components/Home.js'
import StudentList from './components/StudentList.js'
import Student from './components/Student.js'
import CourseList from './components/CourseList.js';
import Login from './components/Login.js'
import Register from './components/Register.js';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/profile', { withCredentials: true })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const logout = () => {
    axios.get('/logout', { withCredentials: true })
      .then(() => setUser(null));
    
  };

  return (
    <div className="App">
      <Router>
        <div>
            <nav>
              <Link to="/">Home</Link><br/>
              {user ? 
                <div>
                  <h3>Welcome, {user.username}!</h3>
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
              

            </nav>
          </div>

        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/students' element={<StudentList />}/>
            <Route path='/students' element={<StudentList />}/>
            <Route path='/students/:id' element={<Student />}/>
            <Route path='/courses' element={<CourseList />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
