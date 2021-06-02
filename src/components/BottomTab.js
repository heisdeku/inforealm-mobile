import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, Animated, TouchableHighlight, TouchableOpacity } from 'react-native';
import AnimatedMoreButton from './AnimatedMoreButton';
import { FontAwesome5, FontAwesome, Feather } from '@expo/vector-icons';
import Colors from '../colors/colors';

const BottomTab = (props) => {
    const [morePressed, setMorePressed] = useState(false)
    const { navigation } = props;
    // const [mode, setMode] = useState(0);

    const mode = new Animated.Value(0);

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(mode, {
                toValue: mode._value === 0 ? 1 : 0,
                useNativeDriver: false,
                timing: 3000
            })
        ]).start();
    }

    const handleClose = () => {
        Animated.sequence([
            Animated.timing(mode, {
                toValue: 0,
                useNativeDriver: false,
                timing: 3000
            })
        ]).start();
    }
    useEffect(() => {
        Animated.sequence([
            Animated.timing(mode, {
                toValue: morePressed ? 1 : 0,
                useNativeDriver: false,
                timing: 3000
            })
        ]).start()
    }, [morePressed])

    const closeBtnAnimation = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [15, 40]
    });

    const bookmarkBtnAnimationY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [10, 30]
    });

    const bookmarkBtnAnimationX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 110]
    });

    const audioBtnAnimation = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [40, 150]
    });

    const downloadBtnAnimationY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 105]
    });

    const downloadBtnAnimationX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 85]
    });

    const closeBtnOpacity = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });

    const componentHeight = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [70, Dimensions.get('window').height]
    })

    return (
        <Animated.View style={{height: componentHeight, backgroundColor: 'transparent'}}>
            <View style={{flex: 1}}>
                {/* <TouchableOpacity><Text>Some very long text so it seems that there's something here</Text></TouchableOpacity> */}
                <Animated.View style={{opacity: closeBtnOpacity, position: 'absolute', bottom: audioBtnAnimation, right: 15}}>
                    <TouchableOpacity onPress={() => {
                        setMorePressed(false);
                        navigation.navigate('Glance')
                    }}>
                        <View style={styles.actionBtn}>
                            <Feather name='headphones' size={20} color='#fff' />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={{opacity: closeBtnOpacity, position: 'absolute', bottom: downloadBtnAnimationY, right: downloadBtnAnimationX}}>
                    <TouchableOpacity onPress={() => {
                        setMorePressed(false);
                        navigation.navigate('Downloads')
                    }}>
                        <View style={styles.actionBtn}>
                            <Feather name='download-cloud' size={20} color='#fff' />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={{opacity: closeBtnOpacity, position: 'absolute', bottom: bookmarkBtnAnimationY, right: bookmarkBtnAnimationX}}>
                    <TouchableOpacity onPress={() => {
                        setMorePressed(false);
                        navigation.navigate('Bookmarks');
                    }}>
                        <View style={styles.actionBtn}>
                            <Feather name='bookmark' size={20} color='#fff' />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={{opacity: closeBtnOpacity, position: 'absolute', bottom: closeBtnAnimation, right: 15}}>
                    <TouchableOpacity onPress={() => handleClose()}>
                        <View style={styles.closeBtn}>
                            <FontAwesome name='close' size={20} color={Colors.secondary} />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
            <View style={styles.tabBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Reader')}>
                    <View style={styles.tab}>
                        <FontAwesome5 name='book-reader'  color={navigation.state.index === 0 && !morePressed ? Colors.secondary : '#B3B3B3'} size={20} />
                        <Text style={{...styles.tabLabel, color: navigation.state.index === 0 && !morePressed ? Colors.secondary : '#B3B3B3'}}>Reader</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Documentaries')}>
                    <View style={styles.tab}>
                        <FontAwesome name='video-camera'  color={navigation.state.index === 1 && !morePressed ? Colors.secondary : '#B3B3B3'} size={20} />
                        <Text style={{...styles.tabLabel, color: navigation.state.index === 1 && !morePressed ? Colors.secondary : '#B3B3B3'}}>Documentaries</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('News')}>
                    <View style={styles.tab}>
                        <FontAwesome name='newspaper-o'  color={navigation.state.index === 2 && !morePressed ? Colors.secondary : '#B3B3B3'} size={20} />
                        <Text style={{...styles.tabLabel, color: navigation.state.index === 2 && !morePressed ? Colors.secondary : '#B3B3B3'}}>News</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={() => setMorePressed(!morePressed)} onPress={() => handlePress()}>
                    <View style={styles.tab}>
                        {/* <AnimatedMoreButton /> */}
                        <FontAwesome name='bars'  color={ morePressed ? Colors.secondary : '#B3B3B3'} size={20} />
                        <Text style={{...styles.tabLabel, color: morePressed ? Colors.secondary : '#B3B3B3'}}>More</Text>
                    </View>
                </TouchableOpacity>
                {/* <View><TouchableOpacity onPress={(() => console.log('pressed'))} ><Text>22</Text></TouchableOpacity></View> */}
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        height: '100%',
        width: '100%',
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderColor: '#cdcccc',
        borderWidth: 0.5,
        justifyContent: 'space-between',
        paddingBottom: 20,
        alignItems: 'center',
        height: 70,
        paddingTop: 10,
        backgroundColor: '#fff',
    },
    tab: {
        width:( Dimensions.get('window').width - 20 )/ 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabLabel: {
        fontSize: 10,
        color: '#B3B3B3',
        marginTop: 5,
        fontFamily: 'DMRegular',
        fontWeight: '500'
    },
    closeBtn: {
        height: 50,
        width: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 0.3,
        borderColor: Colors.secondary,
        // position: 'absolute',
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
        // position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default BottomTab;
