import "./SortResult.css";
import { useState } from "react";

function SortResult(){

    const [sort, setSort] = useState("none");
   


    const handelSort = (e)=>{
        setSort(e.target.id);
    }

    const [isActive, setIsActive] = useState(true);
    const [bgColor, setBgColor] = useState("#ddd");
    const [color, setColor] = useState("#333");
    
    

    

    
    return(
        <div className="sort_result">
            
            <h1 className="sort_title">Sort by</h1>
            <ul className="sort_option_list">
        
                
                <div>
                <li className="sort_option"  id ="ed"
                    onMouseDown={handelSort}
                >{"Earliest departure"}<input className="sort_radio" type="radio" checked = {sort === "ed"} name="sort_radio"></input></li>
                </div>

                <div>
                <li className="sort_option"  id ="lp"
                    onMouseDown={handelSort}
                    
                >{"Lowest price"}<input className="sort_radio" type="radio" checked = {sort === "lp"} name="sort_radio"></input></li>
                </div>

                <div>
                <li className="sort_option"  id ="cd"
                    onMouseDown={handelSort}
                    
                >{"Close to departure point"}<input className="sort_radio" type="radio" checked = {sort === "cd"} name="sort_radio"></input></li>
                </div>

                <div>
                <li className="sort_option"  id ="ca"
                    onMouseDown={handelSort}
                    
                >{"Close to arrival point"}<input className="sort_radio" type="radio" checked = {sort === "ca"} name="sort_radio"></input></li>
                </div>
            </ul>
            
        </div>
    );
}

export default SortResult;