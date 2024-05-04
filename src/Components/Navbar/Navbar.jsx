import React,{useState} from 'react'
import './Navbar.css'
import logo from '../Assests/logo.png'
import { Link } from 'react-router-dom';



const Navbar = () => {

   const [menu,setMenu] = useState("HOME");


  return (
    <div className='navbar'>
       <div className='nav-logo'>
        <img src={logo} alt="" />
         <h1>PLUS ADVERSITING</h1>
       </div>
       <ul className='nav-menu'>
          <li onClick={()=>{setMenu("HOME")}}> <Link style={{ textDecoration:'none',color:'white'}} to='/'>HOME</Link>{menu==="home"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("SERVICES")}}><Link style={{ textDecoration:'none',color:'white'}} to='/SERVICES'>SERVICES </Link>{menu==="services"?<hr/>:<></>}</li>
          <li onClick={()=>{setMenu("CONTACTUS")}}><Link style={{ textDecoration:'none',color:'white'}} to='/CONTACT US'>CONTACT US </Link>{menu==="contact us"?<hr/>:<></>}</li>
       </ul>
       <div className="nav-login-cart">
        {/* Link to LoginSignup page */}
        <Link to='/loginsignup'>
          <button>LOGIN</button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
