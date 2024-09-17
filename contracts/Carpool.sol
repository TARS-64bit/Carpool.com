// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.9;


//Uncomment this line to use console.log
import "hardhat/console.sol";

contract Carpool {
    struct User{
        uint256 pubKey;
        uint64 phone;
        string fname;
        string lname;
        uint8 isReg;
        bool isTrackingEnabled;
        uint256 tracker;
        bool isTrackingUser;
        uint256 tracking;
        bool isHost;
        uint256[] hostedRides;
        bool bookedRide;
        uint256[] bookedRides;
    }

    struct Ride{
        uint256 id;
        uint256 rideHost;
        string depAddress;
        string desAddress;
        string depCity;
        string desCity;
        uint8 numberOfSeats;
        string depTime;
        uint32 fare;
        string rideHostName;
        uint64 rideHostPhone;
        string hostVehicleName;
        string hostVehicleNumber;
        string date;
        uint256[] passengers;
    }

    mapping (uint256 => User)public Users;
    mapping (uint256 => Ride)public Rides;
    mapping (string => uint256[]) SearchRideList;
    uint256 private idG;
    


    function isUserRegistered(uint256 _pubKey) public view returns(bool){
        if(Users[_pubKey].isReg != 1){
            return false;
        }
        else{
            return true;
        }
    }

    function getFirstName(uint256 _pubKey) public view returns(string memory){
        return Users[_pubKey].fname;
    }

    function getLastName(uint256 _pubKey) public view returns(string memory){
        return Users[_pubKey].lname;
    }

    function getPhone(uint256 _pubKey) public view returns(uint64){
        return Users[_pubKey].phone;
    }

    function register(uint256 _pubKey, string memory _fName, string memory _lname, uint64 _phone, 
    bool _isTrackingEnabled, uint256 _tracker) public{
        uint256[] memory _hostedRides = new uint256[](0);
        uint256[] memory _bookedRides = new uint256[](0);
        Users[_pubKey] = User(_pubKey, _phone, _fName, _lname, 1, 
        _isTrackingEnabled, 0, false, 0, false, _hostedRides, false, _bookedRides);

        if(_isTrackingEnabled){
            Users[_pubKey].tracker = _tracker;
            Users[_tracker].isTrackingUser = true;
            Users[_tracker].tracking = _pubKey;
        }
    }

    function getIsTrackingUser(uint256 _pubKey) public view returns(bool){
        bool _isTrackingUser = false;
        if(Users[_pubKey].isTrackingUser == true){
            _isTrackingUser = true;
        }
        return _isTrackingUser;
    }

    function getIsTrackingEnabled(uint256 _pubKey) public view returns(bool){
        bool _isTrackingEnabled = false;
        if(Users[_pubKey].isTrackingEnabled == true){
            _isTrackingEnabled = true;
        }
        return _isTrackingEnabled;
    }

    function getTracker(uint256 _pubKey) public view returns(string memory, string memory, uint256){
        uint256 _tracker = Users[_pubKey].tracker;
        return (Users[_tracker].fname, Users[_tracker].lname, _tracker);
    }

    function getTracking(uint256 _pubKey) public view returns(string memory, string memory, uint256){
        uint256 _tracking = Users[_pubKey].tracking;
        return (Users[_tracking].fname, Users[_tracking].lname, _tracking);
    }


    function publishRide(
        //These are parameters
        uint256 _rideHost, 
        string memory _depAddress,
        string memory _desAddress,
        string memory _depCity,
        string memory _desCity,
        uint8 _numberOfSeats,
        string memory _depTime,
        uint32 _fare,
        string memory _rideHostName,
        uint64 _rideHostPhone, 
        string memory _depDesCity,
        string memory _hostVehicleName,
        string memory _hostVehicleNumber,
        string memory _date
        ) public
        {   
            idG++;
            uint256[] memory _passengers = new uint256[](0);
            SearchRideList[_depDesCity].push(idG);
            Users[_rideHost].isHost = true;
            Users[_rideHost].hostedRides.push(idG);
            Rides[idG] = Ride(idG, _rideHost, _depAddress, _desAddress, _depCity, _desCity, _numberOfSeats, _depTime, _fare,
            _rideHostName, _rideHostPhone, _hostVehicleName, _hostVehicleNumber, _date, _passengers);

        }


    function searchRide(string memory _depDesCity) public view returns(Ride[] memory){
        uint256 rideLength = SearchRideList[_depDesCity].length;
        Ride[] memory _rides = new Ride[](rideLength);

        for(uint i = 0; i < rideLength; i++){
            _rides[i] = Rides[SearchRideList[_depDesCity][i]];
        }

        return _rides;
    }

    function bookRide(uint256 _pubKey, uint256 _id) public {
        if(Rides[_id].numberOfSeats > 0){
            Rides[_id].passengers.push(_pubKey);
            Rides[_id].numberOfSeats--;
            Users[_pubKey].bookedRide = true;
            Users[_pubKey].bookedRides.push(_id);
        }
    }

    function getPass(uint256 _id) public view returns(uint256[] memory) {
        return Rides[_id].passengers;
    }

    function getBookedRides(uint256 _pubKey) public view returns(Ride[] memory) {
        uint256 rideLength = Users[_pubKey].bookedRides.length;
        Ride[] memory _rides = new Ride[](rideLength);

        for(uint i = 0; i < rideLength; i++){
            _rides[i] = Rides[Users[_pubKey].bookedRides[i]];
        }

        return _rides;
    }

    function getHostedRides(uint256 _pubKey) public view returns(Ride[] memory) {
        uint256 rideLength = Users[_pubKey].hostedRides.length;
        Ride[] memory _rides = new Ride[](rideLength);

        for(uint i = 0; i < rideLength; i++){
            _rides[i] = Rides[Users[_pubKey].hostedRides[i]];
        }

        return _rides;
    }

    function getIsHost(uint256 _pubKey) public view returns(bool) {
        return Users[_pubKey].isHost;
    }

    function getIsPassenger(uint256 _pubKey) public view returns(bool) {
        return Users[_pubKey].bookedRide;
    }

}
