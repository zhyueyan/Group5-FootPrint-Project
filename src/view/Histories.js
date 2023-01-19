/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Platform, Text, Image, Button, Modal, TouchableOpacity} from 'react-native';
import {MapType,MapView} from 'react-native-amap3d/lib/src';
import { Polyline } from 'react-native-amap3d/lib/src';
import {AMapSdk} from 'react-native-amap3d';
import Header from '../component/header';
import SideMenu from 'react-native-side-menu';
import RouteMenu from '../component/RouteMenu';
import {selectDataFromTable} from '../utils/SQlite'
import { Marker } from 'react-native-amap3d/lib/src';
import ImageTrace from '../component/Image';
import { CameraPosition } from 'react-native-amap3d/lib/src';
import ImageViewer from "react-native-image-zoom-viewer";
class Histories extends React.Component {
    state = {
        isOpen:false,
        position:[],
        modalVisible: false,
        ifShowPhotos:true,
        imageUrl: [],
    }
    componentDidMount(){
        /* key值初始化 */
        AMapSdk.init(
          Platform.select({
            android: "d093d4a09ffa98da37bb729dedf2c4a7",
          })
        );
    }

    openMenu() {
        this.setState({isOpen: true});
    }

    changePhotoStatus() {
        // console.warn(this.state.ifShowPhotos);
        let flag = this.state.ifShowPhotos;
        this.setState({ifShowPhotos: !flag});
    }
   
    /* 回调函数获取选择的轨迹 */
    getTrace = item => {
    //   console.log(item);
      selectDataFromTable(item.name,this.loadData);
      this.setState({isOpen: false});
    }
    /* 读取本地数据 */
    loadData = (flag,data) => {
      if(flag === true){
          let _position = [];
          let _url = [];
          data.map(point => {
              _position.push({latitude: point.latitude, longitude: point.longitude, Paths:point.Paths})
              if (point.Paths)
                  _url.push({url:point.Paths})
          });
          //console.log(_position);
          this.setState({
              position:_position,
              imageUrl: _url
          })
      }
   }

    Show =()=>{
        this.setState({modalVisible: true});
        console.log(this.state.imageUrl)
    }

    render() {
        const menu = <RouteMenu getTrace={this.getTrace} navigation={this.props.navigation}/>;
        return (
            <SideMenu
                menu={menu}
                menuPosition="right"
                isOpen={this.state.isOpen}
            >
                <View style={{backgroundColor: 'white', height: '100%'}}>
                    <Header/>
                    <Button
                        title="选择历史足迹"
                        color="#808080"
                        onPress={() => this.openMenu()}
                    />
                    <TouchableOpacity onPress={() => this.changePhotoStatus()} style={styles.box1}>
                        <Image style={{ width: 40, height: 40 }}
                               source={require('../assets/picture/photo.png')}
                        />
                    </TouchableOpacity>

              <MapView
                    
                    style={{height: '100%'}}
                    mapType={MapType.Bus}
                    myLocationEnabled = {false}
                    zoomControlsEnabled = {false}
                    myLocationButtonEnabled = {false}
                    distanceFilter={10}
                    compassEnabled = {false}
                    initialCameraPosition={{
                        target: {
                            latitude: 32.53208753003748,
                            longitude: 120.46015348809584,
                        },
                        zoom: 15,
                    }} 
                >
                <Polyline width={10} color={'rgba(254,225,64, 0.8)'} points={this.state.position} gradient={true}/>
                {
                this.state.position && this.state.ifShowPhotos ?
                this.state.position.map((item, i) => (
                                item.Paths ?
                                <ImageTrace item={item} parent = {this} key = {i}/>
                                    : <></>
                            )
                        )
                    :<></>
              }
              </MapView>
                  <Modal
                      visible={this.state.modalVisible}
                      animationType={'none'}
                      transparent = {true}
                      onRequestClose={()=> {
                          this.setState({
                              modalVisible: false,
                          });
                      }}>
                      <ImageViewer imageUrls={this.state.imageUrl}
                                   onCancel={()=> {
                                       this.setState({
                                           modalVisible: false,
                                       });
                                   }}
                                   onClick={() => {
                                       this.setState({
                                           modalVisible: false
                                       })
                                   }}
                                   saveToLocalByLongPress={false}/>
                  </Modal>
              </View>
         </SideMenu>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    box1: {
        position: 'absolute',
        top: 120,
        left: 20,
        width: 40,
        height: 40,
        zIndex: 100,
    },
    box2: {
        ...StyleSheet.absoluteFill,
        width: 100,
        height: 100,
        backgroundColor: 'blue'
    },
    box3: {
        position: 'absolute',
        top: 120,
        left: 120,
        width: 100,
        height: 100,
        backgroundColor: 'green'
    },
    text: {
        color: '#FFF',
        fontSize: 80
    }
});

export default Histories;
