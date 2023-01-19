/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import firebase from 'firebase';
const handleSignout=async()=>{
    try{
        await firebase.auth().signOut()
        console.log('Signed Out successfully!')
    }catch(error){
        console.log(error)
    }
}
export const ProfileBody = ({
                                name,
                                accountName,
                                profileImage,
                                post,
                                followers,
                                following,
                            }) => {
    return (
        <View>
            {accountName ? (
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
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}>
                            {accountName}
                        </Text>
                        <Feather
                            name="chevron-down"
                            style={{
                                fontSize: 20,
                                color: 'black',
                                paddingHorizontal: 5,
                                opacity: 0.5,
                            }}
                        />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Feather
                            name="plus-square"
                            style={{
                                fontSize: 25,
                                color: 'black',
                                paddingHorizontal: 15,
                            }}
                        />
                        <Feather
                            name="menu"
                            style={{
                                fontSize: 25,
                            }}
                            onPress={handleSignout}
                        />
                    </View>
                </View>
            ) : null}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    paddingVertical: 20,
                }}>
                <View
                    style={{
                        alignItems: 'center',
                    }}>
                    <Image
                        source={profileImage}
                        style={{
                            resizeMode: 'cover',
                            width: 80,
                            height: 80,
                            borderRadius: 100,
                        }}
                    />
                    <Text
                        style={{
                            paddingVertical: 5,
                            fontWeight: 'bold',
                        }}>
                        {name}
                    </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>{post}</Text>
                    <Text>Posts</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>{followers}</Text>
                    <Text>Followers</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>{following}</Text>
                    <Text>Following</Text>
                </View>
            </View>
        </View>
    );
};
