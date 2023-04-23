
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { Navbar } from './components/navbar';
import { Createbook } from './pages/Createbook';
import { Bookdetails } from './pages/Bookdetails';
import { Editbook } from './pages/Editbook';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/create-book" element={<Createbook/>}/>
          <Route path="/bookdetails" element={<Bookdetails/>}/>
          <Route path="/editbook" element={<Editbook/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
