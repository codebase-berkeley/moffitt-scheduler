import React from 'react';
import "./Login.css"

function Login(props) {
    return (
        <div className='wholePage'>
        <div className='loginBox'>
            <div className='loginBoxUpperPart'>
             <div className='login'>
                <h1>Log In</h1>
             </div>
            </div>
            <div className='loginBoxLowerPart'>

            </div>
            <div className='emailBox'>
                <div className='email'>
                <form>
                     <input type="text" placeholder="Email"></input>
                </form>

                </div>

            </div>
            <div className='passwordBox'>
                <div className='password'>
                <form>
                     {/* <label for="fname">Password</label> */}
                     <input type="text" placeholder="Password"></input>
                </form>

                    {/* <h3>Password</h3> */}

                </div>

            </div>
            <div className='logInButton'>
                <div className='logInButtonText'>
                    <h2>Log In</h2>

                </div>

            </div>
            <div className='createAccountButton'>
                <div className='createAccountButtonText'>
                    <h3>Create Account</h3>

                </div>

            </div>
        </div>
        <div className='loginBoxSurroundings'>

        </div>
        </div>
    )
}

export default Login;