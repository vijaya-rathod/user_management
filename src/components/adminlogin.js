
import './login.css'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from './backimage.jpg'; 
import googleIcon from './google-icon.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';


function AdminLogin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const containerStyle = {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '87vh', 
    };
  useEffect(() => {
    const emailInput =document.getElementById('adminemail');
    const passwordInput =document.getElementById('adminpassword');
    const userData =localStorage.getItem('adminData');
    const users = userData ? JSON.parse(userData) : [];

    const handleEmailBlur = () => {
        const user = users.find(user => user.email === emailInput.value.trim());
        const emailError = document.querySelector('.adminemailError');
        
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Email is required';
        } else if (!user) {
            emailError.textContent = 'Email did not match';
        } else {
            emailError.textContent = '';   
        }
    };
    const handlePasswordBlur = () => {
        const passwordError = document.querySelector('.adminpasswordError');
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
    function goToDetails(event){
    event.preventDefault()
    const admin_email = event.target.adminemail.value.trim();
    const admin_password = event.target.adminpassword.value.trim();
    const adminData = localStorage.getItem('adminData');
    const admins = adminData ? JSON.parse(adminData) : [];
    const admin = admins.find(admin => admin.email === admin_email);

    if (admin && admin_email && admin_password) {
        if(admin.password===admin_password){
            alert(`Welcome ${admin.email}`);
            admin.IsLoggedIn = true;
            localStorage.setItem('adminData', JSON.stringify(admins));
            setIsLoggedIn(true);
            navigate(`/showdetails?value=${encodeURIComponent(admin.email)}`);
        }
        else{
          
            document.querySelector('.adminpasswordError').textContent='Please enter valid password';
            event.preventDefault()
        }
    } 
    else if((!admin) && admin_email) {
        
        document.querySelector('.adminemailError').textContent='Please enter valid email';
        event.preventDefault()
    }
    else if(!admin_email){
        
        document.querySelector('.adminemailError').textContent='Please enter email'
        event.preventDefault()
    }
    else if(!admin_password){
      
      document.querySelector('.adminpasswordError').textContent='Please enter password'
      event.preventDefault()
  }
};
  return (
    <div className='frontadmin'>
         <h2 className='logintext adminhead'>Let's do something new for today. Keep learning and growing everyday. Bring out yourself and immerge in learning...................!</h2>
    <div className='container' >
      <div className='userform admincolor'>
      {/* <h1 className='logintext adminhead'>Login</h1> */}

      <div className='toplinks'>
        <button className='lefttriangle'><span className='userlink'><Link to="/userlogin">User</Link></span></button>
        <button className='righttriangle'><span className='adminlink'><Link to="/adminlogin">Admin</Link></span></button>
        </div>
        <form onSubmit={goToDetails} className='login-form'>
            <div className='input-border'>
                {/* <label htmlFor='adminemail'>Email</label> */}
                <FontAwesomeIcon icon={faEnvelope} />
                <input id='adminemail' name='adminemail' placeholder='Enter your email'></input>
            </div>
            <p className='adminemailError'></p>
            <div className='input-border'>
                {/* <label htmlFor='adminpassword'>Password</label> */}
                <FontAwesomeIcon icon={faUserShield} />
                <input type='password' id='adminpassword' name='adminpassword' placeholder='Enter your password'></input>
            </div>
            <p className='adminpasswordError'></p>
            <div className="submit-container">
              <button className="submitbutton" type="submit">Login</button>
            </div>
           
        </form>
        <p className='options'>------------------------OR------------------------</p>
             <p style={{ display: 'flex', alignItems: 'center' , cursor:'pointer',marginTop:"40px"}}>
            <img src={googleIcon} alt="Google Icon" style={{ marginLeft: '280px', width: '30px', height: '30px' }} />
            <span>Sign in with Google</span>
        </p>
       

      </div>
      </div>
      </div>
  )
}

export default AdminLogin
