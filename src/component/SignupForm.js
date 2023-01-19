/* eslint-disable prettier/prettier */
/* eslint-disable space-infix-ops */
import React,{useState} from 'react'
import {View, Text, TextInput, Button, StyleSheet, Pressable, TouchableOpacity, Alert} from 'react-native'
import {Formik} from "formik";
import * as Yup from 'yup'
import Validator from 'email-validator'
import {firebase,db} from '../utils/firebase'

const SignupForm = ({navigation}) =>{
    const SignupFormSchema = Yup.object().shape({
        email:Yup.string().email().required('请输入邮箱'),
        password:Yup.string()
            .required()
            .min(6,'密码至少为六位字符'),
    })

    const getRandomProfilePicture =async ()=>{
        const response=await fetch('https://randomuser.me/api')
        const data=await response.json()
        return data.results[0].picture.large
    }

    const onSignup=async (email,password,username)=> {
        try{
            const authUser=await firebase.auth().createUserWithEmailAndPassword(email,password)
            console.log('Firebase User Created Successful',email,password)

            db.collection('users').doc(authUser.user.email).set({
                owner_uid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: await getRandomProfilePicture(),
            })
        }catch (error){
            Alert.alert('提示',error.message)
        }
    }

    return(
        <View style={styles.wrapper}>
            <Formik
                initialValues={{email:'',password:'',username:''}}
                onSubmit={values=>{
                    onSignup(values.email,values.password,values.username)
                }}
                validationSchema={SignupFormSchema}
                validateOnMount={true}
            >
                {({handleChange,handleBlur,handleSubmit,values,isValid})=>(
                    <>
                        <View style={[
                            styles.inputField,
                            {
                                borderColor:
                                    values.email.length<1||Validator.validate(values.email)
                                        ?'#ccc'
                                        :'red',
                            },
                        ]}>
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='邮箱'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                autoFocus={true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>

                        <View style={[
                            styles.inputField,
                            {
                                borderColor:
                                    1>values.username.length||values.username.length>=6
                                        ?'#ccc'
                                        :'red',
                            }
                        ]}>
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='昵称'
                                autoCapitalize='none'
                                textContentType='username'
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                        </View>

                        <View style={[
                            styles.inputField,
                            {
                                borderColor:
                                    1>values.password.length||values.password.length>=6
                                        ?'#ccc'
                                        :'red',
                            }
                        ]}>
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='密码'
                                autoCapitalize='none'
                                secureTextEntry={true}
                                textContentType='password'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>

                        <Pressable
                            titleSize={20}
                            style={styles.button(isValid)}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonText}>注册</Text>
                        </Pressable>

                        <View style={styles.loginContainer}>
                            <Text>已经有账户了吗？</Text>
                            <TouchableOpacity onPress={()=>navigation.push('LoginScreen')}>
                                <Text style={{color:'#A9A9A9'}}>登录</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}

const styles=StyleSheet.create(
    {
        wrapper:
            {
                marginTop:80
            },

        inputField:
            {
                borderRadius:4,
                padding:6,
                backgroundColor:'#FAFAFA',
                marginBottom:10,
                borderWidth:1,
                justifyContent:'center'
            },

        button:(isValid)=>(
            {
                backgroundColor:isValid?'#A9A9A9':'#808080',
                alignItems:'center',
                justifyContent:'center',
                minHeight:42,
                borderRadius:4
            }),

        buttonText:
            {
                fontWeight:'600',
                color:'#fff',
                fontSize:20
            },

        loginContainer:
            {
                flexDirection:'row',
                width:'100%',
                justifyContent:'center',
                marginTop:50
            }
    }
)

export default SignupForm
