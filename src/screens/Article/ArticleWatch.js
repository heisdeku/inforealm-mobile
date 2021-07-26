import React, { useState, useEffect, useRef  } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, TouchableOpacity, Text, ScrollView, RefreshControl, ActivityIndicator, View, Alert, Dimensions } from 'react-native';
import { Feather, MaterialIcons, AntDesign, FontAwesome5  } from '@expo/vector-icons';
import Colors from '../../colors/colors';
import ArticleBottomTab from '../../components/ArticleBottomTab';
import { getNewsData } from '../../redux/operations/news.op';
import { hasError, isLoading, selectNews, selectNewsCaption, selectNewsTitle } from '../../redux/selectors/news.selector';
import HTMLView from 'react-native-htmlview'
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player'
import { FontAwesome } from '@expo/vector-icons';
import { setStatusBarHidden } from 'expo-status-bar'
import * as ScreenOrientation from 'expo-screen-orientation'


const ArticleWatch = ({ route, navigation }) => {
  const dispatch = useDispatch()

  //selectors
  const loading = useSelector(isLoading)
  const error = useSelector(hasError)
  const news = useSelector(selectNews)
  const title = useSelector(selectNewsTitle)
  const caption = useSelector(selectNewsCaption)


  const { news_id } = route.params; 

  //refs
  const viewRef = useRef(null)
  const video = useRef(null);

  const [fullScreen, setFullscreen] = useState(false);
  console.log(fullScreen)
  const [refreshing, setRefreshing] = useState(false) 
  const onRefresh = () => {
      setRefreshing(true)
      getNews()  
      setRefreshing(false)    
    } 

  const getNews = async () => {
      const response = await dispatch(getNewsData(news_id))
      if (response.error) {
          Alert.alert(response.err)
      } else {            
          return response.news
      }
  }
  useEffect(() => {
      getNews()
  }, [news_id])   
      
  
  return (
  <View style={{ position: 'relative', flex: 1}}>
      {
          loading &&
          <View style={styles.loadingView}>
              <ActivityIndicator color={Colors.secondary} size='large' />
          </View>
      }
      {
          !loading && error ?
          <View style={styles.errorView}>
              <Text>{error}</Text>
              <TouchableOpacity style={{width: '100%'}} onPress={() => getFeed()}>
                  <View style={{...styles.onboardButton, borderColor: Colors.secondary, backgroundColor: Colors.secondary}}>
                      <Text
                      style={{...styles.buttonText, color: '#fff'}}
                      >
                      Try Again
                      </Text>
                  </View>
              </TouchableOpacity>
          </View>
          :
          null
      }        
      {
          !loading && news ? 
          <ScrollView
              ref={viewRef}
              scrollEnabled={!fullScreen}
              style={{...styles.news, paddingTop: fullScreen ? 0 : 13, paddingHorizontal: fullScreen ? 0 : 15}}
              refreshControl={
                  <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[Colors.brand, Colors.secondary, Colors.caption]}
                  tintColor={Colors.brand}
                  />
              }
              onContentSizeChange={() => {
                  if (fullScreen) {
                  viewRef.current.scrollToEnd({ animated: true })
                  }
              }}
          >
              <View style={styles.imageContainer}>               
                  <VideoPlayer
                      videoProps={{
                          shouldPlay: false,
                          resizeMode: Video.RESIZE_MODE_COVER , 
                          posterSource: {
                              uri: news.media.thumbnail
                          },
                          posterStyle: {
                              width: fullScreen ? Dimensions.get('window').width: Dimensions.get('window').width - 30 , 
                              height: fullScreen ? Dimensions.get('window').height - 71: 200,
                              resizeMode: 'cover'
                          },
                          usePoster: true,    
                          source: {uri: news.media.videos[0]},
                          ref: video,
                      }}
                      fullscreen={{
                          inFullscreen: fullScreen,
                          enterFullscreen: async () => {
                              setStatusBarHidden(true, 'fade')
                              setFullscreen(true)
                              await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_DOWN)  
                              navigation.setOptions({headerShown: false});          
                              video.current.setStatusAsync({
                                  shouldPlay: true,
                              })
                          },
                          
                          exitFullscreen: async () => {
                              setStatusBarHidden(false, 'fade')
                              setFullscreen(false)
                              await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
                              /*video.current.setStatusAsync({
                                  shouldPlay: false,
                              })*/
                          },                            
                      }}                                                   
                      slider={{
                          visible: true,
                          minimumTrackTintColor: '#F7F7F7',
                          maximumTrackTintColor: 'rgba(247, 247, 247, 0.6)',
                          thumbTintColor: '#F7F7F7',
                          style: {
                              borderRadius: 8,
                              height: 10,                                
                          }
                      }}
                      icon={{
                          play: <View style={{ height: 48, display: 'flex', justifyContent: 'center', alignItems: 'center', width: 48, backgroundColor: 'white', borderRadius: 50, paddingLeft: 5, marginLeft: -10, }}>
                              <FontAwesome name="play" size={22} color="black" />
                          </View>,  
                          pause: <View style={{ height: 48, display: 'flex', justifyContent: 'center', alignItems: 'center', width: 48, backgroundColor: 'white', borderRadius: 50, marginLeft: -10, }}>
                          <FontAwesome name="pause" size={20} color="black" />
                      </View>,                          
                          }}
                      style={{
                          ...styles.image,                            
                          height: fullScreen ? Dimensions.get('window').height - 71: 200,
                          width: fullScreen  ? Dimensions.get('window').width: Dimensions.get('window').width - 30 ,                            
                          marginBottom: 20,
                          resizeMode: 'cover'
                      }}
                      />               
              </View>           
              <View style={{...styles.articleCategoryContainer, display: fullScreen ? 'none': 'flex' }}>
                  <Text style={styles.articleCategoryText}>Business</Text>
                  <AntDesign name="right" size={12} color="black" />
                  <Text style={styles.articleCategoryText}>{news.interests.map(interest => interest.interest).join(', ')}</Text>
              </View>
              <View style={{...styles.newsDetails, display: fullScreen ? 'none': 'flex'}}>
                  <View style={styles.crumbs}>
                      <View>
                          <Text style={styles.newsTitle}>{title}</Text>
                          <Text style={styles.newsCaption}>{caption}</Text>
                      </View>                    
                      <View style={styles.newsSummary}>
                          <View style={styles.newsSummaryItem}>
                              <Feather size={14} color={Colors.text1} name='clock' />
                              <Text style={styles.newsSummaryText}>{news.date}</Text>
                          </View>
                          <View style={styles.newsSummaryItem}>
                              <MaterialIcons size={14} color={Colors.text1} name='library-books' />
                              <Text style={styles.newsSummaryText}> {news.time_to_read} min read</Text>
                          </View>
                          <View style={styles.newsSummaryItem}>
                          <FontAwesome5 name="user-alt" size={14} color={Colors.text1} />                            
                              <Text style={styles.newsSummaryText}> {news.author}</Text>
                          </View>                            
                      </View>
                  </View>                  
                  <View style={{
                        marginTop: 25,
                        marginBottom: 180,  
                        fontFamily: 'DMRegular',                       
                    }}>
                        <HTMLView
                            value={`${news.content}`}
                            stylesheet={styling}                            
                        />                        
                    </View>                  
              </View>            
          </ScrollView>
          : null
      }    
      <ArticleBottomTab id={news_id} />
  </View>        
  )
}

export default ArticleWatch;

const styles = StyleSheet.create({
  loadingView: {        
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
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
    emptyView: {
        height: 200,
        borderColor: Colors.caption,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        width: '80%'
    },
    emptyText: {
        fontSize: 20,
        fontFamily: 'DMBold'
    },
  news: {        
      flex: 1,
      paddingTop: 16,
      paddingHorizontal: 15,            
      width: Dimensions.get('window').width,
  },
  imageContainer: {
      flex: 1,
      width: Dimensions.get('window').width,
  },
  image: {
      height: 250,
      resizeMode: 'contain'
  },
  crumbs: {
      borderBottomColor: '#cdcccc',
      paddingBottom: 24,
      borderBottomWidth: 0.5
  },
  crumbText: {
      fontFamily: 'DMRegular',
      fontWeight: '500'
  },
  newsTitle: {
      fontSize: 36,
      fontFamily: 'DMSerif',
      marginVertical: 3,        
      lineHeight: 50,
      letterSpacing: 0.36,
      color: '#000000',
      marginBottom: 15,
  },
  newsDetails: {
      flex: 1
  },
  newsCaption: {
      color: Colors.text2,
      fontSize: 14,
      fontFamily: 'DMRegular',
      marginBottom: 5,        
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: -0.408,
      color: '#343A40'
  },
  newsSummary: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  newsSummaryText: {
      fontSize: 12,
      fontFamily: 'DMRegular',
      color: '#8E8D8D',
      lineHeight: 18,
      marginLeft: 6
  },
  newsSummaryItem: {
      flexDirection: 'row',
      minWidth: 75,        
  },
  articleCategoryContainer: {
      minWidth: 100,
      flexDirection: 'row',
      alignItems: 'center' ,
      marginTop: 24,
      marginBottom: 8,  
          
  },
  articleCategoryText: {
      fontSize: 12,  
  },
  articleWriteUp: {   
      marginTop: 24,     
  fontWeight: '400',
  fontSize: 17,
  lineHeight: 30,
  letterSpacing: -0.408,
  color: '#343A40',
  marginBottom: 100
  }
});


const styling = StyleSheet.create({
    body: {
        fontFamily: 'DMRegular',   
        fontWeight: '400', 
    },
    a: {
      fontWeight: '400',
      color: '#E33127',
    },
    p: {         
        fontFamily: 'DMRegular',   
        fontWeight: '400',        
        fontSize: 17,
        lineHeight: 30,
        letterSpacing: -0.408,
        color: '#343A40',        
    },
    h1: {
        fontSize: 25,
        fontWeight: '700',
    }
  });