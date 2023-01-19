import React from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {Marker} from 'react-native-amap3d/lib/src';
import requests from "react-native/Libraries/Settings/Settings";
import Feather from "react-native-vector-icons/Feather";

class RouteSelect extends React.Component {

    render() {
        const origin = this.props.origin;
        const destination = this.props.destination;
        return (
            <View>
                <Marker
                    draggable={false}
                    position={{
                        latitude: origin ? origin.latitude : 0,
                        longitude: origin ? origin.longitude : 0,
                    }}>
                </Marker>
                <Marker
                    draggable={false}
                    position={{
                        latitude: destination ? destination.latitude : 0,
                        longitude: destination ? destination.longitude : 0,
                    }}>
                </Marker>

            </View>
        );
    }
}
export default RouteSelect;
