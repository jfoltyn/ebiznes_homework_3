import React, {Component} from 'react';
import img_placeholder from './assets/img_placeholder.svg'

class ProductItem extends Component {
   render() {
      const {name, description} = this.props;
      return (
              <li className="media my-4">
                 <img className="mr-3" src={img_placeholder} alt="Generic placeholder image"/>
                 <div className={"media-body"}>
                    <h4 className="mt-0 mb-1">{name}</h4>
                    {description}
                 </div>
              </li>
      )
   }
}

export {ProductItem}