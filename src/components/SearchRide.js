import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchRide.css";
const today = new Date();
const numberOfDaysToAdd = 3;
const date = today.setDate(today.getDate() + numberOfDaysToAdd);

function SearchRide(props){
    const defaultValue = new Date(date).toISOString().split('T')[0];
    const [departureCity, setDepCity] = useState('');
    const [destinationCity, setDesCity] = useState('');
    const [depDate, setDepDate] = useState('');
    let nav = useNavigate();

    function searchHandler(){
        if(props.onGetDepDes){
            props.onGetDepDes(departureCity, destinationCity, depDate);
        }else{
            nav('/search');
        }
        
    }
    return (
        <div className="search_ride">
            <div className="search_inp">
                <div className="ring">O</div>
                <input type="text" placeholder="Mumbai" onChange={e=>{setDepCity(e.target.value)}} value={departureCity} className="search_inp_txt"/>
            </div>
            <div className="search_inp">
                <div className="ring">O</div>
                <input type="text" placeholder="Pune" onChange={e=>{setDesCity(e.target.value)}} value={destinationCity} className="search_inp_txt"/>
            </div>
            <div>
                <input type="date" defaultValue={defaultValue} onChange={e=>{setDepDate(e.target.value)}} value={depDate} className="search_date" />
            </div>
            
            <button onClick={searchHandler} className="search_button">Search</button>
            
        </div>
    )
}

export default SearchRide;