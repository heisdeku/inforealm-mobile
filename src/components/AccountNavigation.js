import React from 'react'
import { TouchableOpacity, StyleSheet, Image, View, Text, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

export const AccountNavigation = ({ goBackEvt, title, type }) => {    
    return (
        <View style={styles.container}>
            <TouchableOpacity
            onPress={goBackEvt}
                style={{marginTop: 20, marginBottom: 15}}
            >
                <AntDesign name='arrowleft' color='black' size={24} />
            </TouchableOpacity>
            {
                type === 'image' ? 
                <Image
                    source={require('../../assets/images/inforealm-blue.png')}
                    style={{ height: 24, marginLeft: 100, marginRight: 'auto', marginTop: 7 }}
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