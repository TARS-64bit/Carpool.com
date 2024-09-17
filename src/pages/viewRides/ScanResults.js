import { ethers, Signer } from 'ethers';
import Carpool from '../../artifacts/contracts/Carpool.sol/Carpool.json';
import ContractAdress from "../../components/ContractAdress";
import { useEffect, useState } from "react";
import Alert from "../../components/alert/Alert";
import { useLocation } from 'react-router-dom';
import verifiedImg from '../../components/images/verified.png';

const carpoolAddress = ContractAdress();


function ScanResults() {
    const location = useLocation();
    const resultList = location.state;
    const [passengerDetails, setPassengerDetails] = useState();


    async function requestAccount() {
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    useEffect(async () => {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(carpoolAddress, Carpool.abi, signer);

            setPassengerDetails(await contract.Users(resultList.passPubKey));
        }
    }, []);

    return (
        <div className='scan_results'>
            <div className='verified_title'>
                <img src={verifiedImg} style={{ width: '30px' }} />
                <h2 className='scan_result_verified'>Passenger verified</h2>
            </div>

            <h3>Details:</h3>
            {passengerDetails?
                <div className='scan_result_details'>
                    <h4 className='scan_result_title'>Name</h4> <h4>{passengerDetails[2] + ' ' + passengerDetails[3]}</h4>
                    <h4 className='scan_result_title'>Phone Number</h4> <h4>{parseInt(passengerDetails[1])}</h4>
                    <h4 className='scan_result_title'>Public Key</h4> <h4 className='scan_results_pubKey'>{resultList.passPubKey}</h4>
                </div>
                :
                <></>
            }
        </div>
    );
}

export default ScanResults;