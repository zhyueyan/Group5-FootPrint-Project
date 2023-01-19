/* eslint-disable prettier/prettier */
import React,{useEffect,useState} from 'react'
import {View, Text, SafeAreaView, StyleSheet, ScrollView, RefreshControl} from "react-native";
import Header from '../component/header';
import HomeHeader from '../component/Home/HomeHeader';
import Stories from '../component/Home/Stories';
import Post from "../component/Home/Post";
//import BottomTabs, {bottomTabIcons} from "../components/home/BottomTabs";
import {db} from '../utils/firebase'

const HomeScreen = ({navigation}) => {
    const [posts,setPosts]=useState([])

    const [isRefreshing, setRefreshing] = useState(false)

    function refresh(){
        db.collectionGroup('posts')
            .orderBy('createdAt','desc')
            .onSnapshot(snapshot => {
                setPosts(snapshot.docs.map(post=>(

                    {id:post.id, ...post.data()})))
            })
        db.collection("users").get().then((querySnapshot) => {
            console.log(querySnapshot);
        })
    }

    useEffect(()=>{
        refresh();
    },[])

    function onRefresh() {
        //先修改刷新状态为true
        setRefreshing(true);
        console.log("Refreshing...")
        refresh();
        setTimeout(() => {
            setRefreshing(false)
        }, 1500);

    }

     const deletePost = (post) => {
        let _posts = posts.filter(item=>{
            return item.id !== post.id
       })
       console.log(post.id);
       console.log(_posts);
        setPosts(_posts)
     }
    

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            {/* <Stories/> */}
            <ScrollView
                refreshControl={  //设置下拉刷新组件
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh.bind(this)}
                        tintColor='white'
                        title= {isRefreshing? '刷新中....':'下拉刷新'}
                    />
                }
            >
                {posts.map((post,index)=>
                    <Post post={post} key={index} deletePost={deletePost}/>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create(
    {
        container:
            {
                backgroundColor:'white',
                flex: 1,
                marginTop:0,
            }
    }
)

export default HomeScreen
