import { useState } from 'react';
import './UserOptions.css';

function UserOptions(props) {

    const logoutHandler = props.logout;
    const [isTrackingOn, setIsTrackingOn] = useState(props.isTrackOnDef);
    console.log(props.isTrackOnDef + 'asdad');

    function trackingCheckBoxHandler(){
        setIsTrackingOn(!isTrackingOn);
    }

    props.isTrackOn(isTrackingOn);


    return (
        <div>
            <div className="user_options" id='user_options'>
                <div className='user_pub_key_wrapper' id='user_pub_key_wrapper'>
                    <h5 className='options_text' id='pub_key_text'>Public Key</h5>
                    <div className='user_pub_key_overlay' id='user_pub_key_overlay'></div>
                    <h5 className='options_sub_text'>{props.userPubKey}</h5>
                </div>
                <div className='line'></div>
                <h5 className='options_text' id='account_bal_text'>Account balance</h5>
                <h5 className='options_sub_text'>{Math.round(props.userBalance * 100000)/100000 } ETH </h5>
                <div className='line'></div>
                {props.isTrackingEnabled?
                <div className='user_pub_key_wrapper' id='user_pub_key_wrapper'>
                <h5 className='options_text' id='is_tracking'>Tracking user</h5>
                <h5 className='options_sub_text'>{props.trackingUserName}</h5>
                    <div className='user_pub_key_overlay' id='user_pub_key_overlay'></div>
                    <h5 className='options_sub_text'>{props.trackingUserKey}</h5>
                    <label style={{marginTop:'15px'}} className="toggle">
                    <h5 className='options_sub_text'>Enable Tracking</h5>
                        <input className="toggle-checkbox" type="checkbox" checked={isTrackingOn} 
                        onChange={trackingCheckBoxHandler}/>
                            <div className="toggle-switch"></div>
                    </label>
                    <div className='line'></div>    
                </div>
                
                :<></>}
                
                <button onClick={logoutHandler} className="sign_out">
                    Sign Out
                </button>
            </div>
        </div>
    );
}

export default UserOptions;