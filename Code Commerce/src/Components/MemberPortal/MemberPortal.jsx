import React from 'react';
import style from './MemberPortal.module.css'
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';

class MemberPortal extends React.Component {
  render() {
    const { doesUserExist, nextPage } = this.props;
    if(doesUserExist === 'yes') {
      return (
        <div>
         <Login nextPage={nextPage}/>
        </div>
      )
    } 
    if (doesUserExist === 'no') {
      return (
        <div>
         <SignUp />
        </div>
      )
    }
  }
}

export default MemberPortal