import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Home';
import ProductPage from "./ProductPage";

class App extends Component {

   render() {
      return (
              <BrowserRouter>
                 <div>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/logged' component={Home}/>
                    <Route path='/product/:productId' component={ProductPage}/>
                 </div>
              </BrowserRouter>
      );
   }
}

let GLOBAL_VARS = {
   "userLogged": false,
   "access_token ": null,
   "email ": ""
};

export default App;
export {GLOBAL_VARS};
