import React, {Component} from 'react';
import {ProductItem} from "./ProductItem";
import axios from 'axios';

class ProductsList extends Component {

   state = {
      products: []
   };

   fetchProducts() {
      axios.get('http://localhost:9000/products')
              .then(res => this.setState({products: res.data}));
   }

   componentDidMount(){
      this.fetchProducts();
   }

   render() {
      console.log(this.state.products)
      return (
              <ul className="list-unstyled">
                 {this.state.products.map(product =>
                         <ProductItem
                                 name={product.name}
                                 description={product.description}/>)}
              </ul>
      );
   }
}

export {ProductsList}