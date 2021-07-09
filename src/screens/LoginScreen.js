import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { SafeAreaView, TextInput, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../colors/colors';
import { emailLogin } from '../redux/operations/user.op';

const LoginScreen = ({navigation}) => { 
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {           
        let userData = new FormData()
        userData.append('email', email)
        userData.append('password', password)
        const response = await dispatch(emailLogin(userData))

        if (response.user_id !== null) {
            navigation.navigate('MainStack');
            navigation.reset({
                index: 0,
                routes: [{
                    name: 'MainStack'
                }]
            })
        }
    }
    return (        
            <SafeAreaView style={{ flex: 1 }}>
                 <View style={styles.container}>
                {/*<Image style={styles.logo} source={require('../../assets/images/inforealm-blue.png')} />*/}
                <Text style={styles.heading}>Stay up to date with insightful news and trends</Text>
                <Image style={styles.pana} source={require('../../assets/images/pana.png')} />
                <View style={{ width: '100%'}}>                                                       
                    <TextInput
                    style={styles.input}
                    placeholder='Enter your e-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    />                                        
                    <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Enter your password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    />                    
                    <View style={styles.footerView}>
                        <Text style={styles.footerViewText}>Don't have an account? {`  `}
                            <Text onPress={() => navigation.navigate('Register')} style={styles.footerLink}>Register
                            </Text>
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleLogin} style={{width: '100%'}}>
                    <View style={{...styles.onboardButton, borderColor: Colors.secondary, backgroundColor: Colors.secondary}}>
                        <Text
                          style={{...styles.buttonText, color: '#fff'}}
                        >
                          Login
                        </Text>
                    </View>
                </TouchableOpacity>               
                <TouchableOpacity
                  style={{width: '100%'}}
                  onPress={() => {
                    //   navigation.reset([NavigationActions.navigate({ routeName: 'MainOne' })], 0)
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
            </View>
           
            </SafeAreaView>                    
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 35,
        backgroundColor: '#F7F7F7'
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
        marginVertical: 28
    },
    input: {
        height: 48,
        width: '100%',        
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        fontSize: 16,
        backgroundColor: 'transparent',
        borderBottomColor: '#cdcccc',
        borderBottomWidth: 1.25,        
        marginBottom: 10,                
        paddingLeft: 16
    },
    footerView: {             
        marginVertical: 25,
        fontSize: 14
    },
    footerViewText: {
        fontSize: 16,          
        color: '#2e2e2d',        
    },
    footerLink: {             
        color: "#e33127",
        fontWeight: "bold",
        fontSize: 16
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
