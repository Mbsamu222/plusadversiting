import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dropdown from './Components/Dropdown/Dropdown';
import Home from './Pages/Home';
import HomeCategory from './Pages/HomeCategory';
import LoginSignup from './Pages/LoginSignup'


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
          <Route>
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<HomeCategory category='SERVICES' />} />
          <Route path='/contact us' element={<HomeCategory category='CONTACTUS' />} />
          <Route path='./loginsignup' element={<LoginSignup />} />
          </Route>
          
          <Router>
            
                <Route exact path="/" component={Dropdown} />
                <Route path="/compose" component={ComposePage} />
          <Route path="/services" render={() => <HomeCategory category="SERVICES" />} />
          <Route path="/contactus" render={() => <HomeCategory category="CONTACTUS" />} />
          <Route path="/loginsignup" element={<LoginSignup/>}/>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
        


        </Router>
    </div>

    </div>

  );
}

export default App;