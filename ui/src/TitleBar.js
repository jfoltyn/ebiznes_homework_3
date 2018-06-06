import React from 'react';
import { Link } from 'react-router-dom'
import logo from './logo.svg';
import './TitleBar.css';

function TitleBar() {
   return (
           <header className="TitleBar TitleBar-header">
              <Link to="/" className="btn">
                 <img src={logo} className="TitleBar-logo" alt="logo"/>
                 <h1 className="TitleBar-title">EBiznes project shop</h1>
              </Link>
           </header>
   );

}

export default TitleBar;