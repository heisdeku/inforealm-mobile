import React from 'react'
import { TouchableOpacity, StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons';

export const ReaderNavigation = ({ visitProfile, visitSearch }) => {    
    return (
        <View style={styles.container}>                    
            <View style={styles.mainNavigation}>   
                <TouchableOpacity onPress={visitProfile}>
                    <Image
                    source={require('../../../assets/images/header-profile.png')}
                    style={{ height: 27, width: 27, resizeMode: 'contain' }}
                    />
                </TouchableOpacity>                 
                    <Image
                        source={require('../../../assets/images/inforealm-blue.png')}
                        style={{ height: 24, marginLeft: 'auto', marginRight: 'auto' }}
                    /> 
                <TouchableOpacity onPress={visitSearch}>
                    <Feather name='search' size={24} />
                </TouchableOpacity> 
            </View>  
            <View> 
                <Text style={styles.readerScreenTitle}>Reader</Text> 
                <Text style={styles.userName}>Welcome Sensei</Text>               
            </View>            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 150,
        paddingHorizontal: 17,        
        backgroundColor: '#FFFFFF',        
    },
    mainNavigation: {
        flexDirection: 'row',         
        marginTop: 30,
        alignItems: 'center',    
        justifyContent: 'space-between'
    },
    readerScreenTitle: {
        marginTop: 20,
        fontFamily: 'DMSerif',
        fontSize: 30,  
        lineHeight: 40,
        color: '#000000'
    },
    userName: {
        marginTop: 3,
        fontSize: 13,
        lineHeight: 17,
        color: '#000000'
    }
})