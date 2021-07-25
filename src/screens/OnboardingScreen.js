import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SafeAreaView, ActivityIndicator, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../colors/colors';

import { facebookLogIn, googleSignIn } from '../redux/operations/user.op';
import { checkAuthMethod, getCurrentUser, isLoading } from '../redux/selectors/user.selector';


const OnboardingScreen = ({navigation}) => {    
    const dispatch = useDispatch()
    const loading = useSelector(isLoading)
    const authType = useSelector(checkAuthMethod
        )
    const user = useSelector(getCurrentUser)    
    const handleGoogleSignIn = async () => {
       const response = await dispatch(googleSignIn())
        if (response.error) {            
            Alert.alert(response.error)
        } 
        else if (response.user_id !== null) {
            navigation.navigate('MainStack');
            navigation.reset({
                index: 0,
                routes: [{
                    name: 'MainStack'
                }]
            })
        } else {
            return;
        }
    }

    const handleFacebookSignIn = async () => {
        const response = await dispatch(facebookLogIn())
        
        if (response.error) {            
            Alert.alert(response.error)
        } 
        else if (response.user_id !== null) {
            navigation.navigate('MainStack');
            navigation.reset({
                index: 0,
                routes: [{
                    name: 'MainStack'
                }]
            })
        } else {
            return;
        }
    }

    const handleAppleSignIn = () => {
        Alert.alert('Coming Soon', 'Kindly Relax as our Engineers are bringing this feature soon, Use our other authentication methods')
    }
    return (        
            <SafeAreaView style={{flex: 1, backgroundColor: '#F7F7F7'}}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <Image style={styles.logo} source={require('../../assets/images/inforealm-blue.png')} />
                        <Text style={styles.heading}>Stay up to date with insightful news and trends</Text>
                        <Image style={styles.pana} source={require('../../assets/images/pana.png')} />
                        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{width: '100%'}}>
                            <View style={{...styles.onboardButton, borderColor: Colors.secondary, backgroundColor: Colors.secondary}}>
                                <Text
                                style={{...styles.buttonText, color: '#fff'}}
                                >
                                <FontAwesome name="envelope" size={16} color='#fff' /> Continue with Email
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleFacebookSignIn} style={{width: '100%'}}>
                            <View style={{...styles.onboardButton, borderColor: '#3B5999', backgroundColor: '#3B5999'}}>
                                {
                                    loading && authType === 'social-facebook' ? <ActivityIndicator size="large" color="#fff" /> : <Text style={{...styles.buttonText, color: '#fff'}}><FontAwesome name="facebook-square" size={16} color='#fff' /> Continue with Facebook</Text>
                                }                                
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleGoogleSignIn} style={{width: '100%'}}>
                            <View style={{...styles.onboardButton}}>
                                {
                                    loading && authType === 'social-google' ?<ActivityIndicator size="large" color="#000" /> : 
                                    <Text style={{...styles.buttonText, color: '#000'}}>
                                        <FontAwesome name="google" size={16} color='#000' /> Continue with Google
                                    </Text>
                                }
                                
                            </View>
                        </TouchableOpacity>
                        { Platform.OS === 'ios' &&  
                            <TouchableOpacity onPress={handleAppleSignIn} style={{width: '100%'}}>
                                <View style={{...styles.onboardButton}}>
                                    <Text style={{...styles.buttonText, color: '#000'}}><FontAwesome name="apple" size={16} color='#2B2D42' /> Continue with Apple</Text>
                                </View>
                            </TouchableOpacity>}                
                        <TouchableOpacity
                        style={{width: '100%'}}
                        onPress={() => {
                            navigation.navigate('MainStack');
                            navigation.reset({
                                index: 0,
                                routes: [{
                                    name: 'MainStack'
                                }]
                            })
                            }}
                        >
                        <View
                            style={{...styles.onboardButton, borderColor: '#F7F7F7'}}
                        >
                            <Text
                            style={{...styles.buttonText, color: '#000', fontFamily: 'DMBold'}}
                            >
                            Skip for now
                            <FontAwesome name="chevron-right" size={12} color='#2B2D42' />
                            </Text>
                        </View>
                        </TouchableOpacity>
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                By signing up, you accept to our
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Terms')}><Text style={{...styles.footerText, textDecorationLine: 'underline'}}>Terms of Sevices</Text></TouchableOpacity>
                            <Text style={styles.footerText}> & </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Privacy')}><Text style={{...styles.footerText, textDecorationLine: 'underline'}}>Privacy Policy</Text></TouchableOpacity>
                        </View>
                    </View>           
                </ScrollView>   
            </SafeAreaView>                 
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 35,
        backgroundColor: '#F7F7F7'
    },
    logo: {
        height: 61,
        resizeMode: 'contain'
    },
    heading: {
        fontSize: 22,
        fontFamily: 'DMBold',
        textAlign: 'center',
        marginTop: 11,
        width: '80%',
        textTransform: 'capitalize'
    },
    pana: {
        height: 159,
        resizeMode: 'contain',
        marginVertical: 38
    },
    onboardButton: {
        height: 50,
        width: '100%',
        borderRadius: 4,
        borderWidth: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    },
    buttonText: {
        fontSize: 14,
        fontFamily: 'DMRegular'
    },
    footer: {
        marginTop: 65,
        marginBottom: 60,
        flexDirection: 'row',
        width: 195,
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    footerText: {
        fontSize: 12,
        fontFamily: 'DMRegular',
        textAlign: 'center'
    }
})
