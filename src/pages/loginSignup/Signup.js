import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import StartFirebase from '../../firebase-config';

import TopBar from '../../components/topBar/TopBar';

function Signup() {

    const googleCommonStyle = { color: "#063273", };
    const [isError, setIsError] = useState(false);
    const [signUpError, setSignUpError] = useState("");

    let navigate = useNavigate();

    let db = StartFirebase();
    let user_name = '';
    let email = '';
    let uid = '';
    let phone_number = '';
    

    

    const register = async () => {

        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail, 
                registerPassword
            );

            navigate('/search');
        } catch (error) {
            console.log(error.message);
            setIsError(true);
            if(error.code === "auth/email-already-in-use"){
                setSignUpError("Entered email id is already regestered");
            }
        }

    }


    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    return (
        <div>
            <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous" />
            <TopBar />
            <div className="box-form">
                <div className="left">
                    <div className="overlay">
                        <h1>Carpool</h1>
                        <br />
                        <p>No matter where you’re going, by bus or carpool, find the perfect ride from our wide range of destinations and routes at low prices.</p>
                        <span>
                            <a href="#" id="a-1"><i className="fa fa-google" style={googleCommonStyle}></i> &nbsp; Login with Google</a>
                            <br />
                            <a href="#" id="a-4"><i className="fa fa-google-plus" style={googleCommonStyle}></i> &nbsp; Login with Google Plus</a>
                            <br />
                            <a href="#" id="a-3"><i className="fa fa-facebook" aria-hidden="true" style={googleCommonStyle}></i> &nbsp; Login with Facebook</a>
                            <br />
                            <a href="#" id="a-4"><i className="fa fa-twitter" style={{ color: "cyan", }}></i> &nbsp; Login with Twitter</a>
                        </span>
                    </div>
                </div>


                <div className="right">
                    <h5>Signup</h5>
                    <p>Don't have an account? <a href="#">Creat Your Account</a> it takes less than a minute</p>
                    <div className="inputs">
                        <input type="text" placeholder="Email Id" onChange={(event) => {
                            setRegisterEmail(event.target.value);
                        }} />
                        <br />
                        <input type="password" placeholder="Password" onChange={(event) => {
                            setRegisterPassword(event.target.value);
                        }} />
                    </div>

                    {isError && <p className='error_text'>
                        {signUpError}
                    </p>}


                    <br /><br />

                    <div className="remember-me--forget-password">

                        <label  id='rg2'>
                            <input type="checkbox" name="item" checked />
                            <span className="text-checkbox">Remember me</span>
                        </label>
                        <p>Forget password?</p>
                    </div>

                    <br />
                    <button onClick={register}>Signup</button>
                </div>

            </div>
        </div>
    );
}

export default Signup;