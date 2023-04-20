import React from 'react';
import style from './Login.module.css'


class Login extends React.Component {
  
  render() {
    return(
      <div className={style.blue}>
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