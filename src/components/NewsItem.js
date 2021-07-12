import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Share, Vibration, ScrollView } from 'react-native';
import Colors from '../colors/colors';
import { useNavigation } from '@react-navigation/native';
import { createStructuredSelector } from 'reselect'
import { selectUserId } from '../redux/selectors/user.selector';
import { connect } from 'react-redux';
import apiConnect from '../api/apiConnect';
import Toast from 'react-native-root-toast';
import * as FileSystem from 'expo-file-system';
import { Feather, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";
import { selectDownloadsArray, selectDownloadsArticles, selectDownloadsError, selectDownloadsLoading } from '../redux/selectors/downloads.selectors';
import { addDownload, addDownloadArticle, deleteDownload, deleteDownloadArticle } from '../redux/actions/downloads.actions';

const NewsItem = ({news, user_id, downloadsArray, addDownload, deleteDownload, downloadsError, downloadsLoading, downloadArticles, addDownloadArticle, deleteDownloadArticle}) => {
    const [bookmarksStatus, setBookmarkStatus] = useState(false);
    const [bookmarkError, setBookmarkError] = useState('');
    const [doBookmarkError, setDoBookmarkError] = useState('');
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [downloadInProgress, setDownloadInProgress] = useState(false);
    const [downloadInProgressName, setDownloadInProgressName] = useState('');
    const [audioDownloadDoesntExist, setaudioDownloadDoesntExist] = useState(false);
    const [videoDownloadDoesntExist, setvideoDownloadDoesntExist] = useState(false);
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
    console.log('dlArt', downloadArticles)
    console.log('dl', downloadsArray)
    // console.log('cong', audioDownloadDoesntExist && videoDownloadDoesntExist)

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
                addDownloadArticle(downloadArticles, news);
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

    const checkAudiosDownloaded = () => {
        // console.log('audL', news.media.audios.length)
        if(news.media.audios.length > 0){
            const newSet = news.media.audios.map(audio => {
                // console.log('audio', audio)
                // console.log('downloadsArray', downloadsArray)
                const kwi = downloadsArray.find(aud => aud == audio.substring(audio.lastIndexOf('/')+1))
                return kwi;
            })
            console.log('newSet', newSet);
            if(newSet.length){
                setaudioDownloadDoesntExist(false);
            }else{
                setaudioDownloadDoesntExist(true);
            }
        }else{
            setaudioDownloadDoesntExist(true);
        }
    }

    const checkVideosDownloaded = () => {
        // console.log('vidL', news.media.videos.length)
        if(news.media.videos.length > 0){
            const newSet = news.media.videos.map(video => {
                const kwi = downloadsArray.find(vid => vid == video.substring(video.lastIndexOf('/')+1));
                    // console.log('vid', vid)
                    // console.log('video', video.substring(video.lastIndexOf('/')+1))
                return kwi;
            })
            if(newSet.length){
                setvideoDownloadDoesntExist(false);
            }else{
                setvideoDownloadDoesntExist(true);
            }
        }else{
            setvideoDownloadDoesntExist(true);
        }
    }

    const removeDownload = async (fileName) => {
        try {
            FileSystem.deleteAsync(FileSystem.documentDirectory + fileName);
            deleteDownload(downloadsArray, fileName);
            checkAudiosDownloaded();
            checkVideosDownloaded();

            if(audioDownloadDoesntExist && videoDownloadDoesntExist){                
                deleteDownloadArticle(downloadArticles, news);
            }
            
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if(user_id){
            getBookmarkStatus();
        }
    }, [])

    return (
        <View style={styles.news}>
            <View style={styles.imageContainer}>
                <Image source={{uri: news.media.thumbnail}} style={styles.image} />
            </View>
            <View style={styles.newsDetails}>
                <View style={styles.crumbs}><Text style={styles.crumbText}>News </Text><Feather name='chevron-right' size={14} color={Colors.text2} /><Text style={styles.crumbText}> {news.interests.map(interest => interest.interest).join(', ')}</Text></View>
                <TouchableOpacity onLongPress={() => {
                    Vibration.vibrate(50, false);
                    refRBSheet.current.open();
                }} onPress={() => navigation.navigate('Article', { screen: 'ArticleRead', params: {news_id: news.id}})}><Text style={styles.newsTitle}>{news.title}</Text></TouchableOpacity>
                <Text style={styles.newsCaption}>{news.caption}</Text>
                <View style={styles.newsSummary}>
                    <View style={styles.newsSummaryItem}><Feather size={14} color={Colors.text1} name='clock' /><Text style={styles.newsSummaryText}> {news.date}</Text></View>
                    <View style={styles.newsSummaryItem}><MaterialIcons size={14} color={Colors.text1} name='library-books' /><Text style={styles.newsSummaryText}> {news.time_to_read} min read</Text></View>
                </View>
                {
                    downloadProgress ?
                    <View style={styles.dowloadProgressHolder}>
                        <View style={{...styles.downloadProgress, width: `${downloadProgress}%`}}></View>
                    </View>
                    :
                    null
                }
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
    news: {
        padding: 16,
        borderTopWidth: 0.5,
        borderTopColor: '#cdcccc',
        borderBottomWidth: 0.5,
        borderBottomColor: '#cdcccc',
        flexDirection: 'row',
        marginTop: 15
    },
    imageContainer: {
        width: 120,
        marginRight: 19
    },
    image: {
        height: 160,
        width: 116,
        resizeMode: 'cover'
    },
    crumbs: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    crumbText: {
        fontFamily: 'DMRegular',
        fontWeight: '500'
    },
    newsTitle: {
        fontSize: 20,
        fontFamily: 'DMBold',
        marginVertical: 3,
    },
    newsDetails: {
        flex: 1
    },
    newsCaption: {
        color: Colors.text2,
        fontSize: 14,
        fontFamily: 'DMRegular',
        marginBottom: 5
    },
    newsSummary: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    newsSummaryText: {
        fontSize: 12,
        fontFamily: 'DMRegular',
        color: '#8E8D8D'
    },
    newsSummaryItem: {
        flexDirection: 'row'
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
});

const mapStateToProps = createStructuredSelector({
    user_id: selectUserId,
    downloadsArray: selectDownloadsArray,
    downloadsLoading: selectDownloadsLoading,
    downloadsError: selectDownloadsError,
    downloadArticles: selectDownloadsArticles
})

const mapDispatchToProps = dispatch => ({
    addDownload: (savedDownloads, fileName) => dispatch(addDownload(savedDownloads, fileName)),
    deleteDownload: (savedDownloads, fileName) => dispatch(deleteDownload(savedDownloads, fileName)),
    addDownloadArticle: (savedArticles, article) => dispatch(addDownloadArticle(savedArticles, article)),
    deleteDownloadArticle: (savedArticles, article) => dispatch(deleteDownloadArticle(savedArticles, article))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewsItem);
