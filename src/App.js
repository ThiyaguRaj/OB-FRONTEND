import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './components/Navbar/Nav'

function App() {
  return (
  <Router>
    <div>
      <Nav />
    </div>
  </Router>
  );
}

export default App;
