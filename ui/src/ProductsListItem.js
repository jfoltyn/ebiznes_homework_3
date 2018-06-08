import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class ProductsListItem extends Component {
   render() {
      const {productId, name, description} = this.props;
      return (
              <Link to={'/product/' + productId}>
                 <li className="btn media my-4">
                    <img className="mr-3" src="http://placehold.it/128x128" alt="Generic placeholder image"/>
                    <div className={"media-body"}>
                       <h4 className="mt-2 mb-1">{name}</h4>
                       {description}
                    </div>
                 </li>

                 <hr/>
              </Link>
      )
   }
}

export {ProductsListItem}