import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './content/Home';
import PageContent from './content/PageContent';
import Footer from './components/Footer';

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
        </Routes>
      </div>
    </div>
    <div> <Footer /> </div>
    </Router>
  );
}

export default App;
