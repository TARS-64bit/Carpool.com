import RideCard from "./RideCard";
import './Rides.css';
import Alert from "../alert/Alert";
import { ethers, Signer } from 'ethers';
import Carpool from '../../artifacts/contracts/Carpool.sol/Carpool.json';
import ContractAdress from "../ContractAdress";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";

const carpoolAddress = ContractAdress();


function Rides(props){

    const [showAlert, setShowAlert] = useState(false);
    let gotRidesList;
    let depDesCity = props.depCity + '-' + props.desCity;
    let finalKey = depDesCity + props.depDate;
    const [ridesList, setRidesList] = useState({});
    const [isValidList, setIsValidList] = useState(false);


    function setOnShowAlert(alertStatus){
        setShowAlert(alertStatus);
    }

    console.log(finalKey);
    useEffect(
        ()=>{

            if(finalKey != ''){
                async function searchRides(){
                    if (typeof window.ethereum !== 'undefined') {
                        const accounts = await requestAccount();
                        const provider = new ethers.providers.Web3Provider(window.ethereum);
                        const signer = provider.getSigner();
                        const contract = new ethers.Contract(carpoolAddress, Carpool.abi, signer);
            
                        try{
                            
                            console.log((await contract.getPhone(accounts[0])).toString());
                            gotRidesList =[...await contract.searchRide(finalKey)];
                            if(gotRidesList[0]){

                                setRidesList(gotRidesList);
                                
                                setIsValidList(true);
                                console.log(gotRidesList);
                            }else{
                                setIsValidList(false);
                                console.log(gotRidesList);
                            }

            
                        }catch(err){
                            
                            console.log(err);
                        }
                    }
                }
                searchRides();
            }

            

        },[props.depCity, props.desCity, props.depDate])
    
    

    async function requestAccount() {
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    return(
        <div className="rides_section">

            {isValidList? ridesList.map(ride => <RideCard 
            ridesList = {ride}
            useFor = 'search' 
            />)
            :
            <div className="rides-noRides">
                Sorry No Rides Found ! <br/> Make sure you entered the address correctly.
            </div>}
            
        </div>
    );
}

export default Rides;