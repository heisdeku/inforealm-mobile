import React, { useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import Colors from '../colors/colors';
import { Feather, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";

const DocumentaryItem = ({item}) => {
    const refRBSheet = useRef();
    return (
        <View style={styles.item}>
            <View style={{borderRadius: 5, overflow: 'hidden'}}>
                <ImageBackground 
                source={require('../../assets/images/demo-documentary.png')}
                style={styles.Image}
                >
                    <TouchableOpacity style={{flexDirection: 'row'}}>
                        <View style={{backgroundColor: '#fff', height: 23, width: 23, justifyContent: 'center', alignItems: 'center', borderRadius: 11.5}}><Ionicons name='md-play-circle' size={24} color='#000' /></View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <TouchableOpacity><Text style={styles.title}>How these economic super powers...</Text></TouchableOpacity>
            <Text style={styles.caption}>The African continent has 15% of the world’s...</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                <View>
                    <View style={styles.date}><Feather size={14} color={Colors.text1} name='clock' /><Text style={styles.dateText}> Oct 27, 2020</Text></View>
                    <View style={styles.date}><MaterialIcons size={14} color={Colors.text1} name='library-books' /><Text style={styles.dateText}> 3 min read</Text></View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => refRBSheet.current.open()}><MaterialCommunityIcons name='dots-vertical' size={28} color='#09121F' /></TouchableOpacity>
                </View>
            </View>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={330}
                customStyles={{
                wrapper: {
                    backgroundColor: "transparent"
                },
                draggableIcon: {
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    width: 135,
                    marginBottom: 25
                },
                container: {
                    borderTopRightRadius: 24,
                    borderTopLeftRadius: 24,
                    paddingHorizontal: 25
                }
                }}
            >
                <TouchableOpacity>
                    <View style={{flexDirection: 'row', paddingVertical: 12, alignItems: 'center'}}>
                        <View style={styles.rbIcon}><Feather name='bookmark' color='#fff' size={20} /></View> 
                        <Text style={styles.rbText}>Bookmark</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{flexDirection: 'row', paddingVertical: 12, alignItems: 'center'}}>
                        <View style={styles.rbIcon}><Feather name='download-cloud' color='#fff' size={20} /></View> 
                        <Text style={styles.rbText}>Download</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{flexDirection: 'row', paddingVertical: 12, alignItems: 'center'}}>
                        <View style={styles.rbIcon}><Feather name='share' color='#fff' size={20} /></View> 
                        <Text style={styles.rbText}>Share</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => refRBSheet.current.close()} >
                    <View style={styles.closeBtn}>
                        <Text style={styles.closeBtnText}>Close</Text>
                    </View>
                </TouchableOpacity>
            </RBSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        width: (Dimensions.get('window').width - 20) /2,
        borderRightColor: '#cdcccc',
        borderRightWidth: 0.5,
        paddingBottom: 20,
        paddingRight: 19,
        paddingLeft: 15,
        borderBottomColor: '#CDCCCC',
        borderBottomWidth: 0.5,
        paddingTop: 29
    },
    Image: {
        height: 92,
        resizeMode: 'contain',
        borderRadius: 4,
        paddingTop: 60,
        paddingLeft: 15
    },
    title: {
        fontSize: 18,
        fontFamily: 'DMBold',
        marginBottom: 9,
        marginTop: 12,
        color: Colors.text1
    },
    caption: {
        fontSize: 14,
        fontFamily: 'DMRegular',
        marginBottom: 11,
        color: Colors.text2
    },
    dateText: {
        color: Colors.text2,
        fontSize: 12,
        fontFamily: 'DMRegular'
    },
    date: {
        flexDirection: 'row',
        marginBottom: 4
    },
    rbIcon: {
        height: 32, 
        width: 32,
        borderRadius: 16,
        backgroundColor: Colors.secondary,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16
    },
    rbText: {
        fontSize: 16,
        fontFamily: 'DMRegular',
        fontWeight: '500'
    },
    closeBtn: {
        height: 46,
        backgroundColor: 'rgba(118, 118, 128, 0.12)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderRadius: 24
    },
    closeBtnText: {
        fontFamily: 'DMBold',
        color: Colors.text2,
        fontSize: 16
    }
})

export default DocumentaryItem;
