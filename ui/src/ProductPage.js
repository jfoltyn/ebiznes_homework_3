import React, {Component} from 'react';
import TitleBar from './TitleBar';

class ProductPage extends Component {

   render() {
      const productId = this.props.match.params.productId;
      return (
              <div>
                 <TitleBar/>
                 <div className="container">
                    <div className="row">
                       <div className="col-lg-12">

                          <div className="card mt-4">
                             <img className="card-img-top img-fluid" src="http://placehold.it/900x400" alt=""/>
                             <div className="card-body">
                                <h3 className="card-title">{productId}</h3>
                                <a href="#" className="btn btn-block btn-success">BUY</a>
                                <hr/>
                                <h4>$24.99</h4>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                   Sapiente dicta fugit fugiat hic aliquam itaque facere, soluta. Totam id dolores,
                                   sint aperiam sequi pariatur praesentium animi perspiciatis molestias iure,
                                   ducimus!</p>
                             </div>
                          </div>

                          <div className="card card-outline-secondary my-4">
                             <div className="card-header">
                                Product Reviews
                             </div>
                             <div className="card-body">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam
                                   inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam
                                   aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                                <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                                <hr/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam
                                   inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam
                                   aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                                <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                                <hr/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam
                                   inventore, similique necessitatibus neque non! Doloribus, modi sapiente
                                   laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint
                                   natus.</p>
                                <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                                <hr/>
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
