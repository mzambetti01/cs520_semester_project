import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import PageContent from './content/PageContent';

function App() {
  return (
    <Router>
    <div className="App">
      <div className='header'>
        <Navbar />
      </div>
      <div className='body'>
        <Routes>
          <Route path='/' element={<PageContent leagueName="" />} />
          <Route path='/nba' element={<PageContent leagueName="NBA" />} />
          <Route path='/mlb' element={<PageContent leagueName="MLB" />} />
          <Route path='/nfl' element={<PageContent leagueName="NFL" />} />
          <Route path='/ncaaf' element={<PageContent leagueName="NCAAF" />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
