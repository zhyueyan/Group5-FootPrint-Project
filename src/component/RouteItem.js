/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TextInput } from 'react-native';
import React from 'react'

const RouteItem = (props) => {
    return (
        <View
            style={{
                flexDirection: "row",
                height: 100,
                padding: 20
            }}
        >
            <View style={{ backgroundColor: "#C2DCF6", flex: 1}}>
                <Text>{props.title}</Text>
            </View>
            
        </View>
    )
}

export default RouteItem;