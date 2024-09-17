import './UserDetails.css';
import bgImg from './img/bg.jpg';
import { useEffect, useRef, useState } from 'react';
import { ethers, Signer } from 'ethers';
import Carpool from '../../artifacts/contracts/Carpool.sol/Carpool.json';
import Alert from '../../components/alert/Alert';
import ContractAdress from '../../components/ContractAdress';
import { get, set, ref, child } from "firebase/database";
import StartFirebase from '../../firebase-config';
import { auth } from '../../firebase-config';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const carpoolAddress = ContractAdress();

function UserDetails() {

    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [phone, setPhone] = useState();
    const [otp, setOtp] = useState();
    const [isOtpSend, setIsOtpSend] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);
    const [tPubKey, setTPubKey] = useState(0);

    const [alertText, setAlertText] = useState('Welcome');
    const [showAlert, setShowAlert] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [page, setPage] = useState(1);

    const fnm = useRef(null);
    const lnm = useRef(null);
    const p1nxt = useRef(null);

    const phn = useRef(null);
    const sotp = useRef(null);
    const eotp = useRef(null);
    const votp = useRef(null);

    const db = StartFirebase();

    function setOnShowAlert(alertStatus) {
        setShowAlert(alertStatus);
    }

    function page1() {
        setPage(1);
    }

    function page2() {
        setPage(2);
    }

    function page3() {
        setPage(3);
    }

    function trackingCheckBoxHandler() {
        setIsTrackingEnabled(!isTrackingEnabled);
    }
    async function registerUser() {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(carpoolAddress, Carpool.abi, signer);

            try {
                await contract.register(accounts[0], fName, lName, phone, isTrackingEnabled, tPubKey);
                set(ref(db, 'trackers/' + accounts[0]), {
                    isTrackingOn: false,
                }
                );
                localStorage.setItem('userName', fName);
                setOnShowAlert(true);
                setAlertText('Sucessfully registered');
            } catch (err) {
                
                if (err.code == "ACTION_REJECTED") {
                    setAlertText('Transaction Rejected');
                }else{
                    setOnShowAlert(true);
                    setAlertText('' + err);
                }
                console.log(err);
            }
        }
    }

    async function requestAccount() {
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
    }


    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container", {
            size: "invisible",
            callback: function (response) {

                console.log(response);
            },
            defaultCountry: "IN",
        }, auth
        );
    }, []);

    const sendOTP = () => {
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, '+91' + phone, appVerifier)
            .then((confirmationResult) => {
                console.log(confirmationResult);
                window.confirmationResult = confirmationResult;
                setIsOtpSend(true);
                window.grecaptcha.reset();
                eotp.current.focus();

            }).catch((error) => {
                console.log(error);
                window.grecaptcha.reset();
                setIsOtpSend(false);
                if (error == 'FirebaseError: Firebase: TOO_SHORT (auth/invalid-phone-number).') {
                    setOnShowAlert(true);
                    setAlertText("Please enter complete phone number excluding '+91' ");
                } else if (error == 'FirebaseError: Firebase: Invalid format. (auth/invalid-phone-number).') {
                    setOnShowAlert(true);
                    setAlertText("Please enter your phone number");
                    phn.current.focus();
                } else {
                    setOnShowAlert(true);
                    setAlertText('' + error);
                }

            });

    }

    const verifyOtp = () => {
        window.confirmationResult.confirm(otp).then((result) => {
            const user = result.user;
            console.log(user);
            setOtpVerified(true);
            setOnShowAlert(true);
            setAlertText('Phone number +91-' + phone + ' verified successfully');
        }).catch((error) => {
            console.log(error);

            if (error == 'FirebaseError: Firebase: Error (auth/code-expired).') {
                setOnShowAlert(true);
                setAlertText('Otp expired, please try again with a new one. Click on the resend button to get a new otp');
            } else if(error == 'FirebaseError: Firebase: Error (auth/missing-code).'){
                setOnShowAlert(true);
                setAlertText('Please enter the otp send to +91-' + phone +' to verify');
            }else if(error == 'FirebaseError: Firebase: Error (auth/invalid-verification-code).'){
                setOnShowAlert(true);
                setAlertText('Invalid OTP');
            }else{
                setOnShowAlert(true);
                setAlertText('' + error);
            }

        });
    }




    return (
        <>
            <div className="main">

                {page === 1 ? <div className="left">
                    <h1 className='ud-title'>
                        Tell us more about yourself
                    </h1>
                    <h5 className='ud-inp_text'>First Name</h5>
                    <input className='ud-input' autoFocus ref={fnm} 
                    onKeyDown={e =>{if(e.key==='Enter'){lnm.current.focus();}}} onChange={e => { setFName(e.target.value);}} value={fName} />
                    <h5 className='ud-inp_text'>Last Name</h5>
                    <input className='ud-input' ref={lnm} onKeyDown={e =>{if(e.key==='Enter'){p1nxt.current.focus();}}}
                     onChange={e => { setLName(e.target.value) }} value={lName} />


                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <input type="button" ref={p1nxt} onClick={page2} className='pub-button' value='Next ->' />
                    </div>
                </div> : <></>}




                {page === 2 ? <div className="left">
                    <h1 className='ud-title'>
                        Tell us more about yourself
                    </h1>
                    <div style={{ paddingBottom: '0px' }}>
                        <h5 className='ud-inp_text'>Phone Number</h5>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <input type='number' className='ud-input' id='ud-phone' ref={phn} autoFocus 
                            onKeyDown={e =>{if(e.key==='Enter'){sotp.current.focus();}}}
                            onChange={e => { setPhone(e.target.value); setOtpVerified(false) }} value={phone} />
                            {isOtpSend ? <input type="button" onClick={sendOTP} className='pub-button-otp' value='Resend' />
                                :
                                <input type="button" ref={sotp} onClick={sendOTP} className='pub-button-otp' value='Send OTP' />
                            }
                        </div>
                    </div>


                    {isOtpSend && <div>
                        <h6 className='ud-inp_text-otp'>Please enter the OTP sent to <span style={{color:'#333'}}>+91-{phone}</span></h6>
                        <h5 className='ud-inp_text' style={{marginTop:'20px'}}>OTP</h5>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <input type='number' className='ud-input-otp' ref={eotp} onKeyDown={e =>{if(e.key==='Enter'){votp.current.focus();}}}
                            onChange={e => { setOtp(e.target.value) }} value={otp} />
                            <input type="button" ref={votp} onClick={verifyOtp} className='pub-button-verify' value='Verify Phone Number' />
                        </div>
                    </div>}


                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <input type="button" onClick={page1} className='pub-button' value='<- Back' />
                        {otpVerified ?
                            <input type="button" onClick={page3} className='pub-button' value='Next ->' />
                            :
                            <input type="button" disabled style={{ backgroundColor: '#aaa' }} className='pub-button' value='Please verify your phone number to continue' />
                        }
                    </div>
                </div>
                    : <></>}

                {page === 3 ? <div className="left">
                    <h1 className='ud-title'>
                        Tell us more about yourself
                    </h1>
                    <label className="toggle">
                        <h5 className='ud-toggle_text'>Enable Tracking</h5>
                        <input className="toggle-checkbox" type="checkbox" checked={isTrackingEnabled}
                            onChange={trackingCheckBoxHandler} />
                        <div className="toggle-switch"></div>
                    </label>

                    <h5 className='ud-inp_text'>Tracker's Public Key </h5>
                    <textarea rows={'2'} placeholder={'None'} className='ud-input' disabled={!isTrackingEnabled} style={{ width: '100%', resize: 'none' }} onChange={e => { setTPubKey(e.target.value) }} value={tPubKey} />


                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <input type="button" onClick={page2} className='pub-button' value='< Back' />
                        <input type="button" onClick={registerUser} className='pub-button' value='Create Account' />
                    </div>
                </div> : <></>}



                <div className="right">
                    <img src={bgImg} width='100%' height='auto' alt='background'></img>
                </div>

            </div>
            {showAlert ? <Alert text={alertText} onShowAlert={setOnShowAlert} /> : <></>}

            <div id="recaptcha-container"></div>
        </>
    );
}

export default UserDetails;