import React from 'react';
import './Payment.css'

class Payment extends React.Component {
  
  render() {
    return(
      <div className="purple">
       <input 
          type="button"
          onClick={() => this.props.nextPage('shipping')} 
          value="back to shipping"/>
       <input 
          type="button"
          onClick={() => this.props.nextPage('confirmation')} 
          value="next to confirmation"/>
          Payment
      </div>
    )
  }
}

export default Payment