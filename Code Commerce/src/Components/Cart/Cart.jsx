import React from 'react';
import style from './Cart.module.css'

class Cart extends React.Component {
  
  render() {
    return(
      <div className={style.green}>
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