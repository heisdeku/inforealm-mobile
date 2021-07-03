import React from 'react'
import { TouchableOpacity, StyleSheet, View, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

export const ArticleNavigation = ({ goBackEvt }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
            onPress={goBackEvt}
                style={{marginLeft: 21, marginTop: 20, marginBottom: 15}}
            >
                <AntDesign name='arrowleft' color='black' size={24} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 65,
        backgroundColor: '#FFFFFF',        
    }
})