import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AnimatedMoreButton from './AnimatedMoreButton';

const BottomTab = (props) => {
    console.log(props);
    return (
        <SafeAreaView style={{height: 70}}>
            <View style={styles.tabBar}>
                <View><Text>1</Text></View>
                <View><Text>1</Text></View>
                <View><Text>1</Text></View>
                <View><TouchableOpacity style={{position: 'absolute', top: -100, left: -100, zIndex: 200, height: 100, width: 100}}><Text>22</Text></TouchableOpacity></View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        height: '100%',
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: 'row',
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'space-between',
        paddingBottom: 20,
        alignItems: 'center'
    }
});

export default BottomTab;
