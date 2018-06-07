import React, {Component} from 'react';
import TitleBar from './TitleBar';
import axios from "axios/index";
import './ProductPage.css'

class ProductPage extends Component {

   state = {
      product: {
         "name": "Product Name",
         "description": "...",
         "price": Math.round(Math.random() * 10000) / 100
      },
      reviews: []
   };

   fetchProducts() {
      const productId = this.props.match.params.productId;
      axios.get("http://localhost:9000/product/" + productId)
              .then(res => {
                 const product = {};
                 Object.assign(product, {"price": this.state.product.price}, res.data[0]);
                 this.setState({product: product});
              });
      axios.get("http://localhost:9000/productreview/" + productId)
              .then(res => this.setState({reviews: res.data}));
   }

   componentDidMount() {
      this.fetchProducts();
   }

   render() {
      return (
              <div>
                 <TitleBar/>
                 <div className="container">
                    <div className="row">
                       <div className="col-lg-12">

                          <div className="card mt-4">
                             <img className="card-img-top img-fluid" src="http://placehold.it/900x400" alt=""/>
                             <div className="card-body">
                                <h3 className="card-title">{this.state.product.name}</h3>
                                <a href="#" className="btn btn-block btn-success">BUY</a>
                                <hr/>
                                <h4>${this.state.product.price}</h4>
                                <p className="card-text data">{this.state.product.description}</p>
                             </div>
                          </div>

                          <div className="card card-outline-secondary my-4">
                             <div className="card-header">
                                Product Reviews
                             </div>
                             <div className="card-body">
                                {
                                   this.state.reviews.map(review =>
                                           <div className="review-item">
                                              <p className="data">{review.review}</p>
                                              <small className="text-muted">Posted by {review.user}</small>
                                              <hr/>
                                           </div>
                                   )
                                }
                                <a href="#" className="btn btn-success">Leave a Review</a>
                             </div>
                          </div>

                       </div>

                    </div>
                 </div>
              </div>
      );
   }
}

export default ProductPage;
