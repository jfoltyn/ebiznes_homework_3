import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './NavBar.css';

class NavBar extends Component {

   state = {
      userLogged: false,
      email: ''
   };

   login(response) {
      fetch(`http://localhost:9000/authenticate/github`);
   };

   logout() {
      sessionStorage.removeItem('userLogged');
      sessionStorage.removeItem('email');
      this.updateStateWithStorage();
   };

   updateStateWithStorage() {
      this.setState({
         userLogged: sessionStorage.getItem('userLogged'),
         email: sessionStorage.getItem('email')
      });
   };

   updateAuthorizedStatus() {
      if (!sessionStorage.getItem('userLogged')) {
         fetch('http://localhost:9000/loggeduser', {credentials: 'include'})
                 .then(res => {
                    return res.json();
                 })
                 .then(res => {
                    sessionStorage.setItem('userLogged', true);
                    sessionStorage.setItem('email', res.email);

                    this.updateStateWithStorage();
                 })
                 .catch(res => {
                    sessionStorage.removeItem('userLogged');
                    sessionStorage.removeItem('email');
                    console.log("Not logged in")
                 })
      } else {
         this.updateStateWithStorage();
      }
   };

   componentDidMount() {
      this.updateAuthorizedStatus()
   }

   render() {
      const email = sessionStorage.getItem('email');

      return (
              <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                 <Link to="/" className="navbar-brand navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    EBiznes Super Sklep - ulepszona wersja zatem 3.5 albo lepiej (a nie jak ostatnio tylko 3.0)
                 </Link>

                 <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                       <li className="navbar-brand navbar-email nav-item">
                          {this.state.email}
                       </li>
                       <li className="nav-item">
                          {
                             !this.state.userLogged && (
                                     <a className="btn btn-outline-light title-bar-log-btn"
                                        href="http://localhost:9000/authenticate/github">LOGIN</a>
                             )
                          }
                          {
                             this.state.userLogged && (
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