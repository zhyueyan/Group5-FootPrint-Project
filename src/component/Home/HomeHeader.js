/* eslint-disable prettier/prettier */
import React from 'react';
import {View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native';
import plus_icon from '../../assets/picture/icons8-plus-50.png';
import heart_icon from '../../assets/picture/icons8-heart-48.png';
import message_icon from '../../assets/picture/icons8-topic-48.png';
import firebase from '../../utils/firebase';


const HomeHeader = ({navigation}) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity>
                
            </TouchableOpacity>

            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={()=>navigation.push('NewPostScreen')}>
                    <Image
                        source={plus_icon}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={()=>navigation.push('ProfileScreen')}>
                    <Image
                        source={heart_icon}
                        style={styles.icon}
                    />
                </TouchableOpacity> */}
                <TouchableOpacity>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>11</Text>
                    </View>
                    <Image
                        source={message_icon}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles=StyleSheet.create(
    {
        container:
            {
                justifyContent:'space-between',
                alignItems:'center',
                flexDirection:'row',
                marginHorizontal:20,
                marginBottom:10
            },

        iconsContainer:
            {
                flexDirection:'row',
            },

        logo:
            {
                width:100,
                height:50,
                resizeMode:'contain',
            },

        icon:
            {
                width:30,
                height:30,
                marginLeft:10,
                resizeMode:'contain',
            },

        unreadBadge:
            {
                backgroundColor:'#333333',
                position:'absolute',
                left:20,
                bottom:18,
                width:25,
                height:18,
                borderRadius:25,
                alignItems:'center',
                justifyContent:'center',
                zIndex:100
            },

        unreadBadgeText:
            {
                color:'white',
                fontWeight:'600',
            }
    }
)

export default HomeHeader
