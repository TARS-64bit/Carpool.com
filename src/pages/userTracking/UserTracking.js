import { useState, useEffect, useRef } from "react";
import Carpool from '../../artifacts/contracts/Carpool.sol/Carpool.json';
import ContractAdress from "../../components/ContractAdress";
import { ethers, Signer } from 'ethers';
import StartFirebase from '../../firebase-config';
import { get, set, ref, child, DataSnapshot } from "firebase/database";
import Map, { Marker, NavigationControl } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import './UserTracking.css';
import Alert from "../../components/alert/Alert";

const TOKEN = 'pk.eyJ1Ijoicm9oaXRzaGlndmFuIiwiYSI6ImNsZmZiZXFxZTQydGwzb3IwbXlvOHZmczcifQ.mHHvAjNZZZExdK7Y-4hdkg'; // Set your mapbox token here



function UserTracking(props) {

  mapboxgl.accessToken = TOKEN;

  const [userPubKey, setUserPubKey] = useState();
  const [isTrackingUser, setIsTrackingUser] = useState();
  const [message, setMessage] = useState();
  const [lat, setLat] = useState(18.645459619640917);
  const [lng, setLng] = useState(73.75920764695343);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const carpoolAddress = ContractAdress();
  const db = StartFirebase();
  const MINUTE_MS = 5000;
  let shownAlert = false;

  function setOnShowAlert(alertStatus) {
    setShowAlert(alertStatus);
  }

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(12);

  async function requestAccount() {
    return await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  let trackingUser;

  const initialViewState = {
    latitude: lat,
    longitude: lng,
    zoom: 12
  };

  useEffect(async () => {
    let _userPubKey;
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await requestAccount();
      _userPubKey = accounts[0];

      setUserPubKey(accounts[0]);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(carpoolAddress, Carpool.abi, signer);
      trackingUser = await contract.getTracking(accounts[0]);
      setIsTrackingUser(await contract.getIsTrackingUser(accounts[0]));
      setMessage(await contract.getFirstName(trackingUser[2]));


    }

    if (!mapContainer.current) return;
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    // Set marker options.
    const marker = new mapboxgl.Marker({
      color: "#000",

    }).setLngLat([lng, lat])
      .addTo(map.current);



    const interval = setInterval(() => {


      const dbref = ref(db);

      get(child(dbref, 'trackers/' + trackingUser[2].toHexString() + '/co-ordinates')).then((snapshot) => {
        if (snapshot.exists()) {
          let value = snapshot.toJSON();
          setLat(value.latitude);
          setLng(value.longitude);
          map.current.flyTo({ center: [parseFloat(value.longitude), parseFloat(value.latitude)] });
          marker.setLngLat([parseFloat(value.longitude), parseFloat(value.latitude)]);
        } else {
          if (shownAlert == false) {
            shownAlert = true;
            setShowAlert(true);
            setAlertText('The User is currently ofline.');
          }

        }
      });

    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);





  return (
    <>
      {isTrackingUser ?
        <>
          <div className="tracking_details_wrapper">
            <h4 style={{marginBottom:'0px'}} >Tracking User Details</h4>
            <div className="tracking_details">
              <h5>User: {message}</h5>


              <h5>Lat : {Math.round((lat + Number.EPSILON) * 10000) / 10000}</h5>
              <h5>Lng : {Math.round((lng + Number.EPSILON) * 10000) / 10000}</h5>
            </div>
          </div>
          <div ref={mapContainer} className="map-container" />
        </>

        :
        <><h1> You are not tracking any user</h1></>}
      {showAlert ? <Alert text={alertText} onShowAlert={setOnShowAlert} /> : <></>}
    </>
  );
}

export default UserTracking;