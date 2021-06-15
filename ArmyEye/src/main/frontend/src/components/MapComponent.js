import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


class MapComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            army:[],
            viewport:{
                latitude: 37.41037,
                longitude: -122.05937,
                width: "81vw",
                height: "67vh",
                zoom: 6
            },
            mounted: false,
            message:"",
            lastMessage: "",
            messageCO:"",
            lastMessageCO: ""
        }

        this.loadData = this.loadData.bind(this);
        this.loadMessages = this.loadMessages.bind(this);
        this.loadMessagesCO = this.loadMessagesCO.bind(this);
    }

    componentDidMount(){
        this.loadData();
        this.loadMessages();
        this.loadMessagesCO();
        setInterval(this.loadData, 1000);
        setInterval(this.loadMessages, 1000);
        setInterval(this.loadMessagesCO, 1000);
        this.setState({ mounted: true })

    }

    async loadData() {
        try {
            axios.get("http://192.168.160.87:21001/map").then(response => {
                this.setState({ army: response.data })
            });
        } catch (e) {
            console.log(e);
        }
    }

    async loadMessages() {
        try {
            axios.get("http://192.168.160.87:21001/msg").then(response => {
                this.setState({ message: response.data })
            });
        } catch (e) {
            console.log(e);
        }
        if (this.state.lastMessage !== this.state.message && this.state.message !== ""){
            NotificationManager.info('',this.state.message ,4000);
            this.state.lastMessage = this.state.message;
        }
    }

    async loadMessagesCO() {
        try {
            axios.get("http://192.168.160.87:21001/msgCO").then(response => {
                this.setState({ messageCO: response.data })
            });
        } catch (e) {
            console.log(e);
        }
        if (this.state.lastMessageCO !== this.state.messageCO && this.state.messageCO !== ""){
            NotificationManager.error('',this.state.messageCO ,4000);
            this.state.lastMessageCO = this.state.messageCO;
        }
    }

    render(){
        const { mounted } = this.state
        return(
            <div >
                <NotificationContainer/>

                {/*<p>{this.state.army.latitude}</p>*/}

                <ReactMapGL {...this.state.viewport}
                            onViewportChange={(viewport) => {
                                if (mounted) { this.setState({ viewport }) }
                            }}
                            mapboxApiAccessToken="pk.eyJ1Ijoicml0YS1hbWFudGU5OTU1IiwiYSI6ImNrbmEyZGpzYzBqcjcybm55Z2NyOTVkazMifQ.oRw17OIsKSA0CeIUG2UC1Q">

                    {this.state.army.map( arm => (
                            <Marker key={arm.latitude} latitude={Number(arm.latitude)} longitude={Number(arm.longitude)}>
                                <img  width="20" height="20" src="../soldado.jpg" alt="Army Icon" />
                            </Marker>
                        )
                    )}
                </ReactMapGL>
            </div>
        );
    }
}

export default MapComponent