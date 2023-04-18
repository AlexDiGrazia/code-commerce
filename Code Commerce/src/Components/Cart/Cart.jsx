import React from 'react';
import './Cart.css'

class Cart extends React.Component {
  
  render() {
    return(
      <div className="green">
       <input 
          type="button"
          onClick={() => this.props.nextPage('home-page')} 
          value="back to Home"/>
       <input 
          type="button"
          onClick={() => this.props.nextPage('shipping')} 
          value="next to shipping"/>
          Cart
      </div>
    )
  }
}

export default Cart