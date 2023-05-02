function UserTracking(props){

    

    if(props.isEnabled == true){
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(function(position) {
              console.log("Latitude is :", position.coords.latitude);
              console.log("Longitude is :", position.coords.longitude);
            });
          }
    }
    
    return(
        <>
        </>
    );
}

export default UserTracking;