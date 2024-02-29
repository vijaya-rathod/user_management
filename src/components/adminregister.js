import React from 'react'
import { Link } from "react-router-dom";
function AdminRegister() {
    function registeradmin(event){
        let admin_email=event.target.adminemail.value.trim();
        let admin_password=event.target.adminpassword.value.trim();
        let admin_repassword=event.target.adminrepassword.value.trim();
        let existingData = localStorage.getItem('adminData');
        existingData = existingData ? JSON.parse(existingData) : [];
        const isAdminRegistered = existingData.some(admin => admin.email == admin_email);
        if(admin_email && admin_password && admin_repassword){
            if(admin_password==admin_repassword && (!isAdminRegistered)){
                existingData.push({ 
                    email: admin_email, 
                    password: admin_password,
                    IsLoggedIn:false
                });
                localStorage.setItem('adminData', JSON.stringify(existingData));
                window.location.assign('/adminlogin')
                alert("Admin Successfully Registered!")
            }
            else if (isAdminRegistered){
                event.preventDefault()
            alert("Admin already registered!")
            } 
            else if( !(admin_password== admin_repassword)){
                event.preventDefault()
                alert("Passwords did not match!")
            }
        }
        else{
            event.preventDefault()
            alert("Fill all the details!")
        }
        
    }
  return (
    <div className='top-container'>
      <div className='registerform adminregisterForm'>
      <h1 style={{display:'flex',justifyContent:'center'}}>Admin Register</h1>
        <form onSubmit={registeradmin}>
        <div className='align'>
                <label htmlFor='email'>Email</label>
                <input id='email' name='adminemail'></input>
            </div>
            <p className='errorMessage'></p>
        <div className='align'>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='adminpassword'></input>
            </div>
            <p className='errorMessage'></p>
            <div className='align'>
                <label htmlFor='repassword'>Re-enter Password</label>
                <input type='password' id='repassword' name='adminrepassword'></input>
            </div>
            <p className='errorMessage'></p>
            <div className='submit-container'>
            <button type='submit'>Submit</button>
           
            </div>
            <p className='goback'><Link to="/adminlogin">Go to login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default AdminRegister
