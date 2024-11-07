import React from 'react';
import './Login.css';
export default function Contact() {
    return (
    <div className='body'>
        <h2>Login</h2>
        <form name='fo' method='get' className='formblock'>
            <label><div className='divId'>ID:</div><input type="text" size={15}
                value={""}></input>
            </label>
            <br></br>
           <label for="pass">PassWord:
            <input id="pass" type='password' size={15}
                value={""}></input> </label>
            <input type='submit' value={"Login"}></input>
        </form>
    </div>

);
}