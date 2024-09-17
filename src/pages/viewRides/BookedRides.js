import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import { ethers, Signer } from 'ethers';
import Carpool from '../../artifacts/contracts/Carpool.sol/Carpool.json';
import ContractAdress from "../../components/ContractAdress";
import RideCard from "../../components/resultSection/RideCard";
import './View.css';
import { NavLink } from "react-router-dom";

function BookedRides() {
    const carpoolAddress = ContractAdress();
    const [bookedRides, setBookedRides] = useState();
    const [isValidList, setIsValidList] = useState(false);
    const [totalBookedRides, setTotalBookedRides] = useState(0);
    async function requestAccount() {
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    useEffect(async () => {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await requestAccount();

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(carpoolAddress, Carpool.abi, signer);
            const _bookedRides = await contract.getBookedRides(accounts[0]);

            if(_bookedRides[0]){
                setBookedRides(_bookedRides);
                setTotalBookedRides(_bookedRides.length);
                setIsValidList(true);
            }else{
                setIsValidList(false);
            }

            console.log(bookedRides);

        }
    },[]);

    return (
        <div className="view_rides">
            <h3> Booked rides: {totalBookedRides}</h3>
            <div className="rides_section">
            <div className="view_wrapper">
                {isValidList ? bookedRides.map(ride => 
                <div className="card_wrapper">
                <h4 className="view_date">Date: {ride[13]}</h4>
                <RideCard
                    ridesList={ride}
                    useFor = 'view'
                /></div>)
                    :
                    <div className="rides-noRides">
                        Sorry No Rides Found ! <br /> You have not yet booked any Rides. 
                        <br/> <NavLink to={'/search'}><h4>Click here to search a ride</h4></NavLink>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default BookedRides;