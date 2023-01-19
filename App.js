/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import {
//     Share,
//     Text,
//     View,
// } from 'react-native';
import './src/utils/SQlite';
// import Ionic from 'react-native-vector-icons/Ionicons';
// import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Record from './src/view/Record';
// import Histories from './src/view/Histories';
import AuthNavigation from './AuthNavigation';
const App = () => {
    // const Stack = createNativeStackNavigator();

    // const Tab = createBottomTabNavigator();

    // const bottomTabScreen = () => {
    //     return (
    //         <Tab.Navigator
    //             screenOptions={({route}) => ({
    //                 tabBarHideOnKeyboard: true,
    //                 tabBarShowLabel: false,
    //                 headerShown: false,
    //                 tabBarStyle: {
    //                     height: 50,
    //                 },

    //                 tabBarIcon: ({focused, size, colour}) => {
    //                     let iconName;
    //                     if (route.name === 'Histories') {
    //                         iconName = focused ? 'ios-pricetags' : 'ios-pricetags-outline';
    //                         size = focused ? size + 8 : size + 2;
    //                     } else if (route.name === 'Home') {
    //                         iconName = focused ? 'home-sharp' : 'home-outline';
    //                     } else if (route.name === 'Record') {
    //                         iconName = focused
    //                             ? 'ios-paw'
    //                             : 'ios-paw-outline';
    //                     } else if (route.name === 'Activity') {
    //                         iconName = focused ? 'ios-heart' : 'ios-heart-outline';
    //                     } else if (route.name === 'Profile') {
    //                         iconName = focused ? 'ios-person-circle' : 'ios-person-outline';
    //                     }

    //                     return <Ionic name={iconName} size={size} color={colour} />;
    //                 },
    //             })}>
    //             {/* <Tab.Screen name="Home" component={Home} />*/}
    //             <Tab.Screen name="Histories" component={Histories} /> 
    //             <Tab.Screen name="Record" component={Record} />
    //             {/* <Tab.Screen name="Activity" component={Activity} />
    //             <Tab.Screen name="Profile" component={Profile} /> */}
    //         </Tab.Navigator>
    //     );
    // };

    // return (
    //     <NavigationContainer>
    //         <Stack.Navigator
    //             screenOptions={{
    //                 headerShown: false,
    //             }}>
    //             <Stack.Screen name="Bottom" component={bottomTabScreen} />
    //             {/* <Stack.Screen name="Status" component={Status}/>
    //             <Stack.Screen name="Follower" component={Follower}/>
    //             <Stack.Screen name="Like" component={Like}/>
    //             <Stack.Screen name="Review" component={Review}/>
    //             <Stack.Screen name="Share" component={share}/> */}
    //         </Stack.Navigator>
    //     </NavigationContainer>
    // );
    return <AuthNavigation/>
};

export default App;
