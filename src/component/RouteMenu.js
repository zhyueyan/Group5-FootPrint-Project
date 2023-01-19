/* eslint-disable prettier/prettier */
import {  Alert,TouchableOpacity, View, Image, StyleSheet, Text, StatusBar, TextInput,ScrollView,Button } from 'react-native';
import React from 'react'
import RouteItem from './RouteItem';
import ScrollViewContext from 'react-native/Libraries/Components/ScrollView/ScrollViewContext';
import {runCustomSQL,dropTable,selectDataFromTable} from '../utils/SQlite';
import CounterEmitter from '../utils/CountEmitter';
import {DatePicker} from 'react-native-common-date-picker';
class RouteMenu extends React.Component {
    state = {
        localTrace:[],
        selectDate: "",
        searchPosition: "",
    }
    componentDidMount(){
        /* 查寻本地路径 */
        this.search();
        /* 注册监听事件 */
        CounterEmitter.addListener('addTrace',()=>{
            this.search();
        });
    }
    search = () => {
        runCustomSQL("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name",this.showTables);
    }
    showTables = (flag,datas) => {
        let trace = [];
        if(flag === true) {
            datas.map(data => {
                // console.warn(data);
                let route = new Object();
                route.name = data.name;
                let dateString = data.name.substring(1);    
                let dates = new Array();
                dates = dateString.split("_");
                
                let serviceUrl = "https://restapi.amap.com/v3/geocode/regeo?output=json&location="
                    + dates[7] + ',' + dates[6] + "&key=78162e7a1537ad5516f461251ef8576b";
                
                fetch(serviceUrl).then(r => r.json()).then(
                    (response)=>{
                        // console.warn(response.regeocode.formatted_address);
                        route.position = response.regeocode.addressComponent.province;
                        // console.warn(route);
                        trace.push(route);
                        // console.warn(trace);
                    }
                )
                setTimeout (()=>{this.setState({localTrace: trace});}, 400);
                
                
            })
        }
    }

    onChangeText = (text) => {
        this.setState({searchPosition: text});
    }
    
    
    confirmDate = (date) => {
        // console.warn(date);
        this.setState({selectDate: date});
    }

    deleteRoute = (item) => {
        Alert.alert("提示信息", "是否删除本条足迹？", [{
            text: "删除",
            onPress: () => {
                // console.warn(item);
                dropTable(item.name);
                this.search();
            }
        },{
            text: "取消",
            onPress: () => {
            }
        }])
    }

    shareRoute = (item) => {
        selectDataFromTable(item.name,this.loadData);
    }
    /* 读取本地数据 */
    loadData = (flag,data) => {
        if(flag === true){
            let _position = [];
            data.map(point => {
                _position.push({latitude: point.latitude, longitude: point.longitude, Paths:point.Paths})
            });
            this.props.navigation.navigate('NewPostScreen',{trace:_position});
        }
     }

    render() {
        var result = [];
        if (this.state.selectDate == "") {
            result = this.state.localTrace;
        } else {
            let dates = new Array();
            dates = this.state.selectDate.split("-");
            // console.warn(dates);
            if (dates[1].charAt(0) === '0') dates[1] = dates[1].substring(1);
            if (dates[2].charAt(0) === '0') dates[2] = dates[2].substring(1);
            let searchString = "Y"+dates[0]+"_"+dates[1]+"_"+dates[2];
            // console.warn(searchString);
            
            this.state.localTrace.forEach(item => {
                // console.warn(item);
                if (item.name.indexOf(searchString) != -1) {
                    // console.warn(item);
                    result.push(item);
                }
            });
        }
        var result2 = [];
        result.forEach(item => {
            if (item.position.indexOf(this.state.searchPosition) != -1) {
                // console.warn(item);
                result2.push(item);
            }
        });

        
        return (
            
        <View>
            {/* 日期选择器 */}
            <View style={{padding : 10}}>
                <DatePicker
                    confirm = {this.confirmDate}
                    width = {180}
                    confirmText = "筛选"
                    cancelText = "所有足迹"
                    cancel={() => {
                        this.setState({
                            selectDate: "",
                            searchPosition: "",
                        })
                    }}
                    rows = {3}
                />
            </View>
            <View style={{padding : 10}}>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.onChangeText(text)}
                />
            </View>


            {/* 路线列表 */}
            <ScrollView style={styles.container}>
                {
                    result2.map(item => {
                        // console.warn(item);
                        
                        if(item.name !== 'cache') {
                        let dateString = item.name.substring(1);    
                        let dates = new Array();
                        dates = dateString.split("_");
                        let showDateString1 = dates[0]+"年"+dates[1]+"月"+dates[2]+"日";
                        for (let i = 3; i <= 5; ++i) {
                            if (dates[i].length === 1) dates[i] = "0" + dates[i].slice(0,1);
                        }
                        let showDateString2 = dates[3]+":"+dates[4]+":"+dates[5];
                        let positionString = item.position;

                        return(
                        <View
                            style={{
                                flexDirection: "row",
                                height: 90,
                                padding: 8,
                                marginHorizontal:6
                            }}
                        >
                            <View style={{ backgroundColor: "#DDDDDD", flex: 1}}>
                            <View style={styles.fixToText}>
                                <TouchableOpacity onPress={() => {this.props.getTrace(item)}}>
                                    <Text style={{ fontWeight: 'bold' }}>{showDateString1}</Text> 
                                    <Text style={{ fontWeight: 'bold' }}>{showDateString2}</Text> 
                                    <Text style={{ fontWeight: 'bold' }}>{positionString}</Text> 
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.shareRoute(item)}>
                                    <Image
       
                                    source={{uri:'https://img.icons8.com/material-outlined/96/666666/share.png'}}
                                    style={{ width: 30, height: 30 }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.deleteRoute(item)}>
                                    <Image
                                    source={require('../assets/picture/trashbin.png')}
                                    style={{ width: 30, height: 30 }}
                                    />
                                </TouchableOpacity>
                                    
                            </View>
                            </View>
                            
                            
                        </View>);
                        }
                        
                    })
                }


            </ ScrollView>
        </View>
            
    );
    }
    
}

const styles = StyleSheet.create({
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 7,
      marginHorizontal: 5,
    },
    container: {
        marginBottom: 190,
      },
  });

export default RouteMenu;