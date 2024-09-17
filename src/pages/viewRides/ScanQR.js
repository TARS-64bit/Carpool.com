import { useLocation, useNavigate } from "react-router-dom";
import { ethers, Signer } from 'ethers';
import Carpool from '../../artifacts/contracts/Carpool.sol/Carpool.json';
import ContractAdress from "../../components/ContractAdress";


import { useEffect, useState } from "react";
import qrCodeImg from '../../components/images/qr-code.svg';
import Alert from "../../components/alert/Alert";

const carpoolAddress = ContractAdress();


function ScanQR() {
    const location = useLocation();
    let nav = useNavigate();
    let accounts;
    let value = '';
    let rideDetails = location.state;
    const [passengerList, setPassengerList] = useState();
    const [qrscan, setQrscan] = useState('No result');
    const [isScannerOn, setIsScannerOn] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("Welcome");

    function setOnShowAlert(alertStatus) {
        setShowAlert(alertStatus);
    }

    const handleScan = async (data) => {
        if (data) {
            setQrscan(data.text);
            console.log(data);
            const dataArr = data.text.split('-');
            if (passengerList.includes(dataArr[1])) {
                nav('/scan-res', {
                    state: {
                        result: true,
                        passPubKey: dataArr[1]
                    }
                });
            } else {
                console.log('asdasda');
                setOnShowAlert(true);
                setAlertText('No passenger found for your ride, please rescan the qr code or check the validity of the qr code.');
            }
        }
    }
    const handleError = err => {
        console.error(err);
    }

    const scanHandler = () => {
        setIsScannerOn(!isScannerOn);
    }

    async function requestAccount() {
        return await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    useEffect(async () => {
        if (typeof window.ethereum !== 'undefined') {
            accounts = await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(carpoolAddress, Carpool.abi, signer);
            const pass = await contract.getPass(rideDetails.id);
            let passTemp = [];
            pass.map((e) => {
                passTemp.push(e.toHexString());
            })
            setPassengerList(passTemp);
            console.log(passengerList);
            value = rideDetails.id.toString + '-' + accounts[0];
        }
    }, []);
    return (
        <>
            <div className="scan_qr">
                <div className="qr_container">

                    <h3 className="scanner_title">Scanner</h3>
                    <h6 className="scanner_text">Please allow camera permissions to scan qr code.</h6>

                    {isScannerOn ? <QrReader className="qr_reader"
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        facingMode={"environment"}
                    /> : <div className="qr_reader-offline" style={{
                        
                        backgroundImage: `url(${qrCodeImg})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }
                    }>
                    </div>}

                    <input type={'button'} onClick={scanHandler} className="scan_button" value={'Scan'} />

                </div>
            </div>
            {showAlert ? <Alert text={alertText} onShowAlert={setOnShowAlert} /> : <></>}
        </>
    );
}

export default ScanQR;