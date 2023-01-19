/* eslint-disable prettier/prettier */
import React from 'react'
import {View,Text} from 'react-native'
import {NavigationContainer} from "@react-navigation/native";
//import {createStackNavigator} from "@react-navigation/stack";
import Record from "./src/view/Record"
import Histories from "./src/view/Histories"
import Login from "./src/view/Login"
import HomeScreen from './src/view/Home';
import Profile from './src/view/Profile';
import Ionic from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignupScreen from './src/view/SignupScreen';
import NewPostScreen from './src/view/NewPost';
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();
const screenOptions = {
    headerShown: false
}

export const SignedInStack = () => {
    const bottomTabScreen = () => {
        return (
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarStyle: {
                        height: 50,
                    },

                    tabBarIcon: ({focused, size, colour}) => {
                        let iconName;
                        if (route.name === 'Histories') {
                            iconName = focused ? 'ios-pricetags' : 'ios-pricetags-outline';
                            size = focused ? size + 8 : size + 2;
                        } else if (route.name === 'Home') {
                            iconName = focused ? 'home-sharp' : 'home-outline';
                        } else if (route.name === 'Record') {
                            iconName = focused
                                ? 'ios-paw'
                                : 'ios-paw-outline';
                        } else if (route.name === 'Activity') {
                            iconName = focused ? 'ios-heart' : 'ios-heart-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'ios-person-circle' : 'ios-person-outline';
                        }

                        return <Ionic name={iconName} size={size} color={colour} />;
                    },
                })}>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Histories" component={Histories} /> 
                <Tab.Screen name="Record" component={Record} />
                {/* <Tab.Screen name="Activity" component={Activity} />*/}
                <Tab.Screen name="Profile" component={Profile} /> 
            </Tab.Navigator>
        );
    };
    return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='bottomTabScreen' screenOptions={screenOptions}>
            {/* <Stack.Screen name='RecordScreen' component={Record} /> */}
            <Stack.Screen name='bottomTabScreen' component={bottomTabScreen} />
            <Stack.Screen name='NewPostScreen' component={NewPostScreen} />
            {/* <Stack.Screen name='HistoriesScreen' component={Histories} /> */}
        </Stack.Navigator>
    </NavigationContainer>
    )
}


export const SignedOutStack=()=>(
    <NavigationContainer>
        <Stack.Navigator initialRouteName='LoginScreen' screenOptions={screenOptions}>
            <Stack.Screen name='LoginScreen' component={Login} />
            <Stack.Screen name='SignupScreen' component={SignupScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)

