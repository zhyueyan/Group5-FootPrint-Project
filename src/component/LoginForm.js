/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React,{useState} from 'react'
import {View, Text, TextInput, Button, StyleSheet, Pressable, TouchableOpacity,Alert} from 'react-native'
import {firebase,db} from '../utils/firebase'
import {Formik} from "formik";
import * as Yup from 'yup'
import Validator from 'email-validator'

const LoginForm = ({navigation}) =>{
    const LoginFormSchema = Yup.object().shape({
        email:Yup.string().email().required('请填入邮箱'),
        password:Yup.string()
            .required()
            .min(6,'密码至少为六位字符'),
    })

    const onLogin=async (email,password)=>{
        try{
            await firebase.auth().signInWithEmailAndPassword(email,password)
            console.log('Firebase Login Successful',email,password)
        }catch(error){
            Alert.alert(
                '提示',
                error.message+'\n\n... What would you like to do next',
                [
                    {
                        text:'好的',
                        onPress:()=>console.log('OK'),
                        style:'cancel',
                    },
                    {text:'注册',onPress:()=>navigation.push('SignupScreen')}
                ]
            )
        }
    }

    return(
        <View style={styles.wrapper}>
            <Formik
                initialValues={{email:'',password:''}}
                onSubmit={values=>{
                    onLogin(values.email,values.password)
                }}
                validationSchema={LoginFormSchema}
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
                            }
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
                                    1>values.password.length||values.password.length>=6
                                        ?'#ccc'
                                        :'red',
                            }
                        ]}>
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='密码'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={true}
                                textContentType='password'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>
                        <View style={{alignItems: 'flex-end',marginBottom: 30}}>
                            <Text style={{color:'#A9A9A9'}}>忘记密码？</Text>
                        </View>
                        <Pressable
                            titleSize={20}
                            style={styles.button(isValid)}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            <Text style={styles.buttonText}>登录</Text>
                        </Pressable>

                        <View style={styles.signupContainer}>
                            <Text>还没有账户？</Text>
                            <TouchableOpacity onPress={()=>navigation.push('SignupScreen')}>
                                <Text style={{color:'#A9A9A9'}}>注册</Text>
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

        signupContainer:
            {
                flexDirection:'row',
                width:'100%',
                justifyContent:'center',
                marginTop:50
            }
    }
)

export default LoginForm
