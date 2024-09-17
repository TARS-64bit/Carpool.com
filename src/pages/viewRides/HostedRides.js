import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import { ethers, Signer } from 'ethers';
import Carpool from '../../artifacts/contracts/Carpool.sol/Carpool.json';
import ContractAdress from "../../components/ContractAdress";
import RideCard from "../../components/resultSection/RideCard";
import './View.css';
import { NavLink } from "react-router-dom";

function HostedRides() {
    const carpoolAddress = ContractAdress();
    const [userPubKey, setUserPubKey] = useState();
    const [hostedRides, setHostedRides] = useState(0);
    const [isValidList, setIsValidList] = useState(false);
    const [totalHostedRides, setTotalHostedRides] = useState(0);
    async function requestAccount() {
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    useEffect(async () => {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await requestAccount();


            setUserPubKey(accounts[0]);

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(carpoolAddress, Carpool.abi, signer);
            const _hostedRides = await contract.getHostedRides(accounts[0]);

            if(_hostedRides[0]){
                setHostedRides(_hostedRides);
                setTotalHostedRides(_hostedRides.length);
                setIsValidList(true);
            }else{
                setIsValidList(false);
            }

        }
    },[]);

    return (
        <div className="view_rides">
            <h3> Published rides: {totalHostedRides}</h3>
            <div className="rides_section">
                <div className="view_wrapper">
                {isValidList ? hostedRides.map(ride => 
                <div className="card_wrapper">
                <h4 className="view_date">Date: {ride[13]}</h4>
                <RideCard
                    ridesList={ride}
                    useFor = 'scan'
                /></div>)
                    :
                    <div className="rides-noRides">
                        You have not published any Rides. <br /> <NavLink to={'/publish'}><h6>Publish your first Ride</h6></NavLink>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default HostedRides;