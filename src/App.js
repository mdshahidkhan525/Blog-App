import './App.css';
import Create from './components/create';
import Read from './components/read';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="main">
        <h2 className="main-header">React Crud Operations</h2>
        <div>
          <Routes>
            <Route path='/create' element={<Create />}/>
            <Route path='/read' element={<Read />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
