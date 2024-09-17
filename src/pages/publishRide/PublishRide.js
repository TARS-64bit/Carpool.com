import React, { useState } from "react";
import StartFirebase from '../../firebase-config';
import { set, ref, get, update, remove, child } from "firebase/database";
import TopBar from "../../components/topBar/TopBar";
import { auth } from '../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import LocationPicker from './draggable-markers/LocationPicker.tsx';


import './Publish.css';



export class PublishRide extends React.Component {

    

    constructor(props) {
        onAuthStateChanged(auth, (currentUser) => {
            this.setState({ user_email: currentUser?.email });
            this.setState({ uid: currentUser?.uid });
            this.getData();
        });

        let Lat = 0;
        let Lng = 0;
        super(props);
        this.state = {
            db: '',
            uid: '',
            user_email: '',
            user_name: '',
            phone_number: '',
            departure: '',
            des_lng: '',
            des_lat: '',
            destination: '',
            fare: '',
        }
        this.interface = this.interface.bind(this);
        this.getLngLat = this.getLngLat.bind(this);
    }

    componentDidMount() {
        this.setState({
            db: StartFirebase()
        });
    }

    getLngLat(Lng, Lat){
        this.setState({
            des_lng:Lng,
            des_lat:Lat
        })
    }



    render() {
        return (
            <>
                <TopBar />
                <div className="body_container">
                    <LocationPicker className="location_picker" onLocationPicked = {this.getLngLat}/>
                    
                    <div className="publish_ride">
                        <h5 className="label">User Name</h5>
                        <input type="text" defaultValue="Rohit" className="text_inp" id="user_name" value={this.state.user_name}
                            onChange={e => { this.setState({ user_name: e.target.value }) }}
                        />

                        <h5 className="label">Phone Number</h5>
                        <input type="number" defaultValue="9511896734" className="text_inp" id="phone_number" value={this.state.phone_number}
                            onChange={e => { this.setState({ phone_number: e.target.value }) }}
                        />

                        <h5 className="label">Set departure location</h5>
                        <input type="text" defaultValue="Pune" className="text_inp" id="departure" value={this.state.departure}
                            onChange={e => { this.setState({ departure: e.target.value }) }}
                        />

                        <h5 className="label">Destination</h5>
                        <input type="text" defaultValue="Mumbai" className="text_inp" id="destination" value={this.state.destination}
                            onChange={e => { this.setState({ destination: e.target.value }) }}
                        />

                        <h5 className="label">Fare</h5>
                        <input type="number" defaultValue="210" className="text_inp" id="fare" value={this.state.fare}
                            onChange={e => { this.setState({ fare: e.target.value }) }}
                        />


                        <button id="addBtn" className="pub_btn" onClick={this.interface}>Publish Ride</button>

                    </div>
                </div>
            </>
        )
    }


    interface(event) {
        const id = event.target.id;
        if (id == 'addBtn') {
            this.insertData();
        } else if (id == 'showBtn') {
            this.getData();
        }
    }

    getAllInputs() {
        return {
            uid: this.state.uid,
            user: this.state.user_name,
            email: this.state.user_email,
            phone: this.state.phone_number,
            deptr: this.state.departure,
            desLng: this.state.des_lng,
            desLat: this.state.des_lat,
            destn: this.state.destination,
            fr: this.state.fare,
        }
    }

    insertData() {
        const db = this.state.db;
        const data = this.getAllInputs();
        
        set(ref(db, 'Rides/' + data.uid),
            {
                UserName: data.user,
                UserEmail: data.email,
                PhoneNumber: data.phone,
                Departure: data.deptr,
                DesLongitude: data.desLng,
                DesLatitude: data.desLat,
                Destination: data.destn,
                Fare: data.fr
            });
    }

    getData() {
        const dbref = ref(this.state.db);
        const uid = this.getAllInputs().uid;

        get(child(dbref, 'Rides/' + uid)).then((snapshot) => {
            if (snapshot.exists()) {
                this.setState({
                    user_name: snapshot.val().UserName,
                    phone_number: snapshot.val().PhoneNumber,
                    departure: snapshot.val().Departure,
                    destination: snapshot.val().Destination,
                    fare: snapshot.val().Fare,
                })
            }
        })
    }

    


}