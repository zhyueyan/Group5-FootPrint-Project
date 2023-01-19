/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Marker} from 'react-native-amap3d/lib/src';
class ImageTrace extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    load:false
  }
  load = () => {
    this.setState({load:true});
  }
  render() {
    const style = StyleSheet.create({
      infoWindow: {
        padding: 5,
        borderRadius: 12,
        elevation: 4,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
      },
    });
    const item = this.props.item;
    return (
      <View key={this.props.key}>
        <Marker
          onPress={()=>{this.props.parent.Show()}}
          draggable={false}
          active = {this.state.load}
          position={{
            latitude: item.latitude ? item.latitude : 0,
            longitude: item.longitude ? item.longitude : 0,
          }}>
          <View style={style.infoWindow}>
            <Image source={{uri: item.Paths}} style={{width: 25, height: 25}} onLoad={this.load}/>
          </View>
        </Marker>
      </View>
    );
  }
}
export default ImageTrace;
