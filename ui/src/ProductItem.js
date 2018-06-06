import React, {Component} from 'react';

class ProductItem extends Component {
   render() {
      const {name, description} = this.props;
      return (
              <li className="btn media my-4">
                 <img className="mr-3" src="http://placehold.it/128x128"  alt="Generic placeholder image"/>
                 <div className={"media-body"}>
                    <h4 className="mt-0 mb-1">{name}</h4>
                    {description}
                 </div>
              </li>
      )
   }
}

export {ProductItem}