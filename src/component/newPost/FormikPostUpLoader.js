/* eslint-disable prettier/prettier */
import React, { useState,useEffect} from 'react'
import {View, Text, TextInput, Image, Button} from 'react-native'
import * as Yup from "yup";
import {Formik} from 'formik'
//import {Divider} from "react-native-elements";
import validUrl from 'valid-url'
import {db,firebase} from '../../utils/firebase'

const PLACEHOLDER_IMG='https://img.icons8.com/glyph-neue/344/ffffff/add-image.png'

const uploadPostSchema = Yup.object().shape({
    caption:Yup.string().max(2200,'Caption has reached the character limit.')
})

const FormikPostUpLoader = ({navigation,trace}) => {
    const [thumbnailUrl, setThumbnailUrl] = useState('PLACEHOLDER_IMG')
    const [currentLoggedInUser,setCurrentLoggedInUser]=useState(null)
    const getUsername=()=>{
        const user=firebase.auth().currentUser
        const unsubscribe=db
            .collection('users')
            .where('owner_uid','==',user.uid).limit(1).onSnapshot(
                snapshot => snapshot.docs.map(doc=>{
                    setCurrentLoggedInUser({
                        username:doc.data().username,
                        profilePicture:doc.data().profile_picture
                    })
                })
            )
        return unsubscribe
    }

    useEffect(()=>{
        getUsername()
        //console.log(trace)
    },[])

    const uploadPostToFirebase=(imageUrl,caption)=>{
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
                comments:[],
                trace:trace
            })
            .then(()=>navigation.goBack())
        //const storageRef = firebase.storage().ref();
        
        return unsubscribe
    }

    return(
        <Formik
            initialValues={{caption:'',imageUrl:''}}
            onSubmit={values=>{
                uploadPostToFirebase(values.imageUrl,values.caption)
            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >
            {({handleBlur,handleChange,handleSubmit,values,errors,isValid})=>(
                <>
                    <View style={{margin:20,justifyContent:'space-between',flexDirection:'row'}}>
                        <Image
                            source={{uri:PLACEHOLDER_IMG}}
                            style={{width: 100,height:100}}
                        />

                        <View style={{flex:1,marginLeft:12}}>
                            <TextInput
                                style={{color:'grey',fontSize:15}}
                                placeholder='分享现在的心情 ...'
                                placeholderTextColor='grey'
                                multiline={true}
                                onChangeText={handleChange('caption')}
                                onBlur={handleBlur('caption')}
                                value={values.caption}
                            />
                        </View>
                    </View>
                    {/* <Divider width={0.2} orientation='vertical'/> */}

                    <Button onPress={handleSubmit} title='分享' disabled={!isValid} color={'grey'}/>
                </>
                )}
        </Formik>
    )
}

export default FormikPostUpLoader
