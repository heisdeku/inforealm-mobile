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
import { truncate } from '../helpers/utils';

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
        } catch (error) {
            console.log(error);
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
                <View style={styles.crumbs}>
                    <Text style={styles.crumbText}> {news.interests.map(interest => interest.interest).join(', ')}</Text></View>
                <TouchableOpacity onLongPress={() => {
                    Vibration.vibrate(50, false);
                    refRBSheet.current.open();
                }} onPress={() => 
                    navigation.navigate('Article', {
                      screen: 'ArticleRead',
                      params: {news_id: news.id},
                    })
                    
                  }><Text style={styles.newsTitle}>{news.title}</Text></TouchableOpacity>
                <Text style={styles.newsCaption}>{truncate(news.caption, 50)}</Text>
                <View style={styles.newsSummary}>
                    <View style={styles.newsSummaryItem}><Feather size={14} color={Colors.text1} name='clock' /><Text style={{...styles.newsSummaryText, marginLeft: 5}}> {news.date}</Text></View>
                    <View style={styles.newsSummaryItem}>
            <Text style={{...styles.newsSummaryText, marginRight: 5}}>By</Text>
            {
              !news?.profile_picture && <View style={{                
                    width: 36,
                    height: 26,        
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <MaterialCommunityIcons name="account" size={18} color="#6C757D" style={{ marginRight: 2}} />
            </View>
            }                    
            {
              news?.profile_picture &&
              <Image resizeMode="cover" source={{ uri: news?.profile_picture }} style={{ width: 16, height: 16, borderRadius: 100, marginRight: 2, justifyContent: 'center', alignItems: 'center' }} />
            } 
            
            <Text style={styles.newsSummaryText}>{news.author}</Text>
          </View>
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
    news: {
        paddingVertical: 12,
        paddingLeft: 15,
        paddingRight: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: '#cdcccc',
        flexDirection: 'row',
        marginTop: 15,
        position: 'relative'       
    },
    imageContainer: {
        width: 120,
        marginRight: 19,
        borderRadius: 8
    },
    image: {
        height: 200,
        width: 116,
        borderRadius: 8,
        resizeMode: 'cover'
    },
    crumbs: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    crumbText: {
        fontFamily: 'DMBold',
        fontWeight: '500',
        color: '#343A40'
    },
    newsTitle: {
        fontSize: 20,
        fontFamily: 'DMBold',
        marginBottom: 8,
        color: '#2B2D42',
    },
    newsDetails: {
        flex: 1,        
    },
    newsCaption: {
        color: Colors.text2,
    fontSize: 14,
    fontFamily: 'DMRegular',
    //marginBottom: 5,
    },
    newsSummary: {
        display: 'flex',
        flexDirection: 'row',
        //justifyContent: 'space-between',
        //position: 'absolute',
        marginTop: 'auto',
        bottom: 0,    
        width: 210, 
    },
    newsSummaryText: {
        fontSize: 12,
        fontFamily: 'DMRegular',
        color: '#8E8D8D', 
        textTransform: 'capitalize'       
    },
    newsSummaryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: '40%', 
        marginTop: 8
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
