/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React,{useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl} from 'react-native'
import ProfileHeader from '../component/Profile/ProfileHeader';
import Header from '../component/header';
import {db, firebase} from "../utils/firebase";
// import Body from '../component/Profile/Body';
import Post from '../component/Home/Post';

const Profile = ({navigation}) => {

    const [posts,setPosts]=useState([])

    const [isRefreshing, setRefreshing] = useState(false)

    let [ currentFollowers] = useState([]);

    function refresh(){
        const user=firebase.auth().currentUser
        const collectionGroup= db
            .collectionGroup('posts')
            .where('owner_uid','==',user.uid)
            .orderBy('createdAt','desc')
            .onSnapshot(snapshot => {
                setPosts(snapshot.docs.map(post=>(
                    {id:post.id, ...post.data()})))
            })
    }

    function onRefresh() {
        //先修改刷新状态为true
        setRefreshing(true);
        console.log("Refreshing...")
        refresh();
        setTimeout(() => {
            setRefreshing(false)
        }, 1500);

    }


    useEffect(()=>{
        refresh()
    },[])

    return(
        <View style={{backgroundColor:'white'}}>
            <Header />
            <ProfileHeader posts={posts}/>
            <View>
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
                        <Post post={post}/>
                    )}
                </ScrollView>
            </View>

        </View>
        )

}

export default Profile;

