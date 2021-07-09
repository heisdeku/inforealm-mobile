import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { SafeAreaView, ScrollView, TextInput, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../colors/colors';
import { emailSignUp } from '../redux/operations/user.op';

const LoginScreen = ({navigation}) => { 
    const dispatch = useDispatch()
    const [ name, setName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegistration = async () => {
        let userData = new FormData()

        userData.append('firstname', name)
        userData.append('lastname', lastName)
        userData.append('email', email)
        userData.append('password', password)
        
        const response = await dispatch(emailSignUp(userData))  

        if (response.status !== 'success') {
            navigation.navigate('Login');
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
                    placeholder='Enter your First name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setName(text)}
                    value={name}
                    underlineColorAndroid="transparent"                    
                    />
                    <TextInput
                    style={styles.input}
                    placeholder='Enter your Last name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setLastName(text)}
                    value={lastName}
                    underlineColorAndroid="transparent"                    
                    />
                    <TextInput
                    style={styles.input}
                    placeholder='Enter your e-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
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
                        <Text style={styles.footerViewText}>Created an Acccount?  {``}
                            <Text onPress={() => navigation.navigate('Login')} style={styles.footerLink}>Login
                            </Text>
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleRegistration} style={{width: '100%'}}>
                    <View style={{...styles.onboardButton, borderColor: Colors.secondary, backgroundColor: Colors.secondary}}>
                        <Text
                          style={{...styles.buttonText, color: '#fff'}}
                        >
                          Register
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
        height: 139,
        resizeMode: 'contain',
        marginVertical: 8
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
        marginTop: 15,
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
