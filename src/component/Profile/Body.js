/* eslint-disable prettier/prettier */
import React,{useEffect,useState}from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Button} from 'react-native';
import {firebase,db} from '../../utils/firebase'
import {Formik} from "formik";
import * as Yup from "yup";
const PLACEHOLDER_IMG='https://img.icons8.com/glyph-neue/344/ffffff/add-image.png'

const postFooterIcons=[
    {
        name:'Like',
        imageUrl:'https://img.icons8.com/material-outlined/96/666666/filled-like.png',
        LikeImageUrl:'https://img.icons8.com/material/96/666666/filled-like--v1.png'
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

const Body = ({post,index}) => {

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

    return(
        <View style={{marginBottom:30}}>
            {/* <Divider width={1} orientation='vertical'/> */}
            <PostHeader post={post}/>
            <PostImage post={post}/>
            <View style={{marginHorizontal:15,marginTop:10}}>
                <PostFooter post={post} handlerLike={handleLike}/>
                <Likes post={post}/>
                <Caption post={post}/>
                <Text style={{fontWeight:"bold"}}>
                    Comments
                </Text>
                <Comments post={post}/>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text></Text>
            </View>
        </View>
    )
}

const PostHeader = ({post}) => (
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
        <View>
            <Text style={{color:'black',fontWeight:'900',marginRight:5}}>...</Text>
        </View>
    </View>
)

const PostImage =({post}) => (
    <View style={{
        width:'100%',
        height:450,
    }}
    >
        <Image
            source={{uri:post.imageUrl}}
            style={{height:'100%',resizeMode:'cover'}}
        />
    </View>
)

const PostFooter= ({handlerLike,post}) =>(
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
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imageUrl}/>
        </View>

        <View>
            <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl}/>
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
            {post.likes_by_users.length.toLocaleString('en')} likes
        </Text>
    </View>
)

const Caption = ({post}) => (
    <View style={{marginTop:5}}>
        <Text style={{color:'black',fontWeight:'bold'}}>
            {post.caption}
        </Text>
        <Text> </Text>
    </View>
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

export default Body
