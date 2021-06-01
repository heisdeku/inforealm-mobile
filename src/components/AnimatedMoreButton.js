import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Animated, TouchableOpacity } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import Colors from '../colors/colors';

const AnimatedMoreButton = ({focused}) => {
    const handlePress = () => {
        Animated.sequence([
            Animated.timing(mode, {
                toValue: mode._value === 0 ? 1 : 0,
                useNativeDriver: false
            })
        ]).start();
    }

    const handleClose = () => {
        Animated.sequence([
            Animated.timing(mode.interpolate, {
                toValue: mode._value === 1 ? 0 : 1,
                useNativeDriver: false
            })
        ]).start()
    }
    
    const mode = new Animated.Value(0);

    const closeBtnAnimation = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-24, -100]
    });

    const bookmarkBtnAnimationY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-15, -90]
    });

    const bookmarkBtnAnimationX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-30, -96]
    });

    const audioBtnAnimation = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-40, -200]
    });

    const downloadBtnAnimationY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-30, -155]
    });

    const downloadBtnAnimationX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-20, -70]
    });

    const closeBtnOpacity = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });

    return (
        <View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => console.log('pressed')}>
                <Animated.View style={{position: 'absolute', top: closeBtnAnimation, opacity: closeBtnOpacity, left: -15}}>
                    <View style={styles.closeBtn}>
                        <FontAwesome name='close' size={20} color={Colors.secondary} />
                    </View>
                </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity>
                <Animated.View style={{position: 'absolute', top: bookmarkBtnAnimationY, opacity: closeBtnOpacity, left: bookmarkBtnAnimationX, zIndex: 10}}>
                    <View style={styles.actionBtn}>
                        <Feather name='bookmark' size={20} color='#fff' />
                    </View>
                </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity>
                <Animated.View style={{position: 'absolute', top: downloadBtnAnimationY, opacity: closeBtnOpacity, left: downloadBtnAnimationX}}>
                    <View style={styles.actionBtn}>
                        <Feather name='download-cloud' size={20} color='#fff' />
                    </View>
                </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity>
                <Animated.View style={{position: 'absolute', top: audioBtnAnimation, opacity: closeBtnOpacity, left: -10}}>
                    <View style={styles.actionBtn}>
                        <Feather name='headphones' size={20} color='#fff' />
                    </View>
                </Animated.View>
            </TouchableOpacity>
            <TouchableHighlight onPress={handlePress}>
                <View>
                    <FontAwesome name='bars' size={26} color={focused ? Colors.secondary : '#B3B3B3'}/>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    closeBtn: {
        height: 50,
        width: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 0.3,
        borderColor: Colors.secondary,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionBtn: {
        height: 50,
        width: 50,
        backgroundColor: Colors.secondary,
        borderRadius: 25,
        borderWidth: 0.3,
        borderColor: Colors.secondary,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default AnimatedMoreButton;
