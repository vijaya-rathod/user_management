import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

function UpdatePassword() {
    useEffect(() => {
        const emailInput = document.getElementById('useremail');
        const oldpasswordInput = document.getElementById('useroldpassword');
        const newpasswordInput = document.getElementById('usernewpassword');
        const renewpasswordInput = document.getElementById('userrepassword');
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        const userData = localStorage.getItem('userData');
        const users = userData ? JSON.parse(userData) : [];
        
        const handleEmailBlur = () => {
            const user = users.find(user => user.email === emailInput.value.trim());
            const emailError = document.querySelector('.useremailError');

            if (!emailInput.value.trim()) {
                emailError.textContent = 'Email is required';
            } else if (!user) {
                emailError.textContent = 'Email did not match';
            } else {
                emailError.textContent = '';
            }
        };

        const handleOldPasswordBlur = () => {
            const usermatch = users.find(user => user.email === emailInput.value.trim() && user.password === oldpasswordInput.value.trim());
            const passwordError = document.querySelector('.useroldpasswordError');
            
            if (!oldpasswordInput.value.trim()) {
                passwordError.textContent = 'Password is required';
            } else if (!usermatch) {
                passwordError.textContent = 'Password did not match';
            } else {
                passwordError.textContent = '';
            }
        };

        const handleNewPasswordBlur = () => {
            const newpasswordError = document.querySelector('.usernewpasswordError');
            if (!newpasswordInput.value.trim()) {
                newpasswordError.textContent = 'Password is required';
            } else if (!passwordPattern.test(newpasswordInput.value.trim())) {
                newpasswordError.textContent = 'Password must be 8-15 chars,1 lower,1 upper,1 number and one special character.'
            } else {
                newpasswordError.textContent = '';
            }
        };

        const handleNewRePasswordBlur = () => {
            const newrepasswordError = document.querySelector('.userepasswordError');
            if (!renewpasswordInput.value.trim()) {
                newrepasswordError.textContent = 'Please re-enter password';
            } else if (renewpasswordInput.value.trim() !== newpasswordInput.value.trim()) {
                newrepasswordError.textContent = 'Passwords do not match';
            } else {
                newrepasswordError.textContent = '';
            }
        };
        
        emailInput.addEventListener('input', handleEmailBlur);
        emailInput.addEventListener('blur', handleEmailBlur);

        oldpasswordInput.addEventListener('input', handleOldPasswordBlur);
        oldpasswordInput.addEventListener('blur', handleOldPasswordBlur);

        newpasswordInput.addEventListener('input', handleNewPasswordBlur);
        newpasswordInput.addEventListener('blur', handleNewPasswordBlur);

        renewpasswordInput.addEventListener('input', handleNewRePasswordBlur);
        renewpasswordInput.addEventListener('blur', handleNewRePasswordBlur);

        return () => {
            emailInput.removeEventListener('input', handleEmailBlur);
            emailInput.removeEventListener('blur', handleEmailBlur);

            oldpasswordInput.removeEventListener('input', handleOldPasswordBlur);
            oldpasswordInput.removeEventListener('blur', handleOldPasswordBlur);

            newpasswordInput.removeEventListener('input', handleNewPasswordBlur);
            newpasswordInput.removeEventListener('blur', handleNewPasswordBlur);

            renewpasswordInput.removeEventListener('input', handleNewRePasswordBlur);
            renewpasswordInput.removeEventListener('blur', handleNewRePasswordBlur);
        };
    }, []);


    const checkUserValid = (event) => {
        event.preventDefault();
        const email = event.target.useremail.value.trim();
        const oldPassword = event.target.useroldpassword.value.trim();
        const newPassword = event.target.usernewpassword.value.trim();
        const renewPassword = event.target.userrepassword.value.trim();
        const emailUpdateError = document.querySelector('.useremailError');
        const passUpdateError=document.querySelector('.useroldpasswordError');
        const newpassUpdateError=document.querySelector('.usernewpasswordError');
        const newrepassUpdateError=document.querySelector('.userepasswordError')
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        const userData = localStorage.getItem('userData');
        let users = userData ? JSON.parse(userData) : [];
        const userIndex = users.findIndex(user => user.email === email && user.password === oldPassword);
        const usermatch=users.findIndex(user=> user.email === email)
        let flag=0;
        if(!email){
            emailUpdateError.textContent="Please enter email";
            flag=1
        } else if(usermatch===-1){
            emailUpdateError.textContent="Email did not match";
            flag=1
        }
        if (!oldPassword) {
            passUpdateError.textContent='Please enter your old password';
            flag=1;
        }
        else if(userIndex===-1){
            passUpdateError.textContent='Please enter valid password';
            flag=1;
        }

        if (!newPassword) {
            newpassUpdateError.textContent='Please enter new password';
            flag=1;
        }
        else if(!passwordPattern.test(newPassword)){
            newpassUpdateError.textContent='Password must be 8-15 chars,1 lower,1 upper,1 number and one special character.';
            flag=1;
        }
        if (!renewPassword) {
            newrepassUpdateError.textContent='Please re-enter new password';
            flag=1;
        }
        else if(renewPassword!==newPassword){
            newrepassUpdateError.textContent='Passwords did not match';
            flag=1;
        }
        if(flag===0){

           
            users[userIndex].password = newPassword; 
            localStorage.setItem('userData', JSON.stringify(users));
            event.preventDefault();
            window.location.assign('/userlogin')
            alert('Password updated successfully!');
          
            
        }
        else{
            event.preventDefault()
            alert('Enter valid details!');
        }
        
    };
    return (
        <div className='top-container'>
            <div className='userform usercolor passwordupdate'>
               
                <form onSubmit={checkUserValid}>
                <h2 className='logintext updateText'>Update Password</h2>
                    <div>
                        <label htmlFor='useremail'>Email</label>
                        <input name='useremail' id='useremail'></input>
                    </div>
                    <p className='useremailError updateError'></p>
                    <div>
                        <label htmlFor='useroldpassword'>Old Password</label>
                        <input type='password' name='useroldpassword' id='useroldpassword'></input>
                    </div>
                    <p className='useroldpasswordError updateError'></p>
                    <div>
                        <label htmlFor='usernewpassword'>New Password</label>
                        <input type='password' name='usernewpassword' id='usernewpassword'></input>
                    </div>
                    <p className='usernewpasswordError updateError'></p>
                    <div>
                        <label htmlFor='userrepassword'>Re-enter Password</label>
                        <input type='password' name='userrepassword' id='userrepassword'></input>
                    </div>
                    <p className='userepasswordError updateError'></p>
                    <div className="submit-container">
                        <button className="submitbutton" type="submit">Submit</button>
                    </div>
                    <p ><Link to="/userlogin" className='goback'>Go to login</Link></p>
                </form>
            </div>
        </div>
    );
}

export default UpdatePassword;