import "./RideCard.css";
import {useNavigate} from "react-router-dom";
import infoig from "../images/info_pic.png";
import { useEffect, useState } from "react";

function RideCard(props){

    let nav = useNavigate();
    
    const [ridesList, setRidesList] = useState(props.ridesList);
    console.log(props.ridesList);
    console.log(ridesList);
    
    let depDesCity = ridesList[4] + '-' + ridesList[5];
    let finalKey = depDesCity + ridesList[13];

    const routesHandler = ()=>{
        if(props.useFor == 'search'){
            gotoBookRide();
        }else if(props.useFor == 'view'){
            gotoViewQR();
        }else if(props.useFor == 'scan'){
            gotoScanQR();
        }
    }

    const gotoBookRide = ()=>{
        nav('/book-ride',{state: {
            id: ridesList[0],
            depAddress: ridesList[2],
            desAddress: ridesList[3],
            depCity : ridesList[4],
            desCity : ridesList[5],
            fare: ridesList[8],
            hostName: ridesList[9],
            depTime: ridesList[7],
            vehicleName: ridesList[11],
            vehicleColor: ridesList[12],
            finalKey: finalKey
        }
        });
    }

    const gotoViewQR = ()=>{
        nav('/view-qr',{state: {
            id: ridesList[0],
            depAddress: ridesList[2],
            desAddress: ridesList[3],
            depCity : ridesList[4],
            desCity : ridesList[5],
            fare: ridesList[8],
            hostName: ridesList[9],
            depTime: ridesList[7],
            vehicleName: ridesList[11],
            vehicleColor: ridesList[12],
            finalKey: finalKey
        }
        });
    }

    const gotoScanQR = ()=>{
        nav('/scan-qr',{state: {
            id: ridesList[0],
            depAddress: ridesList[2],
            desAddress: ridesList[3],
            depCity : ridesList[4],
            desCity : ridesList[5],
            fare: ridesList[8],
            hostName: ridesList[9],
            depTime: ridesList[7],
            vehicleName: ridesList[11],
            vehicleColor: ridesList[12],
            finalKey: finalKey
        }
        });
    }

    return(
        <div className="card" onClick={routesHandler}>
        <div className="ca-p-a">
            <div className="cap-1">
                <div className="cap-a">
                    <div className="dm">
                        <div className="d1">{ridesList[7]}</div>
                        <div className="d2">2h:10</div>
                    </div>
                    <div className="dm-g">
                    
                    </div>
                    <div>
                        <div className="dm-2">
                            {ridesList[4]}
                        </div>
                        <div className="card-address">
                            {ridesList[2]}
                        </div>
                    </div>
                </div>
                <div className="cap-b" >
                    <div className="dm">
                        <div className="d1">22:30</div>
                    </div>
                    <div className="dm-g">
                        
                    </div>
                    <div>
                        <div className="dm-2">
                            {ridesList[5]}
                        </div>
                        <div className="card-address">
                            {ridesList[3]}
                        </div>
                    </div>
                </div>
               
            </div>
            <div className="cap-2">
                <div>&#8377; </div> <div className="card-fare">{ridesList[8]}</div>

            </div>
        </div>
        <div className="ca-p-b">
            <div className="ic-11" >
                <div className="ic-1"><img className="profile_pic_2" src="/static/media/profile_pic.3851143cb81cf5063d4c.png" alt="Profile Pic"/></div>
                <div className="ic-2">{ridesList[9]}</div>
            </div>
            <div className="ic-3" style={{display:'flex', alignItems: 'center'}}>
                <div className="card-address">Avl. Seats {ridesList[6]}</div>
                <img className="info_pic" src={infoig} alt="info Pic"/>
            </div>
        </div>
    </div>
    );
}

export default RideCard;