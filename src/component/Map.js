/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import {Alert, Image, Linking, Modal, Platform, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {MapType,MapView} from 'react-native-amap3d/lib/src';
import {AMapSdk} from 'react-native-amap3d';
import Polyline from 'react-native-amap3d/lib/src/polyline';
import { init, Geolocation } from "react-native-amap-geolocation";
import Feather from 'react-native-vector-icons/Feather';
import {
    View,
} from 'react-native';
import {insertDataToTable,selectDataFromTable,dropTable,createTable,runCustomSQL} from '../utils/SQlite';
import {launchCamera} from "react-native-image-picker";
import ImageTrace from './Image';
import CounterEmitter from '../utils/CountEmitter'
import { db } from '../utils/firebase';
import RoutSelect from "./RoutSelect";
import styles from "react-native-side-menu/styles";
import ImageViewer from "react-native-image-zoom-viewer";
class Map extends React.Component {
    state = {
        shower:[],
        position:[],
        curPosition:'',
        isRecord:false,
        origin:null,
        destination:null,
        isNavigate: false,
        num: 0,
        navigation:[],
        modalVisible: false,
        imageUrl: [],
        index: 0
    }
    async componentDidMount(){
        /* key值初始化 */
        AMapSdk.init(
            Platform.select({
                android: "d093d4a09ffa98da37bb729dedf2c4a7",
            })
        );
        init({
            android: "d093d4a09ffa98da37bb729dedf2c4a7",
        });
        /* 读取缓存数据 */
        await selectDataFromTable('cache',this.loadData);

        /* 找到初始位置 */
        //  Geolocation.getCurrentPosition(({ coords }) => {
        //   this.setState({
        //     curPosition:{latitude: coords.latitude, longitude: coords.longitude}
        //   })
        // });

    }

    /* 读取缓存数据 */
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

    /* 开始 */
    startRecord = async() => {
        await dropTable('cache');
        createTable('CREATE TABLE  cache( latitude REAL,  longitude REAL, Paths TEXT );');
        this.setState({
            isRecord:true,
            position:[],
            imageUrl:[]
        });

    }

    /* 停止 */
    stopRecord = async() => {
        Alert.alert("提示信息", "是否结束记录", [{
            text: "结束并保存",
            onPress: this.saveTrace
        },{
            text: "继续记录",
            onPress: () => {
            }
        }])
        
    }
    saveTrace = async() => {
        /* 把足迹存到本地 */
        var myDate = new Date();//获取代码时间
        var tableName = 'Y' + myDate.getFullYear() + '_' + (myDate.getMonth()+1) + '_' + myDate.getDate() + '_' + myDate.getHours() + '_' + myDate.getMinutes() + '_' + myDate.getSeconds();
        let _position = this.state.position.slice();

        tableName += '_' + Math.round(_position[0].latitude) + '_' + Math.round(_position[0].longitude);
        var sql = `CREATE TABLE IF NOT EXISTS ${tableName}( latitude REAL,  longitude REAL, Paths TEXT );`;
        await createTable(sql);

        _position.map(point => {
            insertDataToTable(tableName,point);
        });
        /* 删除缓存 */
        this.setState({
            isRecord:false,
        })
        /* 发送信号更新历史菜单 */
        CounterEmitter.emit('addTrace');
    }
    showTables = (flag,datas) => {
        if(flag === true) {
            datas.map(data => {
                console.log(data);
            })
        }
    }

    getPosition = () => {
        //console.log(this.state.isRecord);
        if(this.state.isRecord === true){
            Geolocation.getCurrentPosition(async({ coords }) => {
                console.log(coords);
                let pposition = this.state.position.slice();
                let data = {latitude: coords.latitude, longitude: coords.longitude};
                pposition.push(data);
                /* 缓存数据 */
                await insertDataToTable('cache',data,()=>{});
                this.setState({
                    position:pposition
                })
            });
        }
        //console.log(this.state.position);

    }

    shot = () => {
        if (this.state.isRecord === true) {
            launchCamera({
                mediaType: 'photo',
                maxWidth: 1000,// 设置选择照片的大小，设置小的话会相应的进行压缩
                maxHeight: 1000,
                quality: 0.8,
                saveToPhotos: true,
                cameraRoll: true,
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            }, res => {
                console.log('Response = ', res);
                if (res.didCancel) {
                    return false;
                }
                else if (res.errorMessage) {
                    if (res.errorMessage.indexOf('This library does not require Manifest.permission.CAMERA') > -1) {
                        Alert.alert('提示信息', 'APP需要使用相机，请打开相机权限允许APP使用');
                    }
                }
                // 对获取的图片进行处理
                // 设置图片返回内容
                Geolocation.getCurrentPosition(async({ coords }) => {
                    let pos = this.state.position.slice();
                    let data = {latitude: coords.latitude, longitude: coords.longitude, Paths: res.assets[0].uri};
                    let url = this.state.imageUrl.slice();
                    url.push({url:res.assets[0].uri})
                    pos.push(data);
                    console.log('Data= ', data);
                    /* 缓存数据 */
                    await insertDataToTable('cache',data,()=>{});
                    this.setState({
                        position:pos,
                        imageUrl:url
                    })
                });
            }).then(
                r => " "
            )
        }
        else{
            Alert.alert("提示信息", "请先开始记录，按下开始按钮", [{
                text: "好的",
                onPress: () => {
                }
            }])
        }
    }

    Show =()=>{
        this.setState({modalVisible: true});
        console.log(this.state.imageUrl)
    }

    createMarker = (e) => {
        if (this.state.isNavigate) {
            if (this.state.num !== 0) {
                const l = e.nativeEvent;
                let location;
                location = {longitude: l.longitude, latitude: l.latitude};

                if (this.state.origin === null) {
                    this.setState({origin: location});
                    console.log("marker1")
                } else {
                    this.setState({destination: location});
                    console.log("marker2")
                    setTimeout(this.get_route,100)

                }
            }
            else{
                this.setState({num: 1})
            }
        }

    }

    get_route = () => {
        const paras = {
            key: "78162e7a1537ad5516f461251ef8576b",
            origin:this.state.origin,
            destination:this.state.destination,
            show_fields: "polyline"
        }
        let serviceUrl = "https://restapi.amap.com/v3/direction/driving?origin="+
            paras.origin.longitude.toFixed(6)+","+paras.origin.latitude.toFixed(6) +"&destination="
            +paras.destination.longitude.toFixed(6)+","+paras.destination.latitude.toFixed(6)
            +"&key="+paras.key+"&strategy=0&extensions=all";
        console.log(serviceUrl)
        let pos = []
        fetch(serviceUrl).then(r => r.json()).then(
            (response)=>{
                const paths = response.route.paths[0].steps;
                paths.forEach( function(path) {
                    let points = path.polyline.split(";")
                    points.forEach( function(item) {
                        const point = item.split(",")
                        let data = {latitude: parseFloat(point[1]), longitude: parseFloat(point[0])};
                        pos.push(data);
                        console.log(pos)
                    })
                })
            }
        )
        setTimeout (()=>{this.setState({navigation: pos})}, 200)

    }


    render(){
        const colorVec = ['rgba(250,112,154, 0.8)','rgba(254,225,64, 0.8)']
        //let data = this.state.position.slice()
        return (
            <View style={StyleSheet.absoluteFill}>
                <MapView
                    style={StyleSheet.absoluteFill}
                    mapType={MapType.Bus}
                    myLocationEnabled = {true}
                    zoomControlsEnabled = {false}
                    myLocationButtonEnabled
                    locationInterval={10000}
                    distanceFilter={10}
                    initialCameraPosition={{
                        target: {
                            latitude: 31.020812,
                            longitude: 121.436423,
                        },
                        zoom: 15,
                    }}
                    onLocation = {this.getPosition}
                    onPress={this.createMarker}
                >
                    <Polyline width={10} color={'rgba(254,225,64, 0.8)'} points={this.state.position} gradient={true}/>
                    <Polyline width={10} color={'#B5D9DC'} points={this.state.navigation} gradient={true}/>

                    {
                        this.state.position ?
                        this.state.position.map((item, i) => (
                                item.Paths ?
                                <ImageTrace item={item} key = {i} parent ={this}/>
                                    : <></>
                            )
                        )
                    :<></>
                    }

                    <RoutSelect origin = {this.state.origin} destination = {this.state.destination}/>

                </MapView>
                {this.state.isRecord ?
                    <Feather
                        name="stop-circle"
                        style={{fontSize: 60, padding: 5, zIndex:1,alignSelf:'center',marginTop:"5%",backgroundColor:'white',borderRadius:100}}
                        onPress={this.stopRecord}
                    /> :
                    <Feather
                        name="play-circle"
                        style={{fontSize: 60, padding: 5, zIndex:1,alignSelf:'center',marginTop:"5%",backgroundColor:'white',borderRadius:100}}
                        onPress={this.startRecord}
                    />
                }

                {this.state.isNavigate ?
                    <Feather
                        name="navigation"
                        style={{fontSize: 40, padding: 12,alignSelf:'center', marginTop:"100%",backgroundColor:'white',borderRadius:100}}
                        onPress={
                            ()=>{this.setState({origin: null, destination: null, isNavigate: false, num: 0, navigation: []})}
                        }
                    /> :
                    <Feather
                        name="navigation-2"
                        style={{fontSize: 40, padding: 12,alignSelf:'center', marginTop:"100%",backgroundColor:'white',borderRadius:100}}
                        onPress={()=>{this.setState({isNavigate: true})}}
                    />
                }

                <Feather
                    name="camera"
                    style={{fontSize:50, padding: 12,alignSelf:'center',marginTop:"5%",backgroundColor:'white',borderRadius:200}}
                    onPress={this.shot}
                />

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

        );
    }
}
export default Map;