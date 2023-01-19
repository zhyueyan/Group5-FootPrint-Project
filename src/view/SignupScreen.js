/* eslint-disable prettier/prettier */
import React from 'react'
import {StyleSheet,View,Image} from 'react-native'
import SignupForm from '../component/SignupForm'
const FOOTPRINT_LOGO='../../assets/picture/loginIcon.jpg'

const SignupScreen = ({navigation}) => (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image source={{url:FOOTPRINT_LOGO,height:100,width:100}}/>
        </View>
        <SignupForm navigation={navigation}/>
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

export default SignupScreen
