/* eslint-disable prettier/prettier */
import React from 'react'
import {StyleSheet,View,Image} from 'react-native'
import LoginForm from "../component/LoginForm"
import footprint_logo from '../assets/picture/loginIcon.jpg'

const LoginScreen = ({navigation}) => (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image source={footprint_logo} style={{width: 125, height: 125}}/>
        </View>
        <LoginForm navigation={navigation}/>
    </View>
)

const styles=StyleSheet.create(
    {
        container:
            {
                flex: 1,
                backgroundColor:'white',
                paddingTop:50,
                paddingHorizontal:12
            },

        logoContainer:
            {
                alignItems:'center',
                marginTop:60
            }
    }
)

export default LoginScreen;
