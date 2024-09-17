import './Login.css';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';

import TopBar from '../../components/topBar/TopBar';

function Login() {

    const googleCommonStyle = { color: "#063273", };

    let navigate = useNavigate();

    const routeSearch = () => {
        let path = '/search';
        navigate(path);
    }

    const login = async () => {

        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail, 
                loginPassword
            );
            navigate('/search');
        } catch (error) {
            console.log(error.message);
        }

    }

    const [loginEmail, setloginEmail] = useState("");
    const [loginPassword, setloginPassword] = useState("");

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
                    <h5>Login</h5>
                    <p>Don't have an account? <NavLink to={"/signup"}>Creat Your Account</NavLink> it takes less than a minute</p>
                    <div className="inputs">
                        <input type="text" placeholder="Email Id" onChange={(event) => {
                            setloginEmail(event.target.value);
                        }} />
                        <br />
                        <input type="password" placeholder="Password" onChange={(event) => {
                            setloginPassword(event.target.value);
                        }} />
                    </div>

                    <br /><br />

                    <div className="remember-me--forget-password">

                        <label id='rg2'>
                            <input type="checkbox" name="item" checked />
                            <span className="text-checkbox">Remember me</span>
                        </label>
                        <p>Forget password?</p>
                    </div>

                    <br />
                    <button onClick={login}>Login</button>
                </div>

            </div>
        </div>
    );
}

export default Login;