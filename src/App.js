import './App.css';
import Create from './components/create';
import Read from './components/read';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import SignUp from './components/users/SignUp';
import SignIn from './components/users/signin';
import { isUserLoggedIn } from './services/authService';
import Navbar from './components/shared/navbar';
function App() {
  return (
    <Router basename='/'>
      <div className="main">
        <h2 className="main-header">My Blog App</h2>
        <div>
          <Navbar />
          <Routes>
            <Route path='create' element={<Create />}/>
            <Route path='/' element={<Read />}/>
            <Route path='signup' element={<SignUp />}/>
            <Route path='signin' element={<SignIn />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
