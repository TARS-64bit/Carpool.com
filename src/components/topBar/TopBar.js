import { useEffect, useState } from "react";
import logo from "../images/logo3.png";
import profilePic from "../images/profile_pic.png";
import searchLogo from "../images/search.png";
import bookedLogo from '../images/BKD.png';
import hostedLogo from '../images/PUB.png';
import "./TopBar.css";
import Alert from "../alert/Alert";
import UserOptions from "./UserOptions";

import { auth } from '../../firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { ethers, Signer } from 'ethers';
import Carpool from '../../artifacts/contracts/Carpool.sol/Carpool.json';
import ContractAdress from "../ContractAdress";
import StartFirebase from '../../firebase-config';
import { get, set, ref, child, DataSnapshot } from "firebase/database";

const carpoolAddress = ContractAdress();

function TopBar(props) {

    const [user, setUser] = useState();
    const [userPubKey, setUserPubKey] = useState('');
    const [userBalance, setUserBalance] = useState(0);
    const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);
    const [isTrackingOn, setIsTrackingOn] = useState(false);
    const [trackingUserKey, setTrackingUserKey] = useState();
    const [trackingUserName, setTrackingUserName] = useState('');
    const [isTrackingOnDef, setIsTrackingOnDef] = useState(false);
    const [showSignOut, setShowSignOut] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("Welcome");

    const location = useLocation();
    const [curLocation, setCurLocation] = useState('');
    const [isHost, setIsHost] = useState(false);
    const [isPassenger, setIsPassenger] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [zIndex, setZIndex] = useState('-1');
    const [right, setRight] = useState('-10px');
    const [opacity, setOpacity] = useState('0%');
    const [mobileMenuLogo, setMobileMenuLogo] = useState('+');
    let trackingUser;

    const db = StartFirebase();



    let nav = useNavigate();

    const navToLand = () => {
        nav('/');
    }

    function setOnShowAlert(alertStatus) {
        setShowAlert(alertStatus);
    }

    const showMobileMenuHandler = () => {
        setShowMobileMenu(!showMobileMenu);
        if(showMobileMenu){
            setOpacity('100%');
            setRight('0px');
            setZIndex('10000');
            setMobileMenuLogo('-');
        }else{
            setOpacity('0%');
            setRight('-220px');
            setZIndex('-1');
            setMobileMenuLogo('+');
        }
    }

    const MINUTE_MS = 5000;





    /*
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    */
    useEffect(
        async function checkLogin() {

            const isLoggedIn = localStorage.getItem('loggedIn');

            if (typeof window.ethereum !== 'undefined') {
                const accounts = await requestAccount();
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(carpoolAddress, Carpool.abi, signer);
                const isRegistered = await contract.isUserRegistered(accounts[0]);

                if (isLoggedIn == 'true') {
                    if (isRegistered == true) {
                        setUser(localStorage.getItem('userName'));
                        const _isHost = await contract.getIsHost(accounts[0]);
                        const _isPassenger = await contract.getIsPassenger(accounts[0]);
                        setIsHost(_isHost);
                        setIsPassenger(_isPassenger);
                    } else {
                        setUser(localStorage.getItem('user'));
                    }
                }
            }

        }
    );




    async function Login() {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(carpoolAddress, Carpool.abi, signer);
            const balance = await window.ethereum.request({
                method: 'eth_getBalance',
                params: [accounts[0], 'latest']
            });
            setUser(accounts[0]);
            setUserBalance(ethers.utils.formatEther(balance));
            console.log('balance:', userBalance);
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('user', accounts[0]);

            const isUserRegistered = await contract.isUserRegistered(accounts[0]);
            console.log(isUserRegistered);
            setOnShowAlert(true);
            setAlertText('Sucessfully Logged In');
            if (!isUserRegistered) {
                nav('/user-details');
            } else {
                const _userName = await contract.getFirstName(accounts[0]);
                console.log(_userName);
                localStorage.setItem('userName', _userName);
                setUser(_userName);
                const _isHost = await contract.getIsHost(accounts[0]);
                const _isPassenger = await contract.getIsPassenger(accounts[0]);
                setIsHost(_isHost);
                setIsPassenger(_isPassenger);
                trackingUser = await contract.getTracking(accounts[0]);
                setIsTrackingEnabled(await contract.getIsTrackingUser(accounts[0]));
                setTrackingUserKey(trackingUser[2].toHexString());
                setTrackingUserName(trackingUser[0] + " " + trackingUser[1]);

                const dbref = ref(db);

                get(child(dbref, 'trackers/' + trackingUser[2].toHexString())).then((snapshot) => {
                    if (snapshot.exists()) {
                        let value;

                        snapshot.forEach(function (childSnapshot) {
                            value = childSnapshot.val();
                        });
                        if (value == true) {
                            setIsTrackingOnDef(true);
                        } else {
                            setIsTrackingOnDef(false);
                        }
                        console.log(value);
                    }
                });
            }
        } else {
            setOnShowAlert(true);
            setAlertText('Wallet not detected, Please Install Metamask');
        }
    }
    async function requestAccount() {
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    const logout = async () => {
        localStorage.setItem('loggedIn', 'false');
        setUser(null);
    }


    useEffect(async () => {
        let _userPubKey
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await requestAccount();
            _userPubKey = accounts[0];

            setUserPubKey(accounts[0]);

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(carpoolAddress, Carpool.abi, signer);

        }



        const interval = setInterval(() => {


            const dbref = ref(db);

            get(child(dbref, 'trackers/' + _userPubKey)).then((snapshot) => {
                if (snapshot.exists()) {
                    var value;
                    snapshot.forEach(function (childSnapshot) {
                        value = childSnapshot.val();
                    });

                    console.log(value);

                    if (navigator.geolocation && value) {
                        console.log(_userPubKey);
                        navigator.geolocation.getCurrentPosition(function (position) {
                            console.log("Latitude is :", position.coords.latitude);
                            console.log("Longitude is :", position.coords.longitude);
                            console.log(_userPubKey);
                            set(ref(db, 'trackers/' + _userPubKey + '/co-ordinates'), {
                                longitude: position.coords.longitude,
                                latitude: position.coords.latitude,
                            }
                            );
                        }, error => console.log(error),
                        {enableHighAccuracy: true});
                    }
                }
            })

        }, MINUTE_MS);

        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])


    const showSignOutHandler = () => {
        if (showSignOut === false) {
            setShowSignOut(true);
        } else {
            setShowSignOut(false);
        }
    }

    useEffect(() => {
        const hideSignOut = (e) => {

            const idList = ['user_name', 'user_options', 'user_pub_key_overlay',
                'pub_key_text', 'user_pub_key_wrapper', 'options_text', 'options_sub_text', 'toggle', 'toggle-switch',
                'toggle-checkbox'
            ];

            if (!(idList.includes(e.target.className))) {
                setShowSignOut(false);

            }
        }

        document.body.addEventListener('click', hideSignOut);
        return () => document.body.addEventListener('click', hideSignOut);
    }, [])


    function isTrackOn(_isTrackingOn) {
        setIsTrackingOn(_isTrackingOn);
        setIsTrackingOnDef(_isTrackingOn);
        if (trackingUserKey) {
            set(ref(db, 'trackers/' + trackingUserKey), {
                isTrackingOn: _isTrackingOn,
            }
            );
            console.log(trackingUserKey);
        }

    }


    return (
        <>
            <div className="top_bar">

                {curLocation ? <>{curLocation}</> : <></>}
                <img className="logo" onClick={navToLand} src={logo} alt="Logo" />
                <div className="user">
                    {location.pathname === "/search" ? <></> : <NavLink to={"/search"} className="search">
                        <img className="searchLogo" src={searchLogo} alt="O" />
                        <h4>Search</h4>
                    </NavLink>}
                    {isPassenger ?
                        <NavLink to={"/booked-rides"} className="search">
                            <img className="searchLogo" src={bookedLogo} alt="O" />
                            <h4>Booked Rides</h4>
                        </NavLink> : <></>}

                    {isHost ?
                        <NavLink to={"/hosted-rides"} className="search">
                            <img className="searchLogo" src={hostedLogo} alt="O" />
                            <h4>Hosted Rides</h4>
                        </NavLink> : <></>}

                    {isTrackingOn ? <NavLink to={"/track"} className="pub_ride" id="pub_ride">Tracking</NavLink> : <></>}
                    {user ? <NavLink to={"/publish"} className="pub_ride" id="pub_ride">Publish a ride</NavLink> : <NavLink to={"/user-details"} className="pub_ride"><h4>Publish A Ride</h4></NavLink>}

                    {user && <img className="profile_pic" src={profilePic} alt="Profile Pic" />}
                    {user ? <h4 onClick={() => showSignOutHandler()} className="user_name" id="user_name">{user}</h4> : <h4 onClick={Login} className="login_text">Login</h4>}

                </div>
            </div>


            {showSignOut &&
                <UserOptions userPubKey={userPubKey} userBalance={userBalance}
                    isTrackingEnabled={isTrackingEnabled} trackingUserName={trackingUserName}
                    trackingUserKey={trackingUserKey}
                    isTrackOn={isTrackOn}
                    logout={logout}
                    isTrackOnDef={isTrackingOnDef}
                />

            }
            <div className="mobileMenuWrapper">
                
                    <div style={{opacity: opacity, zIndex: zIndex, right: right}} className="mobileMenuContent">
                        {location.pathname === "/search" ? <></> : <NavLink to={"/search"} className="search-mob">
                            <img className="searchLogo-mob" src={searchLogo} alt="O" />
                            <h4 className="searchText">Search</h4>
                        </NavLink>}
                        {isPassenger ?
                            <NavLink to={"/booked-rides"} className="search-mob">
                                <img className="searchLogo-mob" src={bookedLogo} alt="O" />
                                <h4 className="searchText">Booked Rides</h4>
                            </NavLink> : <></>}

                        {isHost ?
                            <NavLink to={"/hosted-rides"} className="search-mob">
                                <img className="searchLogo-mob" src={hostedLogo} alt="O" />
                                <h4 className="searchText">Hosted Rides</h4>
                            </NavLink> : <></>}

                        {isTrackingOn ? <NavLink to={"/track"} className="pub_ride-mob" id="pub_ride">Tracking</NavLink> : <></>}
                        {user ? <NavLink to={"/publish"} className="pub_ride-mob" id="pub_ride">Publish a ride</NavLink> : <NavLink to={"/user-details"} className="pub_ride-mob">Publish a ride</NavLink>}
                    </div>
                <div onClick={showMobileMenuHandler} className="mobileMenu">
                    {mobileMenuLogo}
                </div>
            </div>


            {showAlert ? <Alert text={alertText} onShowAlert={setOnShowAlert} /> : <></>}
        </>
    )
}

export default TopBar;