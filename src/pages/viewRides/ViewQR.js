import QRCode from "react-qr-code";
import { useLocation } from "react-router-dom";
import { ethers, Signer } from 'ethers';
import Carpool from '../../artifacts/contracts/Carpool.sol/Carpool.json';
import ContractAdress from "../../components/ContractAdress";
import { useEffect, useState } from "react";

const carpoolAddress = ContractAdress();


function ViewQr() {

    const location = useLocation();
    let accounts;
    const[value, setValue] = useState('');
    let rideDetails = location.state;
    console.log(rideDetails[9]);
    async function requestAccount() {
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    useEffect(async () => {
        if (typeof window.ethereum !== 'undefined') {
            accounts = await requestAccount();
            setValue(parseInt(rideDetails.id._hex).toString() + '-' + accounts[0]);
        }
    }, []);

    return (
        <div className="view_qr">
            <div className="view_qr_wrapper">
                <div className="view_ride_details">
                    <p><b> Host: </b>{rideDetails.hostName}</p>
                    <p><b> From: </b>{rideDetails.depAddress}</p>
                    <p><b> To: </b>{rideDetails.desAddress}</p>
                    <p><b> Departure Time: </b>{rideDetails.depTime}</p>
                </div>
                <div className="qr_code">
                    <QRCode
                        size={256}
                        value={value}
                        viewBox={`0 0 256 256`}
                    />
                    <h5>Scan this qr code to verify passenger</h5>
                </div>
            </div>
        </div>
    )
}

export default ViewQr;