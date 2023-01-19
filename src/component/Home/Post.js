/* eslint-disable prettier/prettier */
import React,{useEffect,useState}from 'react';
import {Alert, View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Button,Platform} from 'react-native';
//import {Divider} from "react-native-elements";
import {firebase,db} from '../../utils/firebase' 
import {Formik} from "formik";
import MapView from 'react-native-amap3d/lib/src/map-view';
import  {MapType}  from 'react-native-amap3d/lib/src';
import { Polyline } from 'react-native-amap3d/lib/src';
import {AMapSdk} from 'react-native-amap3d';
const postFooterIcons=[
    {
        name:'Like',
        imageUrl:'https://img.icons8.com/material-outlined/96/666666/filled-like.png',
        LikeImageUrl:'https://img.icons8.com/material/96/666666/filled-like--v1.png',
        imageSrc:"../../assets/picture/icon8-heart-48.png",
        LikeImageSrc:'../../assets/picture/icon8-heart-black-48.png',
    },
    {
        name:'Comment',
        imageUrl: 'https://img.icons8.com/material-outlined/96/666666/topic--v1.png',
    },
    {
        name:'Share',
        imageUrl: 'https://img.icons8.com/material-outlined/96/666666/share.png',
    },
    {
        name:'Save',
        imageUrl: 'https://img.icons8.com/material-outlined/96/666666/downloading-updates.png',
    }
]

const Post = ({post,deletePost}) => {

    const handleLike=post=>{
        const currentLikeStatus=!post.likes_by_users.includes(
            firebase.auth().currentUser.email
        )

        db.collection('users')
            .doc(post.owner_email)
            .collection('posts')
            .doc(post.id)
            .update({
                likes_by_users:currentLikeStatus
                    ?firebase.firestore.FieldValue.arrayUnion(
                        firebase.auth().currentUser.email
                    )
                    :firebase.firestore.FieldValue.arrayRemove(
                        firebase.auth().currentUser.email
                    )
            })
            .then(()=>{
                console.log('Document successfully update!')
            })
            .catch(error=>{
                console.error('Error updating document:',error)
            })
    }

    const handleFollow=(currentFollowers,currentMyFollows,post)=>{
        //let [ currentFollowers] = useState([]);

        const currentFollowStatus=!currentFollowers.includes(
            firebase.auth().currentUser.email
        )

        db.collection('users')
            .doc(post.owner_email)
            .update({
                followers:currentFollowStatus
                    ?firebase.firestore.FieldValue.arrayUnion(
                        firebase.auth().currentUser.email
                    )
                    :firebase.firestore.FieldValue.arrayRemove(
                        firebase.auth().currentUser.email
                    )
            })
            .then(()=>{
                console.log('Document successfully update!')
            })
            .catch(error=>{
                console.error('Error updating document:',error)
            })


        const currentMyFollowStatus=!currentMyFollows.includes(
            firebase.auth().currentUser.email
        )
        db.collection('users')
            .doc(firebase.auth().currentUser.email)
            .update({
                my_follows:currentFollowStatus
                    ?firebase.firestore.FieldValue.arrayUnion(
                        post.owner_email
                    )
                    :firebase.firestore.FieldValue.arrayRemove(
                        post.owner_email
                    )
            })
            .then(()=>{
                console.log('Document successfully update!')
            })
            .catch(error=>{
                console.error('Error updating document:',error)
            })
    }

    return(
        <View style={{marginBottom:30}}>
            {/* <Divider width={1} orientation='vertical'/> */}
            <PostHeader post={post} handleFollow={handleFollow} deletePost={deletePost}/>
            <PostImage post={post}/>
            <View style={{marginHorizontal:15,marginTop:10}}>
                <PostFooter post={post} handlerLike={handleLike}/>
                <Likes post={post}/>
                <Caption post={post} />
                <Text style={{fontWeight:"bold", marginBottom:5, marginTop: 15}}>
                    评论
                </Text>
                <Comments post={post}/>
                <AddComment post={post}/>
            </View>
        </View>
    )
}

const PostHeader = ({post,handleFollow,deletePost}) => {
    const handleDelete = post => {
        Alert.alert("提示信息", "确认是否删除该动态", [{
            text: "删除",
            onPress: () => {
                db.collection('users')
            .doc(post.owner_email)
            .collection('posts')
            .doc(post.id)
            .delete()
            .then(() => {
                console.log('User deleted!');
                deletePost(post);
                
            });

            }
        },{
            text: "取消",
            onPress: () => {
            }
        }])
        
    }

    let [ currentFollowers] = useState([]);
    db.collection("users").where('owner_uid','==',post.owner_uid).limit(1).onSnapshot(
        snapshot => snapshot.docs.map(doc=>{
            currentFollowers=doc.data().followers
            console.log(doc.data());
        })
    )
    const currentFollowStatus=!currentFollowers.includes(
        firebase.auth().currentUser.email
    )
    let [currentMyFollows] = useState([]);
    db.collection("users").where('owner_uid','==',firebase.auth().currentUser.uid).limit(1).onSnapshot(
        snapshot => snapshot.docs.map(doc=>{
            currentMyFollows=doc.data().my_follows
            console.log(doc.data());
        })
    )

    return(
        <View
            style={{
                flexDirection:'row',
                justifyContent:'space-between',
                margin:5,
                alignItems:'center',
            }}
        >
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image source={{uri:post.profile_picture}} style={styles.story}/>
                <Text style={{color:'black',marginLeft:5,fontWeight:'700'}}>
                    {post.user}
                </Text>
            </View>
            {
            (post.owner_email === firebase.auth().currentUser.email)?
            <TouchableOpacity onPress={()=>handleDelete(post)}>
                <Image
                    style={styles.footerIcon}
                    source={
                        require('../../assets/picture/trashbin.png')   
                    }
                />
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={()=>handleFollow(currentFollowers,currentMyFollows,post)}>
                <Image
                    style={styles.footerIcon}
                    source={{
                        uri: post.likes_by_users.includes(firebase.auth().currentUser.email)
                            ?"https://img.icons8.com/ios/100/000000/add-user-male.png"
                            :"https://img.icons8.com/ios/100/000000/checked-user-male.png",
                    }}
                />
            </TouchableOpacity>
            }
        </View>
    )
}


const PostImage =({post}) => {
    useEffect(()=>{
        const length = post.trace.length;
        console.log(length)
    },[])
    const length = post.trace.length;
    return(

    <View style={{
        width:'100%',
        height:450,
    }}>
    
        
        {/* <Image
            source={{uri:post.imageUrl}}
            style={{height:'100%',resizeMode:'cover'}}
        /> */}
        
        <MapView
                    key={post.id}
                    style={{height: '100%'}}
                    mapType={MapType.Bus}
                    myLocationEnabled = {false}
                    zoomControlsEnabled = {false}
                    myLocationButtonEnabled = {false}
                    compassEnabled = {false}
                    initialCameraPosition={{
                        target: {
                            latitude: (post.trace[length-1].latitude + post.trace[0].latitude)/2,
                            longitude: (post.trace[length-1].longitude + post.trace[0].longitude)/2,
                        },
                        zoom: 15,
                    }} 
                    scrollGesturesEnabled = {false}
                    zoomGesturesEnabled   = {false}
                >
                    <Polyline width={10} color={'rgba(254,225,64, 0.8)'} points={post.trace}/>
                </MapView>
    </View>
)}

const PostFooter= ({handlerLike,post}) => (

        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={styles.leftFooterIconsContainer}>
                <TouchableOpacity onPress={()=>handlerLike(post)}>
                    <Image
                        style={styles.footerIcon}
                        source={{
                            uri:post.likes_by_users.includes(firebase.auth().currentUser.email)
                            ?postFooterIcons[0].LikeImageUrl
                            :postFooterIcons[0].imageUrl,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
)

const Icon = ({imgStyle,imgUrl}) =>(
    <TouchableOpacity>
        <Image style={imgStyle} source={{uri:imgUrl}}/>
    </TouchableOpacity>
)

const Likes = ({post}) => (
    <View style={{flexDirection:'row',marginTop:4}}>
        <Text style={{color:'black',fontWeight:'600'}}>
            {post.likes_by_users.length.toLocaleString('en')} 赞
        </Text>
    </View>
)

const Caption = ({post}) => (
    post.caption ?
    <View style={{marginTop:8}}>
        <Text style={{color:'black',fontWeight:'bold'}}>
            {post.caption}
        </Text>
    </View>:<></>
)

const Comments = ({post}) => {
    return(
        post.comments.map((comment, index) =>
            <Comment comment={comment} key={index}/>
        )
    )
}

const Comment = ({comment}) => (
    <>
        <Text>{comment}</Text>
    </>
)

const AddComment = ({post}) => {
    const [currentLoggedInUser,setCurrentLoggedInUser]=useState(null)
    const getUsername=()=>{
        const user=firebase.auth().currentUser
        console.log(user);
        // setCurrentLoggedInUser({
        //     username:user.displayName,
        //     profilePicture:doc.data().profile_picture
        // })
        const unsubscribe=db
            .collection('users')
            .where('owner_uid','==',user.uid).limit(1).onSnapshot(
                snapshot => snapshot.docs.map(doc=>{
                    doc.data().username;
                    setCurrentLoggedInUser({
                        username:doc.data().username,
                        // profilePicture:doc.data().profile_picture
                    })
                })
            )
        return unsubscribe
    }

    useEffect(()=>{
        getUsername()
    },[])

    const uploadCommentToFirebase=(caption,post)=>{
        const currentCommentStatus=!post.comments.includes(
            currentLoggedInUser.username+": "+caption
        )
        db.collection('users')
            .doc(post.owner_email)
            .collection('posts')
            .doc(post.id)
            .update({
                comments:currentCommentStatus
                    ?firebase.firestore.FieldValue.arrayUnion(
                        currentLoggedInUser.username+": "+caption
                    )
                    :firebase.firestore.FieldValue.arrayRemove(
                        currentLoggedInUser.username+": "+caption
                    )
            })
            .then(()=>{
                console.log('Document successfully update!')
            })
            .catch(error=>{
                console.error('Error updating document:',error)
            })
    }

    const uploadPostToFirebase=(caption)=>{
        const unsubscribe=db
            .collection('users')
            .doc(firebase.auth().currentUser.email)
            .collection('posts')
            .add({
                imageUrl:imageUrl,
                user:currentLoggedInUser.username,
                profile_picture:currentLoggedInUser.profilePicture,
                owner_uid:firebase.auth().currentUser.uid,
                owner_email:firebase.auth().currentUser.email,
                caption:caption,
                createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                likes_by_users:[],
                comments:[]
            })
            .then(()=>navigation.goBack())
        return unsubscribe
    }

    return(
        <Formik
            initialValues={{caption:''}}
            onSubmit={values=>{
                uploadCommentToFirebase(values.caption,post)
            }}
            validateOnMount={true}
        >
            {({handleBlur,handleChange,handleSubmit,values,errors,isValid})=>(
                <>
                    <View style={{margin:5,justifyContent:'space-between',flexDirection:'row'}}>

                        <View style={{flex:1,marginLeft:0}}>
                            <TextInput
                                style={{color:'black',fontSize:15}}
                                placeholder='添加评论...'
                                placeholderTextColor='gray'
                                multiline={true}
                                onChangeText={handleChange('caption')}
                                onBlur={handleBlur('caption')}
                                value={values.caption}
                            />
                        </View>
                        <Button  onPress={handleSubmit} title='发送' disabled={!isValid} color={'grey'}/>
                    </View>

                </>
            )}
        </Formik>
    )
}

const styles=StyleSheet.create(
    {
        story:
            {
                width:35,
                height:35,
                borderRadius:50,
                marginLeft:6,
                borderWidth:1.6,
                borderColor:'#333333',
            },

        footerIcon:
            {
                width:33,
                height:33,
            },

        leftFooterIconsContainer:
            {
                flexDirection:'row',
                width:'32%',
                justifyContent:'space-between',
            },
    }
)

export default Post

