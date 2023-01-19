/* eslint-disable prettier/prettier */
import React from 'react'
import {View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity} from 'react-native'
import FormikPostUpLoader from "./FormikPostUpLoader";

const AddNewPost = ({navigation,trace}) => (
    <View style={styles.container}>
        <Header navigation={navigation}/>
        <FormikPostUpLoader navigation={navigation} trace={trace}/>
    </View>
)

const Header = ({navigation}) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image
                source={{uri:'https://img.icons8.com/material-outlined/48/undefined/back--v1.png'}}
                style={{width:30,height:30}}
            />
        </TouchableOpacity>
        <Text style={styles.headerText}>分享足迹</Text>
        <Text></Text>
    </View>
)

const styles=StyleSheet.create(
    {
        container:
            {
                backgroundColor:"#ffffff",
                flex: 1
            },

        headerContainer:
            {
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                marginTop:25
            },

        headerText:
            {
                color:'#000',
                fontWeight:'700',
                fontSize:20,
                marginRight:23
            }
    }
)

export default AddNewPost
