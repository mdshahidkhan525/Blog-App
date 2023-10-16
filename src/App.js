import './App.css';
import Create from './components/create';
import Read from './components/read';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import SignUp from './components/users/signup';
import { isUserLoggedIn } from './services/authService';

function App() {
  return (
    <Router>
      <div className="main">
        <h2 className="main-header">My Blog App</h2>
        <div>
          <Routes>
          <Route path='/create' element={<Create />}/>
            <Route path='/' element={<Read />}/>
            <Route path='/signup' element={<SignUp />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
