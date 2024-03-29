import React from 'react'
import { TouchableOpacity, StyleSheet, Image, Platform, View, Text, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

export const AccountNavigation = ({ goBackEvt, title, type }) => {    
    return (
        <View style={styles.container}>
            <TouchableOpacity
            onPress={goBackEvt}
                style={{marginTop: Platform.OS === 'ios' ? 30 : 20, marginBottom: 15}}
            >
                <AntDesign name='arrowleft' color='black' size={24} />
            </TouchableOpacity>
            {
                type === 'image' ? 
                <Image
                    source={require('../../assets/images/inforealm-blue.png')}
                    style={{ height: 70, resizeMode: 'contain', width: '80%', marginLeft: 1, marginRight: 'auto' }}
                />  : 
                <Text style={styles.navigationHeader}>{title}</Text> 
            }                       
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 65,
        paddingLeft: 17,
        backgroundColor: '#FFFFFF', 
        flexDirection: 'row',
        alignItems: 'center'       
    },
    navigationHeader: {
        fontFamily: 'DMSerif',
        fontSize: 30,
        lineHeight: 40,
        marginTop: 10,
        marginBottom: 16,
    },
})