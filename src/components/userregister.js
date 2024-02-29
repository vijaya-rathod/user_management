import React,{useEffect} from 'react'
import './userregister.css'
import { Link } from "react-router-dom";
function UserRegister() {
    useEffect(() => {
        const usernameInput = document.getElementById('username');
        const mobileInput = document.getElementById('mobile');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const repasswordInput = document.getElementById('repassword');
        const dobInput=document.getElementById('qualification');
        usernameInput.addEventListener('blur', handleUsernameBlur);
        mobileInput.addEventListener('blur', handleMobileBlur);
        emailInput.addEventListener('blur', handleEmailBlur);
        passwordInput.addEventListener('blur', handlePasswordBlur);
        repasswordInput.addEventListener('blur', handleRepasswordBlur);
        dobInput.addEventListener('blur',handleQualificationBlur)
        const clearError = (errorClass) => {
            const errorElement = document.querySelector(`.${errorClass}`);
            if (errorElement) {
                errorElement.textContent = '';
            }
        };
        const handleInput = () => {
            clearError('userError');
            clearError('mobileError');
            clearError('emailError');
            clearError('passwordError');
            clearError('repasswordError');
            clearError('genderError');
            clearError('dobError');
            clearError('qualificationError');
            clearError('sportsError');
            clearError('hobbiesError');
        };
        usernameInput.addEventListener('input', handleInput);
        mobileInput.addEventListener('input', handleInput);
        emailInput.addEventListener('input', handleInput);
        passwordInput.addEventListener('input', handleInput);
        repasswordInput.addEventListener('input', handleInput);
        dobInput.addEventListener('input', handleInput);

        return () => {
            usernameInput.removeEventListener('blur', handleUsernameBlur);
            mobileInput.removeEventListener('blur', handleMobileBlur);
            emailInput.removeEventListener('blur', handleEmailBlur);
            passwordInput.removeEventListener('blur', handlePasswordBlur);
            repasswordInput.removeEventListener('blur', handleRepasswordBlur);
            dobInput.removeEventListener('blur',handleQualificationBlur);

            usernameInput.removeEventListener('input', handleInput);
            mobileInput.removeEventListener('input', handleInput);
            emailInput.removeEventListener('input', handleInput);
            passwordInput.removeEventListener('input', handleInput);
            repasswordInput.removeEventListener('input', handleInput);
            dobInput.removeEventListener('input', handleInput);

        };
    }, []);
    const handleUsernameBlur = (event) => {
        const user_name =event.target.value;
        const usernameRegex = /^[a-zA-Z\s]{3,50}$/;
        let user_error =document.querySelector('.userError');
        if (!(user_name.trim())) {
            user_error.textContent ='Please enter username';
        } else if (!(usernameRegex.test(user_name))) {
            user_error.textContent ='Enter valid username';
        }
    };
    const handleMobileBlur = (event) => {
        const mobile_number =event.target.value;
        const mobile_error =document.querySelector('.mobileError');
        const phoneNumberRegex = /^[7-9]\d{9}$/;
        
        mobile_error.textContent = '';
    
        if (!mobile_number.trim()) {
            mobile_error.textContent ='Please enter mobile number';
        } else if (!phoneNumberRegex.test(mobile_number)) {
            mobile_error.textContent ='Please enter valid mobile number';
        }
    };
    
    const handleEmailBlur = (event) => {
        const email_address =event.target.value;
        const email_error =document.querySelector('.emailError');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let existingData =localStorage.getItem('userData');
        existingData =existingData ? JSON.parse(existingData) : [];
        const isUserRegistered =existingData.some(user => user.email === email_address);
        email_error.textContent = '';
    
        if (!email_address.trim()) {
            email_error.textContent ='Please enter email';
        } else if(isUserRegistered){
            email_error.textContent='User already registered';
        }
        else if (!emailPattern.test(email_address)) {
            email_error.textContent ='Invalid email address';
        }
    };
    
    const handlePasswordBlur = (event) => {
        const pass_word =event.target.value;
        const pass_error =document.querySelector('.passwordError');
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        
        pass_error.textContent = '';
    
        if (!pass_word.trim()) {
            pass_error.textContent ='Please enter password';
        } else if (!passwordPattern.test(pass_word)) {
            pass_error.textContent ='Password must be 8-15 chars,1 lower,1 upper,1 number and one special character.';
        }
    };
    const handleQualificationBlur = (event) => {
        const qualification_input =event.target.value;
        const qualification_error =document.querySelector('.qualificationError');
        
        qualification_error.textContent = '';
    
        if (!qualification_input.trim()) {
                qualification_error.textContent ='Please enter your highest qualification';
        }
    };
    const handleRepasswordBlur = (event) => {
        const pass_word =event.target.value;
        const re_pass_word =document.getElementById('repassword').value;
        const repass_error =document.querySelector('.repasswordError');
        
        repass_error.textContent = '';
    
        if (!pass_word.trim()) {
            repass_error.textContent ='Please re-enter password';
        } else if (pass_word.trim() !== re_pass_word.trim()) {
            repass_error.textContent ='Passwords do not match';
        }
    };
    function saveData(event){
        const user_name = event.target.username.value;
        const mobile_number = event.target.mobile.value;
        const email_address=event.target.email.value;
        const pass_word=event.target.password.value;
        const re_pass_word=event.target.repassword.value;
        const user_gender=event.target.gender.value;
        const user_dob=event.target.dob.value;
        const user_qualification=event.target.qualification.value;
        const user_sports=event.target.sports.value;
        const user_hobbies=event.target.hobbies.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // const passwordPattern= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        const passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        // const passwordPattern=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const phoneNumberRegex = /^[7-9]\d{9}$/;
        const usernameRegex = /^[a-zA-Z\s]{3,50}$/;
        let flag = 0;
            
        let existingData = localStorage.getItem('userData');
        existingData = existingData ? JSON.parse(existingData) : [];
        const isUserRegistered = existingData.some(user => user.email === email_address);
        let user_error = document.querySelector('.userError');
        let mobile_error=document.querySelector('.mobileError');
        let email_error=document.querySelector('.emailError');
        let pass_error=document.querySelector('.passwordError');
    
        let repass_error=document.querySelector('.repasswordError');
        user_error.textContent = '';
        mobile_error.textContent=''
        email_error.textContent=''
        pass_error.textContent=''
        repass_error.textContent=''
        if (!(user_name.trim())) {
            user_error.textContent = 'Please enter username';
            flag=1
          }else if (!(usernameRegex.test(user_name))) {
            user_error.textContent ='Enter valid username';
            flag=1
        }
          if (!(mobile_number.trim())) {
            mobile_error.textContent= 'Please enter mobile number';
            flag=1
          }else if(!(phoneNumberRegex.test(mobile_number))){
            mobile_error.textContent= 'Please enter valid mobile number';
            flag=1
          }
          if (!(email_address.trim())) {
            email_error.textContent = 'Please enter email';
            flag=1
          }else if(isUserRegistered){
            email_error.textContent='User already registered';
            flag=1
          }
           else if (!(emailPattern.test(email_address))) {
            email_error.textContent = 'Invalid email address';
            flag=1
          }
      
          if (!pass_word.trim()) {
            pass_error.textContent = 'Please enter password';
            flag=1
          } else if (!passwordPattern.test(pass_word)) {
            pass_error.textContent =
              'Password must be 8-15 chars,1 lower,1 upper,1 number and one special character.';
                flag=1
            }
          if (!(re_pass_word.trim() == pass_word.trim())) {
            repass_error.textContent = 'Passwords do not match';
            flag=1
          }
          if(!user_gender){
            document.querySelector('.genderError').textContent='Please select your gender';
            flag=1
          }
          if(!user_dob){
            document.querySelector('.dobError').textContent='Please select your dob';
            flag=1
          }
          if(!user_qualification){
            document.querySelector('.qualificationError').textContent='Please enter your qualification';
            flag=1
          }
          if(flag==0){
            let existingData = localStorage.getItem('userData');
            existingData = existingData ? JSON.parse(existingData) : [];
            existingData.push({ 
                username: user_name, 
                mobile: mobile_number, 
                email: email_address, 
                password: pass_word ,
                qualification: user_qualification,
                dob:user_dob,
                gender: user_gender,
                hobbies:user_hobbies,
                sports: user_sports,
                IsLoggedIn:false,
                userStatus: '-'
            });
            localStorage.setItem('userData', JSON.stringify(existingData));
            event.preventDefault()
            window.location.assign('/userlogin')
            alert(`${user_name} Successfully Registered!`)
        }
        else{
            event.preventDefault()
            alert("Enter valid data")
        }
      };
  return (
    <div className='top-container'>
      <div className='registerform'>
      <h1 style={{display:'flex',justifyContent:'center'}} className='registerheader'>Registration form</h1>
        <form onSubmit={saveData}>
            <div className='flexdiv'>
            <div className='left-content'>
                <div className='align'>
                    <label htmlFor='username' className='align-left'>Full name</label>
                    <input id='username' name='username' maxLength={50} className='align-right'></input>
                </div>
                <p className='errorMessage userError'></p>
                <div className='align'>
                    <label htmlFor='mobile' className='align-left'>Mobile number</label>
                    <input id='mobile' name='mobile' className='align-right'></input>
                </div>
                <p className='errorMessage mobileError'></p>
                <div className='align'>
                    <label htmlFor='email' className='align-left'>Email</label>
                    <input id='email' name='email' className='align-right'></input>
                </div>
                <p className='errorMessage emailError'></p>
                <div className='align'>
                    <label htmlFor='password' className='align-left' >Password</label>
                    <input type='password' id='password' name='password' className='align-right'></input>
                </div>
                <p className='errorMessage passwordError'></p>
            <div className='align'>
                    <label htmlFor='repassword' className='align-left'>Re-enter password</label>
                    <input type='password' id='repassword' name='repassword' className='align-right'></input>
            </div>
                <p className='errorMessage repasswordError'></p>

            </div>


            <div className='right-content'>
                <div className='align'>
                    <label className='align-left'>Gender</label>
                    <div className='align-right'>
                        <input id="male" type="radio" name="gender" value="male" />
                        <label htmlFor="male">Male</label>
                        <input id="female" type="radio" name="gender" value="female" />
                        <label htmlFor="female">Female</label>
                    </div>

                </div>
                <p className='errorMessage genderError'></p>
                <div className='align'>
                    <label htmlFor='dob' className='align-left'>DOB</label>
                    <input type='date' name='dob' id='dob' className='align-right'></input>
                </div>
                <p className='errorMessage dobError'></p>
                <div className='align'>
                    <label htmlFor='qualification' className='align-left'>Qualification</label>
                    <input name='qualification' id='qualification' className='align-right'></input>
                </div>
                <p className='errorMessage qualificationError'></p>
                <div className='align'>
                    <label htmlFor='sports' className='align-left'>Sports</label>
                    <input name='sports' id='sports' className='align-right'></input>
                </div>
                <p className='errorMessage sportsError'></p>
                <div className='align'>
                    <label htmlFor='hobbies' className='align-left'>Hobbies</label>
                    <input name='hobbies' id='hobbies' className='align-right'></input>
                </div>
                <p className='errorMessage hobbiesError'></p>
                </div>
            </div>

            <div className="submit-container">
            <button id="submitbutton" type="submit">Submit</button>
        </div>
        <p className='haveaccount'><Link to="/userlogin">Already have an account?</Link></p>
        </form>
      </div>
      </div>
  )
}

export default UserRegister
