import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Navbar.css';
import Main from './Main';
import About from './About';
import Contact from './Contact';
import Search from './Search';
import Login from './Login';

export default function(){
    return(
        <Router>
        <div className='body'>
            <nav>
                <div className="Bar"><h1><Link to ="/"
                className='link'>
                    Main</Link></h1></div>
                <div className='Bar'><h1><Link to ="/Search"
                className='link'>
                    Search</Link></h1></div>
                <div className="Bar"><h1><Link to ="/about"
                className='link'>
                    About</Link></h1></div>
                <div className="Bar"><h1><Link to ="/contact"
                className='link'>
                    Contact</Link></h1></div>
                <div className="Bar"><h1><Link to ="/Login"
                className='link'>
                    Login</Link></h1></div>    
            </nav>

            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/Search" element={<Search/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/Login" element={<Login/>}/>
            </Routes>
        </div>
    </Router> 

    );
}