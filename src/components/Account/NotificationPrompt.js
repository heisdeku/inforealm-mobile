import React from 'react'

import { StyleSheet, View, TouchableOpacity, Dimensions, Image, Text, } from 'react-native'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

export const NotificationPrompt = ({ setEvt }) => {
    return (      
        <TouchableOpacity onPress={() => setEvt(true)}>
            <View style={styles.container}>
                <MaterialIcons name="info-outline" size={25} color="#f7f7f7" />
                <View style={styles.promptBoxMain}>
                    <View style={styles.promptBoxText}>
                        <Text style={styles.promptBoxHeading}>Enable Notification Settings<AntDesign name="right" size={12} color="#f7f7f7" /></Text>
                        <Text style={styles.promptBoxMainText}>We recommend that you turn on your notifications to never miss an update. </Text>
                    </View>                
                    <Text style={{ fontSize: 28, alignSelf: 'center', paddingHorizontal: 15 }}>🦊</Text>                
                </View>
            </View> 
        </TouchableOpacity>                   
    )
}

const styles = StyleSheet.create({  
    container: {
        flex: 1,        
        marginBottom: 32,
        flexDirection: 'row',
        padding: 16, 
        width: Dimensions.get('window').width,
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
        width: '75%',
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