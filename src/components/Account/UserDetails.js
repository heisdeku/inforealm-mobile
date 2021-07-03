import React from 'react'

import { StyleSheet, View, TouchableOpacity, Image, Text, } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const UserDetails = () => {
    return (
        <View style={styles.container}>
            <View style={styles.updatePhotoContainer}>
                <View style={styles.emptyPhoto}>
                    <MaterialCommunityIcons name="account" size={26} color="#6C757D" />
                </View>
                <TouchableOpacity style={styles.updatePhotoButtonNull}>
                    <Text style={styles.updatePhotoButtonNullText}>Update Your Photo</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10, }}> 
                <Text style={styles.accountName}>Unknown</Text> 
                <Text style={styles.accountEmail}>Your email address</Text>               
            </View>
        </View>
    )
}

const styles = StyleSheet.create({  
    container: {
        flex: 1,
        paddingLeft: 17,
    },
    updatePhotoContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '52%'
    },  
    emptyPhoto: {
        backgroundColor: 'rgba(196, 196, 196, 0.4)',
        borderRadius: 50,
        width: 56,
        height: 56,        
        justifyContent: 'center',
        alignItems: 'center',
    },
    updatePhotoButtonNull: {  
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',     
        textAlign: 'center',
        width: '100%',
        width: 125,
        height: 35,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 28
    },
    updatePhotoButtonNullText: {        
        fontSize: 12,
        lineHeight: 18,
        color: '#BDBDBD'
    },
    accountName: {
        fontFamily: 'DMSerif',
        fontSize: 36,
        lineHeight: 40,
        color: '#2B2D42'
    },
    accountEmail: {
        fontSize: 13,
        lineHeight: 17,
        color: '#2B2D42',
    }
})