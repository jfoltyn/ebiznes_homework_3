import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './NavBar.css';
import {GLOBAL_VARS} from './App.js';

class NavBar extends Component {

   login(response) {
      fetch(`http://localhost:9000/authenticate/github`)
              .then(res => {
                 // console.log(res)
              });
   };

   onFailure = response => console.error(response);

   logout() {
      GLOBAL_VARS.userLogged = false;
      GLOBAL_VARS.access_token = null;
      GLOBAL_VARS.email = "";
      this.forceUpdate();
   };

   isAuthenticated() {
      return GLOBAL_VARS.userLogged;
   }

   render() {

      return (
              <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                 <Link to="/" className="navbar-brand navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    EBiznes Super Sklep - ulepszona wersja zatem 3.5 albo lepiej (a nie jak ostatnio tylko 3.0)
                 </Link>

                 <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                       <li className="nav-item">
                          {GLOBAL_VARS.email}
                       </li>
                       <li className="nav-item">
                          {
                             !this.isAuthenticated() && (
                                     <a className="btn btn-outline-light title-bar-log-btn" href="http://localhost:9000/authenticate/github">LOGIN</a>
                             )
                          }
                          {
                             this.isAuthenticated() && (
                                     <a className="btn btn-outline-light title-bar-log-btn"
                                        onClick={this.logout.bind(this)}>LOGOUT</a>
                             )
                          }
                       </li>
                    </ul>
                 </div>
              </nav>
      );
   }

}

export default NavBar;