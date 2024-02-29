import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
function UpdateData() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const passedValue = urlParams.get('value');
    let existingData = localStorage.getItem('userData');
    existingData = existingData ? JSON.parse(existingData) : [];
    const userIndex = existingData.findIndex(user => user.email == passedValue);
    const navigate = useNavigate();
    useEffect(() => {
        const usernameInput = document.getElementById('username');
        const mobileInput = document.getElementById('mobile');
        const passwordInput = document.getElementById('password');
        const repasswordInput = document.getElementById('repassword');
        usernameInput.addEventListener('blur', handleUsernameBlur);
        mobileInput.addEventListener('blur', handleMobileBlur);
        passwordInput.addEventListener('blur', handlePasswordBlur);
        repasswordInput.addEventListener('blur', handleRepasswordBlur);
        const isLoggedIn = existingData.find(user => user.email === passedValue && user.IsLoggedIn==true);
        if (!isLoggedIn) {
            navigate('/userlogin');
        }

        return () => {
            usernameInput.removeEventListener('blur', handleUsernameBlur);
            mobileInput.removeEventListener('blur', handleMobileBlur);
            passwordInput.removeEventListener('blur', handlePasswordBlur);
            repasswordInput.removeEventListener('blur', handleRepasswordBlur);
        };
    }, [navigate]);
    
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
        const pass_word=event.target.password.value;
        const re_pass_word=event.target.repassword.value;
        const qualification=event.target.qualification.value;
        const sports=event.target.sports.value;
        const hobbies=event.target.hobbies.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // const passwordPattern= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        const passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
        // const passwordPattern=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const phoneNumberRegex = /^[7-9]\d{9}$/;
        const usernameRegex = /^[a-zA-Z\s]{3,50}$/;
        let flag = 0;
            
        let user_error = document.querySelector('.userError');
        let mobile_error=document.querySelector('.mobileError');
        let pass_error=document.querySelector('.passwordError');
        let repass_error=document.querySelector('.repasswordError');
        user_error.textContent = '';
        mobile_error.textContent=''
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
          if(flag==0){
                if( existingData[userIndex].username==user_name && existingData[userIndex].mobile==mobile_number && existingData[userIndex].password==pass_word && existingData[userIndex].qualification==qualification && existingData[userIndex].sports==sports && existingData[userIndex].hobbies==hobbies){
                    existingData[userIndex].IsLoggedIn=false
                    localStorage.setItem('userData', JSON.stringify(existingData)); 
                    window.location.assign('/userlogin');
                    alert("No updation done!");
                }
                else{
                    existingData[userIndex].username=user_name;
                    existingData[userIndex].mobile=mobile_number;
                    existingData[userIndex].password=pass_word;
                    existingData[userIndex].qualification=qualification;
                    existingData[userIndex].IsLoggedIn=false
                    localStorage.setItem('userData', JSON.stringify(existingData)); 
                    window.location.assign('/userlogin');
                    alert("Successfully updated the data!");
                }
            
          
        }
        else{
            event.preventDefault()
            alert("Enter valid data")
        }
      };
  return (
        <div className='top-container'>
      <div className='registerform updateform'>
      <h1 style={{display:'flex',justifyContent:'center'}}>Update Details</h1>
        <form onSubmit={saveData}>
            <div className='align'>
                <label htmlFor='username' className='align-left'>Username</label>
                <input id='username' type='text' className='align-right' name='username' maxLength={50} defaultValue={existingData[userIndex].username}></input>
            </div>
            <p className='errorMessage userError'></p>
            <div className='align'>
                <label htmlFor='mobile' className='align-left'>Mobile number</label>
                <input id='mobile' className='align-right' name='mobile' type='number' defaultValue={existingData[userIndex].mobile}></input>
            </div>
            <p className='errorMessage mobileError'></p>
            <div className='align'>
                <label htmlFor='password' className='align-left'>Password</label>
                <input type='password' className='align-right' id='password' name='password' defaultValue={existingData[userIndex].password}></input>
            </div>
            <p className='errorMessage passwordError'></p>
           <div className='align'>
                <label htmlFor='repassword' className='align-left'>Re-enter password</label>
                <input type='password' className='align-right' id='repassword' name='repassword' defaultValue={existingData[userIndex].password}></input>
           </div>
           <p className='errorMessage repasswordError'></p>
           <div className='align'>
                <label htmlFor='qualification' className='align-left'>Qualification</label>
                <input type='text' className='align-right' id='qualification' name='qualification' defaultValue={existingData[userIndex].qualification}></input>
           </div>
            <p className='errorMessage qualificationError'></p>
            <div className='align'>
                <label htmlFor='sports' className='align-left'>Sports</label>
                <input type='text' className='align-right' id='sports' name='sports' defaultValue={existingData[userIndex].sports}></input>
           </div>
           <p className='errorMessage sportsError'></p>
           <div className='align'>
                <label htmlFor='hobbies' className='align-left'>Hobbies</label>
                <input type='text' className='align-right' id='hobbies' name='hobbies' defaultValue={existingData[userIndex].hobbies}></input>
           </div>
           <p className='errorMessage hobbiesError'></p>
            <div className="submit-container">
                <button id="submitbutton" type="submit">Submit</button>
            </div>
        <p className='haveaccount'><Link to="/userlogin">Don't want to update?</Link></p>
        </form>
      </div>
      </div>
  )
}


export default UpdateData
