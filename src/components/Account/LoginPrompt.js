import React from 'react'

import { StyleSheet, View, TouchableHighlight, Image, Text, } from 'react-native'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const LoginPrompt = () => {
    const navigation = useNavigation()
    return (     
        <TouchableHighlight style={{ marginTop: 16, }} activeOpacity={0.8} onPress={() => 
            navigation.navigate('OnboardingStack', {
              screen: 'Onboarding',              
            })            
          }>
            <View style={styles.container}>
            <MaterialIcons name="info-outline" size={25} color="#f7f7f7" />
            <View style={styles.promptBoxMain}>
                <View style={styles.promptBoxText}>
                    <Text style={styles.promptBoxHeading}>Sign in <AntDesign name="right" size={12} color="#f7f7f7" /></Text>
                    <Text style={styles.promptBoxMainText}>Get access to unlimited features and also help us personalize your experience.</Text>
                </View>                
                    <Text style={{ fontSize: 28, alignSelf: 'center', paddingHorizontal: 15 }}>🦊</Text>                
            </View>
            </View> 
        </TouchableHighlight>   
                         
    )
}

const styles = StyleSheet.create({  
    container: {
        flex: 1,                
        flexDirection: 'row',
        padding: 16, 
        alignItems: 'baseline',        
        backgroundColor: '#050618',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowRadius: 20,
        shadowOffset: {
            width: 0,
            height: -3
        },        
    },
    promptBoxMain: {
        marginLeft: 9,
        flexDirection: 'row',
        width: '100%'
    },
    promptBoxText: {
        paddingHorizontal: 5,
        width: '80%',
        borderRightColor: '#cdcccc',
        borderRightWidth: 1,
    },
    promptBoxHeading: {
        fontFamily: 'DMRegular',
        fontSize: 16,
        color: 'white',
        fontWeight: '700',
        lineHeight: 36,
        letterSpacing: -0.40,
        textTransform: 'capitalize'
    },
    promptBoxMainText: {        
        fontFamily: 'DMRegular',
        fontSize: 14,
        color: 'white',        
        lineHeight: 21,
        letterSpacing: -0.40,  
        marginBottom: 16,      
    }
})