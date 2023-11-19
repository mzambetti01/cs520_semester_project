import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LeaguePage from './pages/LeaguePage';

function App() {
  

  return (
    <Router>
    <div className="App">
      <div className='header'>
        <Navbar />
      </div>
      <div className='body'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/nba' element={<LeaguePage leageName="NBA" />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
