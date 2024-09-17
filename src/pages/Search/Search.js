import SearchRide from "../../components/SearchRide";
import ResultSection from "../../components/resultSection/ResultSection";
import { useState } from "react";

function Search() {

    const [depCity, setDepCity] = useState('');
    const [desCity, setDesCity] = useState('');
    const [depDate, setDepDate] = useState('');
    function getDepDesCity(depC, desC, depD){
        setDepCity(depC);
        setDesCity(desC);
        setDepDate(depD);
    }

    return (
        <>
            <SearchRide onGetDepDes = {getDepDesCity}/>
            <ResultSection dep = {depCity} des = {desCity} depD = {depDate}/>
        </>
    );
}

export default Search;