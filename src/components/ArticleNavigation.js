import React from 'react'
import { TouchableOpacity, StyleSheet, Plaform, View, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

export const ArticleNavigation = ({ goBackEvt }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
            onPress={goBackEvt}
                style={{marginLeft: 21, paddingTop: Platform.OS === 'ios' ? 40 : 20, marginBottom: 15}}
            >
                <AntDesign name='arrowleft' color='black' size={24} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        minHeight: 65,
        backgroundColor: '#FFFFFF',        
    }
})