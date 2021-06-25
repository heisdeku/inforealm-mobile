import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../colors/colors';

const OnboardingScreen = ({navigation}) => {    
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../../assets/images/inforealm-blue.png')} />
                <Text style={styles.heading}>Stay up to date with insightful news and trends</Text>
                <Image style={styles.pana} source={require('../../assets/images/pana.png')} />
                <TouchableOpacity style={{width: '100%'}}>
                    <View style={{...styles.onboardButton, borderColor: Colors.secondary, backgroundColor: Colors.secondary}}>
                        <Text
                          style={{...styles.buttonText, color: '#fff'}}
                        >
                          <FontAwesome name="envelope" size={16} color='#fff' /> Continue with Email
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '100%'}}>
                    <View style={{...styles.onboardButton, borderColor: '#3B5999', backgroundColor: '#3B5999'}}>
                        <Text style={{...styles.buttonText, color: '#fff'}}><FontAwesome name="facebook-square" size={16} color='#fff' /> Continue with Facebook</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '100%'}}>
                    <View style={{...styles.onboardButton}}>
                        <Text style={{...styles.buttonText, color: '#000'}}><FontAwesome name="google" size={16} color='#000' /> Continue with Google</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{width: '100%'}}>
                    <View style={{...styles.onboardButton}}>
                        <Text style={{...styles.buttonText, color: '#000'}}><FontAwesome name="apple" size={16} color='#2B2D42' /> Continue with Apple</Text>
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
