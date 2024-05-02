import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note the use of Routes
import Dropdown from './Components/Dropdown/Dropdown';
import Home from './Pages/Home';
import HomeCategory from './Pages/HomeCategory';
import LoginSignup from './Pages/LoginSignup';
import Composepage from '../src/Pages/Composepage/Composepage'
import Paymentpage from './Pages/Paymentpage';



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<HomeCategory category='SERVICES' />} />
          <Route path='/contactus' element={<HomeCategory category='CONTACTUS' />} />
          <Route path='/loginsignup' element={<LoginSignup />} />

          <Route path="/" element={<Dropdown />} />
          <Route path="/compose" element={<Composepage />} />
          <Route path="/paymentpage" element={<Paymentpage />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
