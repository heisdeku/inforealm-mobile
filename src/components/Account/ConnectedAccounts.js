import React from 'react'

import { StyleSheet, View, TouchableOpacity, Dimensions, Text, Platform, Image } from 'react-native'

export const ConnectedAccounts = () => {
    return (
        <View style={styles.container}>
           <Text style={styles.containerTitle}>Connected Accounts</Text>
           <View style={styles.settingsBox}>
               <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#cdcccc', ...styles.settings}}>
                   <View style={{ flexDirection: 'row'}}>
                        <Image
                            source={require('../../../assets/images/google-icon.png')}    
                            style={{
                                height: 16,
                                width: 16,
                                marginRight: 8,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}                      
                        /> 
                    <Text style={styles.settingText}>Google</Text>   
                    </View>               
                   <TouchableOpacity>
                   <Text>Connect</Text>
                    </TouchableOpacity>
               </View>
               { Platform.OS === 'android' && <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#cdcccc', ...styles.settings}}>
                   <View style={{ flexDirection: 'row'}}>
                        <Image
                            source={require('../../../assets/images/apple-icon.png')}    
                            style={{
                                height: 16,
                                width: 16,
                                marginRight: 8,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}                      
                        /> 
                    <Text style={styles.settingText}>Apple</Text>   
                    </View>               
                   <TouchableOpacity>
                   <Text>Connect</Text>
                    </TouchableOpacity>
               </View>}
               <View style={styles.settings}>
                   <View style={{ flexDirection: 'row'}}>
                        <Image
                            source={require('../../../assets/images/facebook-icon.png')}   
                            style={{
                                height: 16,
                                width: 16,
                                marginRight: 8
                            }}                         
                        /> 
                        <Text style={styles.settingText}>Facebook</Text>   
                    </View>                   
                   <TouchableOpacity>
                       <Text>Connect</Text>
                    </TouchableOpacity>
               </View>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({  
    container: {     
        marginTop: 24,   
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
        marginLeft: 8,
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