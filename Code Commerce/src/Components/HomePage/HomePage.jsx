import React from "react";
import MemberPortal from "../MemberPortal/MemberPortal"

class HomePage extends React.Component {
  state = {
    doesUserExist: 'yes',
  }

  render() {
    const { doesUserExist } = this.state;
    const { nextPage } = this.props;
    const radioButtonsArray = [
      {
        button: 'login',
        text: 'Login',
        page: 'login',
        group: 'select-login-or-create-account',
        id: 'login',
        bool: 'yes'
      },
      {
        button: 'create-account',
        text: 'Create Account',
        page: 'create-account',
        group: 'select-login-or-create-account',
        id: 'create-account',
        bool: 'no'
      }
    ]

    return (
      <div>
        <div className="radio-buttons">
          {radioButtonsArray.map((obj) => (
            <div key={obj.id}>
              <label htmlFor={obj.button}>{obj.text}</label>
              <input 
                onChange={() => this.setState({ doesUserExist: obj.bool})}
                name="select-login-or-create-account" 
                id={obj.id} 
                type="radio">
              </input>
            </div>
          ))}
        </div>
        
        <MemberPortal 
          doesUserExist={doesUserExist}
          nextPage={nextPage}
          />
      </div>
    );
  }
}

export default HomePage