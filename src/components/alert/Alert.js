import { useEffect, useState } from 'react';
import './Alert.css';

function Alert(props){


    function hideAlert(){
        props.onShowAlert(false);
    }
    return(
        <div className="alert-box">
            <h5 className='alert-text'>{props.text}</h5>
            <input type='button' onClick={hideAlert} className='alert-button' value='OK'/>
        </div>
    )
}

export default Alert;