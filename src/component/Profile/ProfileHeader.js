/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React,{useEffect, useState}  from 'react'
import {View, Text,  StyleSheet, Image, TouchableWithoutFeedback,SafeAreaView,} from 'react-native'
import {db, firebase} from "../../utils/firebase";
import Feather from 'react-native-vector-icons/Feather';
import { BottomPopup } from './BottomPopup';
const handleSignout=async()=>{
    try{
        await firebase.auth().signOut()
        console.log('Signed Out successfully!')
    }catch(error){
        console.log(error)
    }
}
const popuplist=[
    {
        id:1,
        name:'注销',
    },
    
]
const ProfileHeader = ({posts}) => {
    const [currentLoggedInUser,setCurrentLoggedInUser]=useState(posts)
    const getUsername=()=>{
        const user=firebase.auth().currentUser
        const unsubscribe=db
            .collection('users')
            
            .where('owner_uid','==',user.uid).limit(1).onSnapshot(
                snapshot => snapshot.docs.map(doc=>{
                    setCurrentLoggedInUser({
                        username:doc.data().username,
                        profilePicture:doc.data().profile_picture
                    })
                })
            )
        return unsubscribe
    }


    useEffect(()=>{
        getUsername()
    },[]);

    let popupRef=React.createRef()

    const onShowPopup=()=>{
        popupRef.show()
    }

    const onClosePopup=()=>{
        popupRef.close()
    }



    return(
        <View>
            <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        
                    </View>

                </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    paddingVertical: 20,
                }}>
                <View
                    style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={{uri:currentLoggedInUser.profilePicture}} style={styles.story}/>
                    <Text style={{color:'black',marginLeft:5,fontWeight:'700'}}>
                        {currentLoggedInUser.username}
                    </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>{posts.length}</Text>
                    <Text>动态</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>0</Text>
                    <Text>粉丝</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>{0}</Text>
                    <Text>关注</Text>
                </View>
                <SafeAreaView style={styles.container}>
                    <TouchableWithoutFeedback onPress={onShowPopup}>
                        <Feather
                            name="menu"
                            style={{
                                fontSize: 25,
                                marginRight:10
                            }}
                            // onPress={handleSignout}
                        />
                    </TouchableWithoutFeedback>
                    <BottomPopup
                        // title="More details"
                        ref={(target)=>popupRef=target}
                        onTouchOutside={onClosePopup}
                        data={popuplist}

                    />
                </SafeAreaView>
            </View>
        </View>
        )

}


const styles=StyleSheet.create(
    {
        story:
            {
                width:35,
                height:35,
                borderRadius:50,
                marginLeft:6,
                borderWidth:1.6,
                borderColor:'#333333',
            },

        footerIcon:
            {
                width:33,
                height:33,
            },

        leftFooterIconsContainer:
            {
                flexDirection:'row',
                width:'32%',
                justifyContent:'space-between',
            },
    }
)
export default ProfileHeader
