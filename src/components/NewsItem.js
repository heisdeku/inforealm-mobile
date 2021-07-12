import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Share, Vibration } from 'react-native';
import Colors from '../colors/colors';
import { useNavigation } from '@react-navigation/native';
import { createStructuredSelector } from 'reselect'
import { selectUserId } from '../redux/selectors/user.selector';
import { connect } from 'react-redux';
import apiConnect from '../api/apiConnect';
import Toast from 'react-native-root-toast';
import { Feather, MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import RBSheet from "react-native-raw-bottom-sheet";

const NewsItem = ({news, user_id}) => {
    const [bookmarksStatus, setBookmarkStatus] = useState(false);
    const [bookmarkError, setBookmarkError] = useState('');
    const [doBookmarkError, setDoBookmarkError] = useState('');
    navigation = useNavigation();
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
                setBookmarkError(response.data.message)
            }
        } catch (error) {
            console.log(error);
            setBookmarkError('Something went wrong');
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
            }
        } catch (error) {
            console.log(error);
            setDoBookmarkError('Something went wrong');
        }
    }

    useEffect(() => {
        if(user_id){
            getBookmarkStatus();
        }
    }, [])
    
    if(!news){
        news = {
            "author": "Test author",
            "caption": "Dummy News Caption 3",
            "categories": [
               {
                "category": "News",
                "category_id": "3",
              },
            ],
            "date": "May 05, 2021",
            "id": "cc63aa2a9ab8f5ab1f25220dca666ac6",
            "interests": [
              {
                "interest": "Video",
                "interest_id": "8",
              },
              {
                "interest": "News",
                "interest_id": "1",
              },
            ],
            "media": {
              "audios": [],
              "images": [],
              "thumbnail": "http://aledoyhost.com/inforealm/thumbnails/main_thumbnail.png",
              "videos": [],
            },
            "time": "11:51:37",
            "time_to_read": "1",
            "title": "Dummy News Title 3",
            "user_id": null,
          }
    }
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
                    <TouchableOpacity>
                        <View style={{flexDirection: 'row', paddingVertical: 12, alignItems: 'center'}}>
                            <View style={styles.rbIcon}><Feather name='download-cloud' color='#fff' size={20} /></View> 
                            <Text style={styles.rbText}>Download</Text>
                        </View>
                    </TouchableOpacity>
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
                    <View style={{...styles.closeBtn, marginTop: !user_id && !news.media.audios.length ? 90 : !user_id && !news.media.videos.length ? 90 : user_id && !news.media.audios.length ? 60 : user_id && !news.media.videos.length ? 60 : 30}}>
                        <Text style={styles.closeBtnText}>Close</Text>
                    </View>
                </TouchableOpacity>
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
    }
});

const mapStateToProps = createStructuredSelector({
    user_id: selectUserId
})

export default connect(mapStateToProps)(NewsItem);
