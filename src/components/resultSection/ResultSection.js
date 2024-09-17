import FilterSearch from "./FilterSearch";
import Rides from "./Rides";
import "./ResultSection.css"

function ResultSection(props){

    return(
        <div className="result_section">
            <FilterSearch/>
            <Rides depCity = {props.dep} desCity = {props.des} depDate = {props.depD}/>
        </div>
    );
}

export default ResultSection;