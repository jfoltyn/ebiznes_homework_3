import React, {Component} from 'react';
import NavBar from './NavBar';
import {ProductsList} from './ProductsList'

class Home extends Component {
   render() {
      return (
              <div>
                 <NavBar/>
                 <div className="container">
                    <ProductsList/>
                 </div>
              </div>
      );
   }
}

export default Home;
