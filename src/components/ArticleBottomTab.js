import React, { useEffect, useState, useRef  } from 'react';
import { useSelector } from 'react-redux'
import { StyleSheet, ScrollView, Text, Share, View, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { EvilIcons, AntDesign, Feather } from '@expo/vector-icons';
import RBSheet from 'react-native-raw-bottom-sheet'
import Colors from '../colors/colors';
import ArticleCommentsContainer from './ArticleCommentsContainer';
import Toast from 'react-native-root-toast';
import apiConnect from '../api/apiConnect';
import { selectUserId } from '../redux/selectors/user.selector';
import { isLoading } from '../redux/selectors/news.selector';
import Comment from '../svgs/commentIcon';
import MainLikeIcon from '../svgs/mainLikeIcon'
import ShareIcon from '../svgs/shareIcon'

const ArticleBottomTab = ({ newsTitle, id }) => {    
    const refRBSheet = useRef()
    const [ likeStatus, setLikeStatus ] = useState(false)
    const [morePressed, setMorePressed] = useState(false)    
    const loading = useSelector(isLoading)  
    const userId = useSelector(selectUserId)
    const mode = new Animated.Value(0);

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(mode, {
                toValue: mode._value === 0 ? 1 : 0,
                useNativeDriver: false,
                timing: 2
            })
        ]).start();
    }

    const handleLike = async () => {        
        if (!userId) {
            Toast.show("You can't like as you're not signed in", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER
            });
            return
        }
        setLikeStatus(!likeStatus)
        let data = new FormData()
        data.append('news_id', id)
        data.append('user_id', userId)
        const response = await apiConnect.post('/doLike', data)        
        const { message } = response.data

        if (message.includes('unliked')) {                              
            Toast.show("Unliked", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER
            })    
          } else {      
            Toast.show("Liked", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER
            });  
          }
    }

    const handleShare = async () => {
        try {
            Share.share({
                message: `${newsTitle}, https://theinforealm.com/news/${id}`
            })

            let articleData = new FormData()
            articleData.append("news_id", id)
            articleData.append("user_id", userId)
            const response = await apiConnect.post(`/doShare`, articleData)
            return response.data.message
            
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const getArticleLikedStatus = async () => {
            let articleData = new FormData()
            articleData.append("news_id", id)
            articleData.append("user_id", userId)
            const response = await apiConnect.post(`/getLikedStatus`, articleData)
            const { like_status } = response.data
            setLikeStatus(like_status)
        }
    
        getArticleLikedStatus()
        //eslint-disable-next-line
      }, [likeStatus, handleLike])

    useEffect(() => {
        Animated.sequence([
            Animated.timing(mode, {
                toValue: morePressed ? 1 : 0,
                useNativeDriver: false,
                timing: 2
            })
        ]).start()
    }, [morePressed])

    const componentHeight = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [70, Dimensions.get('window').height]
    })

    return (
        <Animated.View
          style={{height: componentHeight, backgroundColor: 'transparent', width: Dimensions.get('window').width, position: 'absolute', bottom: 0, left: 0, opacity: loading ? 0 : 1}}
        >
            <View style={styles.tabBar}>
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                  <View style={styles.tab}>
                      <Comment />                    
                      <Text style={styles.tabLabel}>Comment</Text>
                  </View>
              </TouchableOpacity>
                <TouchableOpacity onPress={handleLike} >
                    <View style={styles.tab}>                   
                        <MainLikeIcon color={likeStatus ? Colors.secondary : '#050618'} />                             
                        <Text style={{ ...styles.tabLabel, color: likeStatus ? Colors.secondary : '#050618' }}>{likeStatus ? 'Liked' : 'Like' }</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleShare}>
                    <View style={styles.tab}>
                        <ShareIcon />
                        <Text style={styles.tabLabel}>Share</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={() => setMorePressed(!morePressed)} onPress={() => handlePress()}>
                    <View>                        
                        <AntDesign name="up" size={18} color={ morePressed ? Colors.secondary : '#050618'} />                                                
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                animationType='slide'
                closeOnPressMask={true}  
                closeOnPressBack={true}  
                height={(Dimensions.get('window').height) / 1.13}   
                dragFromTopOnly={true}          
                customStyles={{
                wrapper: {                
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                },
                draggableIcon: {
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    width: 140, 
                    marginVertical: 16                   
                },
                container: {
                    //height: Dimensions.get('window').height / 1.12,                    
                    borderTopRightRadius: 32,
                    borderTopLeftRadius: 32,   
                    backgroundColor: '#F7F7F7',                 
                },
                }}
            >
                                
                <ArticleCommentsContainer />                                    
            </RBSheet>
            </ScrollView>
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
        alignItems: 'baseline',
        paddingBottom: 20,
        alignItems: 'center',
        height: 70,
        paddingTop: 10,
        backgroundColor: '#fff',
    },
    tab: {
        width:( Dimensions.get('window').width)/ 4,        
        flexDirection: 'row',
        //alignItems: 'baseline',
        justifyContent: 'center'
    },
    tabLabel: {
        fontSize: 12,
        color: '#8E8D8D',
        marginTop: 5,
        fontFamily: 'DMRegular',
        fontWeight: '500',
        marginLeft: 6,
    },
    closeBtn: {
        height: 50,
        width: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 0.3,
        borderColor: Colors.secondary,        
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
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default ArticleBottomTab;
