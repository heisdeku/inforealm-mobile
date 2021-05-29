import React from 'react'
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import Colors from '../colors/colors';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image 
            source={require('../../assets/images/inforealm-white.png')}
            style={styles.image}
            />
            <StatusBar barStyle='light-content' backgroundColor={Colors.brand} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.brand
    },
    image: {
        height: 144,
        resizeMode: 'contain'
    }
})

export default SplashScreen;