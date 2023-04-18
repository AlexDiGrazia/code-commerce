import React from 'react';
import './Login.css'


class Login extends React.Component {
  
  render() {
    return(
      <div className="blue">
        <input 
          type="button"
          onClick={() => this.props.nextPage('cart')} 
          value="Proceed to Cart"/>
          login
      </div>
    )
  }
}

export default Login