/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
class Header extends React.Component {
  render() {
    return (
      <View style={{marginBottom: 3}}>
        <StatusBar
                backgroundColor="white"
                barStyle="dark-content"
                animated={true}
            />
            <View
                style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    alignItems: 'center',
                }}>
                <FontAwesome name="" style={{fontSize: 24}} />
                <Text
                    style={{
                        fontFamily: 'Lobster-Regular',
                        fontSize: 25,
                        fontWeight: '500',
                    }}>
                    FootPrint
                </Text>
                <Feather name="" style={{fontSize: 24}} />
            </View>
      </View>
    );
  }
}

export default Header;
