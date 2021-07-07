import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import Colors from '../colors/colors';
import { connect } from 'react-redux';
import { getInterests } from '../redux/actions/interest.actions';
import { getNewsCategories } from '../redux/actions/news-categories.actions';

const SplashScreen = ({getInterests, getNewsCategories }) => {
    useEffect(() => {
        getInterests();
        getNewsCategories();
    }, [])
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

const mapDispatchToProps = dispatch => ({
    getInterests: () => dispatch(getInterests()),
    getNewsCategories: () => dispatch(getNewsCategories())
})

export default connect(null, mapDispatchToProps)(SplashScreen);