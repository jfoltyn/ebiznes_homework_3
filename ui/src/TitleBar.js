import React from 'react';
import {Link} from 'react-router-dom'
import './TitleBar.css';

function TitleBar() {
   return (
           <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
              <Link to="/" className="navbar-brand navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                 EBiznes Super Sklep
              </Link>

              <Link to="/" className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                 <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                       <a className="btn btn-outline-light" href="#">Login</a>
                    </li>
                 </ul>
              </Link>
           </nav>
   );

}

export default TitleBar;