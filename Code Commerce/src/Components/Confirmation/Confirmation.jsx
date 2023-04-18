import React from 'react';
import './Confirmation.css'


class Confirmation extends React.Component {
  
  render() {
    return(
      <div className="brown">
        <input 
          type="button"
          onClick={() => this.props.nextPage('payment')} 
          value="back to Payment"/>
          confirmation
      </div>
    )
  }
}

export default Confirmation