import React, {Component} from 'react';
import {ProductItem} from "./ProductItem";


let products = [
   {
      "id": 1,
      "name": "Item1",
      "description": "Description of Item1.\n\nKeywords:\nTAG1\nTAG2",
      "category": 1
   },
   {
      "id": 6,
      "name": "Item2",
      "description": "Description of Item.\n\nKeywords:\nTAG1\nTAG3",
      "category": 2
   },
   {
      "id": 7,
      "name": "Item3",
      "description": "Description of Item.\n\nKeywords:\nTAG1\nTAG2",
      "category": 3
   },
   {
      "id": 8,
      "name": "Item4",
      "description": "Description of Item.\n\nKeywords:\nTAG1\nTAG2",
      "category": 4
   },
   {
      "id": 9,
      "name": "Item5",
      "description": "Description of Item.\n\nKeywords:\nTAG4",
      "category": 1
   }
];

class ProductsList extends Component {

   render() {
      return (
              <ul className="list-unstyled">
                 {products.map(product =>
                         <ProductItem
                                 name={product.name}
                                 description={product.description}/>)}
              </ul>
      );
   }
}

export {ProductsList}