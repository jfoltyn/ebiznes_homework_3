import React, {Component} from 'react';
import {ProductsListItem} from "./ProductsListItem";
import axios from 'axios';

class ProductsList extends Component {

   state = {
      products: []
   };

   fetchProducts() {
      axios.get('http://localhost:9000/products')
              .then(res => this.setState({products: res.data}));
   }

   componentDidMount() {
      this.fetchProducts();
   }

   render() {
      console.log(this.state.products)
      return (
              <ul className="list-unstyled">
                 {this.state.products.map(product =>
                         <ProductsListItem
                                 name={product.name}
                                 description={product.description}
                                 productId={product.id}/>)}
              </ul>
      );
   }
}

export {ProductsList}