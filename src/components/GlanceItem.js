import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Share } from 'react-native';
import Colors from '../colors/colors';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

const GlanceItem = ({news}) => {
    const [duration, setDuration] = useState(null);
    const navigation = useNavigation(); 
    const onShare = async () => {
        try {
            Share.share({
                message: `Check this out on the inforealm https:theinforealm.com/news/${news.id}`
            })
        } catch (error) {  
            console.log(error);
        }
    }

    const refRBSheet = useRef();
    const millisToMinutesAndSeconds = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
      
    const getAudioLength = async () => {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync({uri: news.media.audios[0]});
            const audioStatus = await soundObject.getStatusAsync();
            setDuration(millisToMinutesAndSeconds(audioStatus.durationMillis));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(news.media.audios.length > 0){
            getAudioLength();
        }
    }, [])

    return (
        <View>
            <View style={styles.glanceItem}>
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/images/bookmarked-glance.png')} style={styles.image} />
                </View>
                <View style={styles.glanceDetailsBox}>
                    <View style={styles.glanceDetails}>
                        <Text style={styles.glanceItemTitle}>{news.title}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.date}><Feather size={14} color={Colors.text1} name='clock' /><Text style={styles.dateText}> {news.date}</Text></View>
                            {duration ? <View style={styles.date}><Feather size={14} color={Colors.text1} name='headphones' /><Text style={styles.dateText}> {duration}</Text></View> : null}
                        </View>
                    </View>
                    <View style={{height: 22, width: 22, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => refRBSheet.current.open()}><MaterialCommunityIcons name='dots-vertical' size={28} color='#09121F' /></TouchableOpacity>
                    </View>
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
                        <Text style={styles.rbText}>Remove from bookmark</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{flexDirection: 'row', paddingVertical: 12, alignItems: 'center'}}>
                        <View style={styles.rbIcon}><Feather name='download-cloud' color='#fff' size={20} /></View> 
                        <Text style={styles.rbText}>Download</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onShare()}>
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

export default GlanceItem;

const styles = StyleSheet.create({
    glanceItem: {
        paddingVertical: 20,
        borderBottomColor: '#CDCCCC',
        borderBottomWidth: 0.5,
        flexDirection: 'row'
    },
    image: {
        height: 64,
        width: 64,
        resizeMode: 'contain'
    },
    imageContainer: {
        marginRight: 18,
        borderRadius: 4,
        overflow: 'hidden'
    },
    glanceItemTitle: {
        fontSize: 16,
        fontFamily: 'DMBold',
        marginBottom: 8,
    },
    dateText: {
        color: Colors.text2,
        fontSize: 12,
        fontFamily: 'DMRegular'
    },
    date: {
        flexDirection: 'row',
        marginBottom: 4,
        marginRight: 25
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
    },
    glanceDetailsBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    glanceDetails: {
        width: 240,
        marginRight: 30
    }
})
