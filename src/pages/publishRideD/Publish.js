import './Publish.css';
import bgImg from './img/bg3.jpeg';
import { useEffect, useState } from 'react';
import { ethers, Signer } from 'ethers';
import Carpool from '../../artifacts/contracts/Carpool.sol/Carpool.json';
import Alert from '../../components/alert/Alert';
import LocationPicker from './draggable-markers/LocationPicker.tsx';

import { debounce } from "lodash";
import ContractAdress from '../../components/ContractAdress';



const carpoolAddress = ContractAdress();

function Publish() {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState();
    const [seats, setSeats] = useState();
    const [alertText, setAlertText] = useState('Welcome');
    const [showAlert, setShowAlert] = useState(false);
    const [depAddress, setDepAddress] = useState("");
    const [depCity, setDepCity] = useState("");
    const [desAddress, setDesAddress] = useState("");
    const [desCity, setDesCity] = useState("");
    const [depDate, setDate] = useState("");
    const [depTime, setDepTime] = useState('');
    const [fare, setFare] = useState();
    const [vNumber, setVNumber] = useState();
    const [vName, setVName] = useState('');

    let depLng = null;
    let depLat = null;

    let desLng = null;
    let desLat = null;



    useEffect(() => {
        async function onLoadFetch() {
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await requestAccount();
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(carpoolAddress, Carpool.abi, signer);
                const isUserRegistered = await contract.isUserRegistered(accounts[0]);

                if (isUserRegistered) {
                    const fName = await contract.getFirstName(accounts[0]);
                    const lName = await contract.getLastName(accounts[0]);
                    const phoneTemp = await contract.getPhone(accounts[0]);
                    setName(fName + " " + lName);
                    setPhone(phoneTemp);
                };
            }
        };
        onLoadFetch();
    },[]);



    async function getAdress(lang, lati) {


        try {
            lang = lang.toString();
            lati = lati.toString();
            let response = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + lang + "," + lati + '.json?access_token=pk.eyJ1Ijoicm9oaXRzaGlndmFuIiwiYSI6ImNsZmZiZXFxZTQydGwzb3IwbXlvOHZmczcifQ.mHHvAjNZZZExdK7Y-4hdkg');
            let responseJson = await response.json();

            return responseJson.features;

        } catch (err) {
            console.log(err);
        }
    }

    function setOnShowAlert(alertStatus) {
        setShowAlert(alertStatus);
    }

    async function publishRideMain() {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(carpoolAddress, Carpool.abi, signer);
            try {
                let depDesCity = depCity + '-' + desCity;
                let finalKey = depDesCity + depDate;
                await contract.publishRide(
                    accounts[0], depAddress, desAddress, depCity, desCity, seats, depTime, fare, name, phone, finalKey, vName, vNumber,
                    depDate
                );

                setOnShowAlert(true);
                setAlertText('Sucessfully Published Ride from ' + depAddress + ' to ' + desAddress);
                
            } catch (err) {
                setOnShowAlert(true);
                setAlertText(err);
            }
        }
    }

    async function requestAccount() {
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    const [page, setPage] = useState(0);


    function page0() {
        setPage(0);
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



    const handleGetDepAdress = debounce(() => {
        (async () => {
            let gotAddress = await getAdress(depLng, depLat);
            console.log(gotAddress);
            for (let i of gotAddress) {
                
                if (i['place_type'] == 'district' || i['place_type'] == 'place') {
                    console.log(i['text']);    
                    setDepCity(i['text']);

                }
            }
            setDepAddress(gotAddress[0]['place_name']);

        })()

    }, 500)

    const handleGetDesAdress = debounce(() => {
        (async () => {
            let gotAddress = await getAdress(desLng, desLat);
            console.log(gotAddress);
            for (let i of gotAddress) {
                if (i['place_type'] == 'district' || i['place_type'] == 'place') {
                    setDesCity(i['text']);

                }
            }
            setDesAddress(gotAddress[0]['place_name']);

        })()

    }, 500)


    function getDepLngLat(Lng, Lat) {
        depLng = Lng;
        depLat = Lat;
        handleGetDepAdress();
    }

    function getDesLngLat(Lng, Lat) {
        desLng = Lng;
        desLat = Lat;
        handleGetDesAdress();
    }

    return (
        <>

            <div className="main">

                <div className="left">
                    <h1 className='pub-title'>
                        Publish your journey online and save on travel costs by sharing your ride with passengers.
                    </h1>

                    {page === 0 ? <div>
                        <h5 className='pub-inp_text'>Name</h5>
                        <input className='pub-input' onChange={e => { setName(e.target.value) }} value={name} />
                        <h5 className='pub-inp_text'>Phone Number</h5>
                        <input type='number' className='pub-input' onChange={e => { setPhone(e.target.value) }} value={phone} />
                        <h5 className='pub-inp_text'>Available Seats</h5>
                        <input type='number' className='pub-input' onChange={e => { setSeats(e.target.value) }} value={seats} />
                        <input type="button" onClick={page1} className='pub-button' value='Next ->' />
                    </div> : <></>}

                    {page === 1 ? <div>
                        <h5 className='pub-inp_text'>Departure Location</h5>
                        <input className='pub-input' onChange={e => { setDepAddress(e.target.value) }} value={depAddress} />
                        <h5 className='pub-inp_text'>Departure City</h5>
                        <input className='pub-input' onChange={e => { setDepCity(e.target.value) }} value={depCity} />
                        <h5 className='pub-inp_text'>Departure Date</h5>
                        <input type='date' className='pub-input' onChange={e => { setDate(e.target.value) }} value={depDate} />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <input type="button" onClick={page0} className='pub-button' value='< Back' />
                            <input type="button" onClick={page2} className='pub-button' value='Next ->' />
                        </div>
                    </div> : <></>}

                    {page === 2 ? <div>
                        <h5 className='pub-inp_text'>Destination Location</h5>
                        <input className='pub-input' onChange={e => { setDesAddress(e.target.value) }} value={desAddress} />
                        <h5 className='pub-inp_text'>Destination City</h5>
                        <input className='pub-input' onChange={e => { setDesCity(e.target.value) }} value={desCity} />
                        <h5 className='pub-inp_text'>Fare</h5>
                        <input type='number' className='pub-input' onChange={e => { setFare(e.target.value) }} value={fare} />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <input type="button" onClick={page1} className='pub-button' value='< Back' />
                            <input type="button" onClick={page3} className='pub-button' value='Next ->' />
                        </div>
                    </div> : <></>}

                    {page === 3 ? <div>
                        <h5 className='pub-inp_text'>Departure Time</h5>
                        <input className='pub-input' onChange={e => { setDepTime(e.target.value) }} value={depTime} />
                        <h5 className='pub-inp_text'>Vehicle Number</h5>
                        <input className='pub-input' onChange={e => { setVNumber(e.target.value) }} value={vNumber} />
                        <h5 className='pub-inp_text'>Vehicle Name</h5>
                        <input className='pub-input' onChange={e => { setVName(e.target.value) }} value={vName} />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <input type="button" onClick={page2} className='pub-button' value='< Back' />
                            <input type="button" onClick={publishRideMain} className='pub-button' value='Publish' />
                        </div>
                    </div> : <></>}




                </div>

                {page === 0 ?
                    <div className="right">
                        <img src={bgImg} width='100%' height='auto' alt='background'></img>
                    </div>
                    : <></>
                }
                {page === 1 ?
                    <div className="right">
                        <LocationPicker onLocationPicked={getDepLngLat} />
                    </div>
                    :
                    <></>
                }

                {page === 2 ?
                    <div className="right">
                        <LocationPicker onLocationPicked={getDesLngLat} />
                    </div>
                    :
                    <></>
                }
                {page === 3 ?
                    <div className="right">
                        <img src={bgImg} width='100%' height='auto' alt='background'></img>
                    </div>
                    :
                    <></>
                }


            </div>
            {showAlert ? <Alert text={alertText} onShowAlert={setOnShowAlert} /> : <></>}
        </>
    );
}

export default Publish;