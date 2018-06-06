import React, {Component} from 'react';
import TitleBar from './TitleBar';
import {ProductsList} from './ProductsList'

class Home extends Component {
   render() {
      return (
              <div>
                 <TitleBar/>
                 <div className="container">
                    <ProductsList/>
                 </div>
              </div>
      );
   }
}

export default Home;
