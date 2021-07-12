import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity, Share } from 'react-native';
import Colors from '../colors/colors';
import { Feather, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import { useNavigation } from '@react-navigation/native';
import { createStructuredSelector } from 'reselect'
import { selectUserId } from '../redux/selectors/user.selector';
import { connect } from 'react-redux';
import apiConnect from '../api/apiConnect';
import Toast from 'react-native-root-toast';
import * as FileSystem from 'expo-file-system';
import { ScrollView } from 'react-native-gesture-handler';
import { selectDownloadsArray, selectDownloadsError, selectDownloadsLoading } from '../redux/selectors/downloads.selectors';
import { addDownload, deleteDownload } from '../redux/actions/downloads.actions';

const DocumentaryItem = ({news, user_id, downloadsArray, addDownload, deleteDownload, downloadsError, downloadsLoading}) => {
    const [bookmarksStatus, setBookmarkStatus] = useState(false);
    const [bookmarkError, setBookmarkError] = useState('');
    const [doBookmarkError, setDoBookmarkError] = useState('');
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [downloadInProgress, setDownloadInProgress] = useState(false);
    const [downloadInProgressName, setDownloadInProgressName] = useState('');
    const navigation = useNavigation();
    const refRBSheet = useRef();   
    const onShare = async () => {
        try {
            Share.share({
                message: `Check this out on the inforealm https:theinforealm.com/news/${news.id}`
            })
        } catch (error) {  
            console.log(error);
        }
    }

    const getBookmarkStatus = async () => {
        setBookmarkError('');
        try {
            const bodyForm = new FormData();
            bodyForm.append('user_id', user_id);
            bodyForm.append('news_id', news.id);
            const response = await apiConnect.post('getBookmarkedStatus', bodyForm);
            if(response.data.status === 'success'){
                setBookmarkStatus(response.data.bookmark_status);
            }else{
                setBookmarkError(response.data.message);
                Toast.show(bookmarkError, {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER
                });
            }
        } catch (error) {
            console.log(error);
            setBookmarkError('Something went wrong');
            Toast.show(bookmarkError, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER
            });
        }
    }

    const doBookmark = async () => {
        setDoBookmarkError('');
        try {
            const bodyForm = new FormData();
            bodyForm.append('news_id', news.id);
            bodyForm.append('user_id', user_id);
            const response = await apiConnect.post('doBookmark', bodyForm);
            if(response.data.status === 'success'){
                Toast.show(response.data.message, {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER
                })
                getBookmarkStatus();
            }else{
                setDoBookmarkError(response.data.message);
                Toast.show(doBookmarkError, {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER
                })
            }
        } catch (error) {
            console.log(error);
            setDoBookmarkError('Something went wrong');
            Toast.show(doBookmarkError, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER
            })
        }
    }

    const toastDownloadInProgress = () => {
        Toast.show('A download is currently in progress for this article', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER
        })
    }

    const createDownload = async (downloadUrl) => {
        const callback = downProgress => {
            const progress = downProgress.totalBytesWritten / downProgress.totalBytesExpectedToWrite;
            setDownloadProgress(progress * 100);
            if(downProgress.totalBytesWritten === downProgress.totalBytesExpectedToWrite){
                setDownloadInProgress(false);
                Toast.show('Download Completed', {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.CENTER
                });
                setDownloadProgress(0);
                addDownload(downloadsArray, downloadUrl.substring(downloadUrl.lastIndexOf('/')+1));
            }
        };

        const downloadResumable = FileSystem.createDownloadResumable(
            `${downloadUrl}`,
            FileSystem.documentDirectory + `${downloadUrl.substring(downloadUrl.lastIndexOf('/')+1)}`,
            {},
            callback
        );
        
        setDownloadInProgress(true);
        setDownloadInProgressName(downloadUrl.substring(downloadUrl.lastIndexOf('/')+1));

        try {
            const { uri } = await downloadResumable.downloadAsync();
          } catch (e) {
            console.error(e);
          }
    }

    const removeDownload = async (fileName) => {
        try {
            FileSystem.deleteAsync(FileSystem.documentDirectory + fileName);
            deleteDownload(downloadsArray, fileName);
        } catch (error) {
            console.log(error)
        }
    }

    const checkIfDownloadExists = (downloadsArray, fileName) => {
        if(downloadsArray.length){
            const itemExists = downloadsArray.find(download => download === fileName)

            if(itemExists){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }

    useEffect(() => {
        if(user_id){
            getBookmarkStatus();
        }
    }, [])

    return (
        <View style={styles.item}>
            <View style={{borderRadius: 5, overflow: 'hidden'}}>
                <ImageBackground 
                source={require('../../assets/images/demo-documentary.png')}
                style={styles.Image}
                >
                    {
                        news.media.videos.length ?
                        <TouchableOpacity style={{flexDirection: 'row'}}>
                        <View style={{backgroundColor: '#fff', height: 23, width: 23, justifyContent: 'center', alignItems: 'center', borderRadius: 11.5}}><Ionicons name='md-play-circle' size={24} color='#000' /></View>
                        </TouchableOpacity>
                        :
                        null
                    }
                </ImageBackground>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Article', { screen: 'ArticleRead', params: {news_id: news.id}})}><Text style={styles.title}>{news.title}</Text></TouchableOpacity>
            <Text style={styles.caption}>{news.caption}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                <View>
                    <View style={styles.date}><Feather size={14} color={Colors.text1} name='clock' /><Text style={styles.dateText}> {news.date}</Text></View>
                    <View style={styles.date}><MaterialIcons size={14} color={Colors.text1} name='library-books' /><Text style={styles.dateText}> {news.time_to_read} min read</Text></View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => refRBSheet.current.open()}><MaterialCommunityIcons name='dots-vertical' size={28} color='#09121F' /></TouchableOpacity>
                </View>
            </View>
            <View style={{...styles.dowloadProgressHolder, opacity: downloadInProgress ? 1 : 0}}>
                <View style={{...styles.downloadProgress, width: `${downloadProgress}%`}}></View>
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
                <ScrollView>
                    {
                        user_id ?
                        <TouchableOpacity onPress={() => doBookmark()} >
                            <View style={{flexDirection: 'row', paddingVertical: 12, alignItems: 'center'}}>
                                <View style={styles.rbIcon}><Feather name='bookmark' color='#fff' size={20} /></View> 
                                <Text style={styles.rbText}>{bookmarksStatus ? 'Remove from bookmarks' : 'Bookmark'}</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        null
                    }
                    {
                        news.media.audios.length || news.media.videos.length ?
                        <View>
                            {
                            news.media.audios.map((audio, i) => {
                                if(checkIfDownloadExists(downloadsArray, audio.substring(audio.lastIndexOf('/')+1))){
                                    return(
                                        <TouchableOpacity onPress={() => removeDownload(audio.substring(audio.lastIndexOf('/')+1))} key={i}>
                                            <View style={{flexDirection: 'row', paddingVertical: 12, alignItems: 'center'}}>
                                                <View style={styles.rbIcon}><Feather name='trash' color='#fff' size={20} /></View> 
                                                <Text style={styles.rbText}>Delete Audio {i+1}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }else{
                                    return(
                                        <TouchableOpacity onPress={downloadInProgress ? () => toastDownloadInProgress() : () => createDownload(audio)} key={i}>
                                            <View style={{flexDirection: 'row', paddingVertical: 12, alignItems: 'center'}}>
                                                <View style={styles.rbIcon}><Feather name='download-cloud' color='#fff' size={20} /></View> 
                                                <Text style={styles.rbText}>Download Audio {i+1}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                            })                            
                            }
                            {
                                news.media.videos.map((video, i) => {
                                    if(checkIfDownloadExists(downloadsArray, video.substring(video.lastIndexOf('/')+1))){
                                        return(
                                            <TouchableOpacity onPress={() => removeDownload(video.substring(video.lastIndexOf('/')+1))} key={i}>
                                                <View style={{flexDirection: 'row', paddingVertical: 12, alignItems: 'center'}}>
                                                    <View style={styles.rbIcon}><Feather name='trash' color='#fff' size={20} /></View> 
                                                    <Text style={styles.rbText}>Delete Video {i+1}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }else{
                                        return(
                                            <TouchableOpacity onPress={downloadInProgress ? () => toastDownloadInProgress() : () => createDownload(video)} key={i}>
                                                <View style={{flexDirection: 'row', paddingVertical: 12, alignItems: 'center'}}>
                                                    <View style={styles.rbIcon}><Feather name='download-cloud' color='#fff' size={20} /></View> 
                                                    <Text style={styles.rbText}>Download Video {i+1}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }
                                })
                            }
                        </View>
                        :
                        null
                    }
                    <TouchableOpacity onPress={() => onShare()}>
                        <View style={{flexDirection: 'row', paddingVertical: 12, alignItems: 'center'}}>
                            <View style={styles.rbIcon}><Feather name='share' color='#fff' size={20} /></View> 
                            <Text style={styles.rbText}>Share</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => refRBSheet.current.close()} >
                        <View style={{...styles.closeBtn, marginTop: !user_id && !news.media.audios.length ? 90 : !user_id && !news.media.videos.length ? 90 : !user_id && news.media.audios.length ? 60 : !user_id && news.media.videos.length ? 60 : 30}}>
                            <Text style={styles.closeBtnText}>Close</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
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
        borderRadius: 24,
    },
    closeBtnText: {
        fontFamily: 'DMBold',
        color: Colors.text2,
        fontSize: 16
    },
    dowloadProgressHolder: {
        height: 7,
        backgroundColor: '#000',
        width: '100%',
        justifyContent: 'center',
        marginTop: 7
    },
    downloadProgress: {
        height: 5,
        backgroundColor: Colors.secondary
    }
})

const mapStateToProps = createStructuredSelector({
    user_id: selectUserId,
    downloadsArray: selectDownloadsArray,
    downloadsLoading: selectDownloadsLoading,
    downloadsError: selectDownloadsError
})

const mapDispatchToProps = dispatch => ({
    addDownload: (savedDownloads, fileName) => dispatch(addDownload(savedDownloads, fileName)),
    deleteDownload: (savedDownloads, fileName) => dispatch(deleteDownload(savedDownloads, fileName))
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentaryItem);
