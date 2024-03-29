import React, { useState, useEffect, useRef } from 'react'

import {StyleSheet, TouchableOpacity, Text, ScrollView, Vibration, View, Dimensions, ActivityIndicator, ImageBackground, Image } from 'react-native'
import {  Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Colors from '../colors/colors';
import RBSheet from "react-native-raw-bottom-sheet";
import { useNavigation } from '@react-navigation/native';
import { createStructuredSelector } from 'reselect'
import { selectUserId } from '../redux/selectors/user.selector';
import { connect } from 'react-redux';
import apiConnect from '../api/apiConnect';
import Toast from 'react-native-root-toast';
import * as FileSystem from 'expo-file-system';
import { selectDownloadsArray, selectDownloadsArticles, selectDownloadsError, selectDownloadsLoading } from '../redux/selectors/downloads.selectors';
import { addDownload, addDownloadArticle, deleteDownload, deleteDownloadArticle, setBookmarkStatus as setDownloadBookmarkStatus, setDownloadStatus } from '../redux/actions/downloads.actions';
import { truncate } from '../helpers/utils';
import { WebView } from 'react-native-webview';


const NewDocumentariesItem = ({news, user_id, downloadsArray, addDownload, deleteDownload, downloadsError, downloadsLoading, downloadArticles, addDownloadArticle, deleteDownloadArticle, setDownloadStatus, setDownloadBookmarkStatus}) => {   
    const [bookmarksStatus, setBookmarkStatus] = useState(false);
    const [bookmarkError, setBookmarkError] = useState('');
    const [doBookmarkError, setDoBookmarkError] = useState('');
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [downloadInProgress, setDownloadInProgress] = useState(false);
    const [downloadInProgressName, setDownloadInProgressName] = useState('');
    const [audioDownloadDoesntExist, setaudioDownloadDoesntExist] = useState(false);
    const [videoDownloadDoesntExist, setvideoDownloadDoesntExist] = useState(false);
    const [ youtubeId, setYoutubeId ] = useState(null)

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

    const getStringInBetweenItems = (str, item1, item2) => {
        let newValue;
        let value = str.substring(str.indexOf(item1) + 1)
        newValue = value
        return newValue
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
                setDownloadBookmarkStatus(true)
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
                setDownloadBookmarkStatus(true);
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

    const checkIfArticleIsDownloaded = (downloadedArticles, article) => {
        const articleExists = downloadedArticles.find(downloadArticle => downloadArticle.id === article.id);
        if(articleExists){
            return true;
        }else{
            return false
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

    const removeDownloadedArticle = async(article) => {
        try {
            deleteDownloadArticle(downloadArticles, article);
            for(let dai=0; dai<article.media.audios; dai++){
                removeDownload(article.media.audios[dai].substring(article.media.audios[dai].lastIndexOf('/')+1))
            }
            for(let dvi=0; dvi<article.media.videos; dvi++){
                removeDownload(article.media.videos[dvi].substring(article.media.videos[dvi].lastIndexOf('/')+1))
            }
            setDownloadBookmarkStatus(true)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(user_id){
            getBookmarkStatus();
        }
    }, [])

    useEffect(() => {
        if (news.embedPresent) {
            const value = getStringInBetweenItems(news.embedLink, '=')
            setYoutubeId(value)
        }
    }, [news])
    return (
        <View style={styles.container}>
            
            { 
                youtubeId ? (
                <WebView
                    source={{ uri: "https://www.youtube.com/embed/"+youtubeId}}
                    startInLoadingState={true} 
                    allowsFullscreenVideo={true}
                    useWebKit 
                    allowUniversalAccessFromFileURLs 
                    originWhitelist = {['*']} 
                    renderLoading={() => <ActivityIndicator color={Colors.secondary} size='large' />}
                    renderError={(errorName) => <View style={styles.errorView}>
                        <Text>{errorName} Occurred, Reload Page</Text>
                        <TouchableOpacity style={{width: '100%'}} onPress={() => getFeed()}>
                            <View style={{...styles.onboardButton, borderColor: Colors.secondary, backgroundColor: Colors.secondary}}>
                                <Text
                                style={{...styles.buttonText, color: '#000'}}
                                >
                                Try Again
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    }
                    style={{
                        minHeight: 250,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: Dimensions.get('window').width - 16
                    }}
                />
                ) : <View style={styles.imageContainer}>
                <ImageBackground source={{uri: news.media.thumbnail}} style={styles.thumb} />
                </View>
            }
                            
           
            <View style={styles.crumbs}>
                <Text style={styles.crumbText}>News <Feather name='chevron-right' size={12} /> {news.interests[0].interest}</Text>
            </View>
            <TouchableOpacity onLongPress={() => {
                Vibration.vibrate(50, false);
                refRBSheet.current.open();
            }}>
                <View style={styles.titleContainer}><Text style={styles.titleText}>{news.title}</Text></View>
            </TouchableOpacity>
            <View style={styles.captionContainer}><Text style={styles.captionText}>{truncate(news.caption, 65)}</Text></View>
            <View style={{...styles.dowloadProgressHolder, opacity: downloadInProgress ? 1 : 0}}>
                <View style={{...styles.downloadProgress, width: `${downloadProgress}%`}}></View>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.detailsItem}>
                    <Text style={styles.detailsText}><Feather size={14} color={Colors.text1} name='clock' /> {news.date}</Text>
                </View>
                <View style={styles.detailsItem}>
                    <Text style={styles.detailsText}><Ionicons size={14} color={Colors.text1} name='md-play-circle' /> {news.time_to_read ? `${news.time_to_read} min read` : '1+ min read'}</Text>
                </View>
                <View style={{...styles.detailsItem, display: 'flex', flexDirection: 'row'}}>
                    {
                        !news?.profile_picture &&
                            <FontAwesome5 size={12} color={Colors.text1} name='user-alt' /> 
                        }                    
                        {
                        news?.profile_picture &&
                        <Image resizeMode="cover" source={{ uri: news?.profile_picture }} style={{ width: 18, height: 18, borderRadius: 100, justifyContent: 'center', alignItems: 'center', marginRight: 2 }} />
                    } 
                    <Text style={styles.detailsText}>                                            
                        {news.author}
                    </Text>
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
                            {/*
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
                                */
                            }
                        </View>
                        :
                        null
                    }
                    {
                        !checkIfArticleIsDownloaded(downloadArticles, news) ?
                        <TouchableOpacity onPress={() => addDownloadArticle(downloadArticles, news)}>
                            <View style={{flexDirection: 'row', paddingVertical: 12, alignItems: 'center'}}>
                                <View style={styles.rbIcon}><Feather name='download-cloud' color='#fff' size={20} /></View> 
                                <Text style={styles.rbText}>Download Article</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => removeDownloadedArticle(news)}>
                            <View style={{flexDirection: 'row', paddingVertical: 12, alignItems: 'center'}}>
                                <View style={styles.rbIcon}><Feather name='download-cloud' color='#fff' size={20} /></View> 
                                <Text style={styles.rbText}>Delete Article</Text>
                            </View>
                        </TouchableOpacity>
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
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        marginHorizontal: 16,
        borderBottomColor: '#cdcccc',
        borderBottomWidth: 0.5,
        marginBottom: 16,
        paddingBottom: 26
    },
    errorView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25
    },
    onboardButton: {
        height: 50,
        width: '100%',
        borderRadius: 4,
        borderWidth: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8
      },
      buttonText: {
          fontSize: 14,
          fontFamily: 'DMRegular'
      },
    imageContainer: {
        flex: 1,
        position: 'relative',
        height: 280,
        marginBottom: 24,
        borderRadius: 4,
        overflow: 'hidden'
    },
    thumb: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    crumbText: {
        fontSize: 12,
        color: Colors.text2,
        fontFamily: 'DMRegular',
        fontWeight: '500'
    },
    titleContainer: {
        marginTop: 20
    },
    titleText: {
        fontSize: 20,
        fontFamily: 'DMSerif',
        lineHeight: 32,
    },
    captionContainer: {
        marginBottom: 20,
        marginTop: 7
    },
    captionText: {
        fontSize: 12,
        fontFamily: 'DMRegular'
    },
    detailsContainer: {
        flexDirection: 'row'
    },
    detailsItem: {
        marginRight: 15
    },
    detailsText: {
        fontSize: 11,
        color: '#8E8D8D',
        fontFamily: 'DMRegular',
        lineHeight: 18,
        textTransform: 'capitalize'
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
})

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
    deleteDownloadArticle: (savedArticles, article) => dispatch(deleteDownloadArticle(savedArticles, article)),
    setDownloadBookmarkStatus: status => dispatch(setDownloadBookmarkStatus(status)),
    setDownloadStatus: status => dispatch(setDownloadStatus(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewDocumentariesItem)


