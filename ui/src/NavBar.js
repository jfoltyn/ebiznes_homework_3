import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './NavBar.css';
import {GLOBAL_VARS} from './App.js';
import GitHubLogin from 'react-github-login';
import axios from 'axios';

class NavBar extends Component {

   onSuccess(response) {
      GLOBAL_VARS.userLogged = true;
      let data = new FormData();
      data.append('client_id', "5dcdbb4d8204658e3fac");
      data.append('client_secret', "0283ff3d2180f684cfd905260e2ebc1f6e94c287");
      data.append('code', response.code);
      fetch(`https://github.com/login/oauth/access_token`, {
         method: 'POST',
         headers: {
            'Accept': 'application/json'
         },
         body: data
      }).then(res => {
         console.log(res)
         // GLOBAL_VARS.access_token = res.data.access_token;
         // this.downloadEmail()
      });
   };

   downloadEmail() {
      console.log(GLOBAL_VARS.access_token);
      const url = 'https://api.github.com/user/emails?access_token=' + GLOBAL_VARS.access_token;
      axios({
         method: 'get',
         url: url,
         headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
         }
      }).then(mails => {
         GLOBAL_VARS.email = mails.filter(mail => mail.primary)[0].email;
         this.forceUpdate();
      })
   }

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
                                     <GitHubLogin clientId="5dcdbb4d8204658e3fac"
                                                  redirectUri=""
                                                  className="btn btn-outline-light title-bar-log-btn"
                                                  buttonText="LOGIN"
                                                  onSuccess={this.onSuccess.bind(this)}
                                                  onFailure={this.onFailure.bind(this)}/>
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