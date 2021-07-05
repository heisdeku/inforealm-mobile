import React from 'react'

import { StyleSheet, View, TouchableOpacity, Dimensions, Text, } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

export const AccountSettings = ({ navigation }) => {
    return (
        <View style={styles.container}>
           <Text style={styles.containerTitle}>Account Settings</Text>
           <View style={styles.settingsBox}>
               <TouchableOpacity onPress={() => navigation.navigate('AccountEmailUpdate')}>
                <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#cdcccc', ...styles.settings}}>
                    <Text style={styles.settingText}>Update email address</Text>
                    <TouchableOpacity>
                        <AntDesign name="right" size={12} color="#2B2D42" />
                        </TouchableOpacity>
                </View>
                </TouchableOpacity>  
                <TouchableOpacity onPress={() => navigation.navigate('AccountPasswordUpdate')}>
                    <View style={styles.settings}>
                    <Text style={styles.settingText}>Change Password</Text>
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