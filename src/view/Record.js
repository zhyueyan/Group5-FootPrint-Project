/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Map from '../component/Map';
import Header from '../component/header';
class Record extends React.Component {
    render(){
        return (
        <View style={{backgroundColor: 'white', height: '100%'}}>
            <Header></Header>
            <View style={{width: '100%', height:'95%'}}>
                <Map />
                {/* <ChooseIcons startRecord= {this.startRecord} /> */}
            </View>
        </View>
        );
    }
    
};
export default Record;
