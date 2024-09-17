import { useState } from "react";
import "./SortOption.css";


function SortOption(props) {




    const [isActive, setIsActive] = useState(props.isActive);
    const [bgColor, setBgColor] = useState("#ddd");
    const [color, setColor] = useState("#333");
    
    

    const sortOptionStyle = {
        backgroundColor: isActive ? `${bgColor}` : "#d3962c", color: isActive ? `${color}` : "#fff",
        
    };



    

    return (
        <div>
            <li className="sort_option" style={sortOptionStyle}
                onMouseEnter={() =>{setBgColor("#ffa70f"); setColor("#fff")}} onMouseLeave={() => {setBgColor("#ddd"); setColor("#333")}}
                onMouseDown={() => {
                    if(props.isActive === true){
                        props.getData(props.isActive, props.id);
                        setIsActive(isActive);
                        
                    }else{
                        setIsActive(true);
                        
                    }
                    
                    
                }}
            >{props.title}<input className="sort_radio" type="radio" name="sort_radio"></input></li>
        </div>
    );
}

export default SortOption;