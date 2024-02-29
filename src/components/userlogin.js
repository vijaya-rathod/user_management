
import './login.css'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import googleIcon from './google-icon.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';

function UserLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const emailInput =document.getElementById('useremail');
    const passwordInput =document.getElementById('userpassword');
    let userData = localStorage.getItem('userData');
    userData= userData ? JSON.parse(userData) : [];
    // const userIndex = userData.findIndex(user => user.email == emailInput.value);

    // const user = userData.find(user => user.email === emailInput.value.trim() && user.IsLoggedIn==true);
    // if(user){
    //   navigate(`/updatedata?value=${encodeURIComponent(emailInput.value)}`);
    // }
        // const loggedIn = true

        // if (loggedIn === 'true') {
        //     setIsLoggedIn(true);
        // }
    const handleEmailBlur = () => {
        const user = userData.find(user => user.email === emailInput.value.trim());
        const emailError = document.querySelector('.useremailError');
        
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Email is required';
        } else if (!user) {
            emailError.textContent = 'Email did not match';
        } else {
            emailError.textContent = '';   
        }
    };
    const handlePasswordBlur = () => {
        const passwordError = document.querySelector('.userpasswordError');
        if (!passwordInput.value.trim()) {
            passwordError.textContent = 'Password is required';
        } else {
            passwordError.textContent = '';
        }
    };
    emailInput.addEventListener('blur', handleEmailBlur);
    passwordInput.addEventListener('blur', handlePasswordBlur);
    

    return () => {
        emailInput.removeEventListener('blur', handleEmailBlur);
        passwordInput.removeEventListener('blur', handlePasswordBlur);
    };
}, []);
  const checkUserValid = (event) => {
    event.preventDefault();
    const email = event.target.useremail.value.trim();
    const password = event.target.userpassword.value.trim();
    const userData = localStorage.getItem('userData');
    const users = userData ? JSON.parse(userData) : [];
    const user = users.find(user => user.email === email);

    if (user && email && password) {
        if(user.password===password){
  
        alert(`Welcome ${user.username}`);
        user.IsLoggedIn = true;
        localStorage.setItem('userData', JSON.stringify(users));
        setIsLoggedIn(true);
        navigate(`/updatedata?value=${encodeURIComponent(user.email)}`);
        }

        else{
          
            document.querySelector('.userpasswordError').textContent='Please enter valid password';
            event.preventDefault()
        }
    } 
    else if((!user) && email) {
        
        document.querySelector('.useremailError').textContent='Please enter valid email';
        event.preventDefault()
    }
    else if(!email){
        
        document.querySelector('.useremailError').textContent='Please enter email'
        event.preventDefault()
    }
    else if(!password){
      
      document.querySelector('.userpasswordError').textContent='Please enter password'
      event.preventDefault()
  }
};
  return (
    <div className='userbackground'>
                <h2 className='logintext adminhead'>Let's do something new for today. Keep learning and growing everyday. Bring out yourself and immerge in learning...................!</h2>
    <div className='container'>
      <div className='userform usercolor'>
        {/* <h1 className='logintext adminhead'>Login</h1> */}
      <div className='toplinks'>
        <button className='lefttriangle'><span className='userlink'><Link to="/userlogin">User</Link></span></button>
        <button className='righttriangle'><span className='adminlink'><Link to="/adminlogin">Admin</Link></span></button>
        </div>
        <form onSubmit={checkUserValid} className='login-form'>
            <div className='input-border'>
                {/* <label htmlFor='useremail'>Email</label> */}
                <FontAwesomeIcon icon={faEnvelope} />
                <input name='useremail' id='useremail' placeholder='Enter your email'></input>
            </div>
            <p className='useremailError'></p>
            <div className='input-border'>
                {/* <label htmlFor='userpassword'>Password</label> */}
                <FontAwesomeIcon icon={faUserShield} />
                <input type='password' name='userpassword' id='userpassword' placeholder='Enter your password'></input>
            </div>
            <p className='userpasswordError'></p>

            <div className="submit-container">
              <button className="submitbutton" type="submit">Login</button>
            </div>
            
            <p><Link to="/userregister" className='registerlink'>Register</Link><Link to="/updatepassword" className='passwordlink'>Forgot password?</Link></p>
        </form>
      </div>

      <p className='options'>------------------------OR------------------------</p>
             <p style={{ display: 'flex', alignItems: 'center' , cursor:'pointer',marginTop:"40px"}}>
            <img src={googleIcon} alt="Google Icon" style={{ marginLeft: '280px', width: '30px', height: '30px' }} />
            <span>Sign in with Google</span>
        </p>
       
    </div>
    
    </div>

  )
}

export default UserLogin
