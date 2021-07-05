import React from 'react'
import { TouchableOpacity, StyleSheet, Image, View, Text, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

export const AccountUpdateNavigation = ({ goBackEvt, title, saveActive }) => {    
    return (
        <View style={styles.container}>
            <TouchableOpacity
            onPress={goBackEvt}
                style={{marginTop: 20, marginBottom: 15}}
            >
                <AntDesign name='arrowleft' color='black' size={24} />
            </TouchableOpacity>        
            {
                saveActive && <Text style={styles.navigationSave}>Save</Text> 
            }                                                   
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 65,
        paddingHorizontal: 17,
        backgroundColor: '#FFFFFF', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'       
    },
    navigationSave: {        
        color: '#000000',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        marginTop: 20,
        letterSpacing: -0.4,
        marginBottom: 16,        
    },
})