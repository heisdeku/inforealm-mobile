import React from 'react'

import { StyleSheet, View, TouchableOpacity, Dimensions, Text, } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

export const ManageNotifications = ({ navigation }) => {
    return (
        <View style={styles.container}>
           <Text style={styles.containerTitle}>Notification Settings</Text>
           <View style={styles.settingsBox}> 
                <TouchableOpacity onPress={() => navigation.navigate('AccountNotification')}>
                    <View style={styles.settings}>
                    <Text style={styles.settingText}>Manage Notifications</Text>
                    <TouchableOpacity>
                        <AntDesign name="right" size={12} color="#2B2D42" />
                        </TouchableOpacity>
                </View>
                </TouchableOpacity> 
           </View>
        </View>
    )
}

const styles = StyleSheet.create({  
    container: {    
        marginTop: 24, 
        marginBottom: 25,   
        paddingLeft: 17,
        width: (Dimensions.get('window').width) - 10,
    },
    containerTitle: {
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 24,
        color: '#2b2d42',
        letterSpacing: -0.4,
        marginBottom: 12,
    },
    settingsBox: {
        flex: 1,                        
        backgroundColor: '#FFFFFF',
        width: (Dimensions.get('window').width) - 35,
        borderColor: '#cdcccc',
        paddingLeft: 16,
        paddingRight: 25,        
        borderRadius: 8,
    },
    settings: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',                
        paddingVertical: 17,        
    },
    settingText: {
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: -0.4,
        color: '#2b2d42',        
    }
})