import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import NBA from './pages/Nba';
import Home from './pages/Home';

function App() {
  return (
    <Router>
    <div className="App">
      <div className='header'>
        <Navbar />
        <h1 className='name'>NLOQ</h1>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/nba' element={<NBA />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
