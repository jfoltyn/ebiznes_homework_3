import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Home';
import ProductPage from "./ProductPage";

class App extends Component {

   componentDidMount() {
      Object.assign(GLOBAL_VARS, GLOBAL_VARS, {"userLogged": false});
   }

   render() {
      return (
              <BrowserRouter>
                 <div>
                    <Route exact path='/' component={Home}/>
                    <Route path='/product/:productId' component={ProductPage}/>
                 </div>
              </BrowserRouter>
      );
   }
}

let GLOBAL_VARS = {};

export default App;
export {GLOBAL_VARS};
