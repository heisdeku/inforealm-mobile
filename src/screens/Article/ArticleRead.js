import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, TouchableOpacity, Text, ScrollView, Platform, ActivityIndicator, View, Alert, ImageBackground, Image, Dimensions, RefreshControl } from 'react-native';
import { Feather, MaterialIcons, AntDesign, FontAwesome5  } from '@expo/vector-icons';
import Colors from '../../colors/colors';
import ArticleBottomTab from '../../components/ArticleBottomTab';
import { getNewsData } from '../../redux/operations/news.op';
import { hasError, isLoading, selectNews, selectNewsCaption, selectNewsTitle } from '../../redux/selectors/news.selector';
import HTMLView from 'react-native-htmlview'
import { WebView } from 'react-native-webview';
//import RenderHtml from 'react-native-render-html';



const ArticleRead = ({ route }) => {
    const dispatch = useDispatch()
    const loading = useSelector(isLoading)
    const error = useSelector(hasError)
    const news = useSelector(selectNews)        
    const { news_id } = route?.params; 
    const [refreshing, setRefreshing] = useState(false) 
    const [ youtubeId, setYoutubeId ] = useState(null)

    const getStringInBetweenItems = (str, item1, item2) => {
        let newValue;
        let value = str.substring(str.indexOf(item1) + 1)
        //let indexOfItem2 = value.indexOf(item2)
        newValue = value
        return newValue
    }

    const renderNode = (node, index, siblings, parent, defaultRenderer) => {
        if (node.name == 'img') {
            const a = node.attribs;
            return (
                <View style={styles.imageContainer}>
                    <Image 
                        resizeMode="cover" 
                        source={{ uri: a.src}} 
                        style={{ width: Dimensions.get('window').width - 10, height: 450, justifyContent: 'center', resizeMode: 'contain', alignItems: 'center', }} 
                    />
                </View>
                
            )
        }
        if (node.name === 'oembed') {
            const value = getStringInBetweenItems(node.attribs.url, '=')
            console.log('value', value)
            setYoutubeId(value)
        }  
    }
    
    const onRefresh = () => {
        setRefreshing(true)
        getNews()  
        setRefreshing(false)    
      } 

    
        
    const getNews = async () => {
        try {
            const response = await dispatch(getNewsData(news_id))
            if (response.error) {
                Alert.alert(response.err)
            } else {                
                return response.news
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getNews()
    }, [news_id]) 
    
    useEffect(()=> {
        console.log(youtubeId)
    }, [youtubeId])
    return (
    <View style={{ position: 'relative', flex: 1}} >
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
            !loading && news ? <ScrollView
            style={styles.news} 
            refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[Colors.brand, Colors.secondary, Colors.caption]}
                  tintColor={Colors.brand}
                />
              }
            >
            { 
                youtubeId ? (
                <WebView
                    source={{ uri: "https://www.youtube.com/embed/"+youtubeId}}
                    startInLoadingState={true} 
                    allowsFullscreenVideo={true}
                    renderLoading={() => <ActivityIndicator color={Colors.secondary} size='large' />}
                    renderError={(errorName) => <View style={styles.errorView}>
                        <Text>{errorName} Occurred, Reload Page</Text>
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
                    }
                    style={{
                        minHeight: 250,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: Dimensions.get('window').width
                    }}
                />
                ) : null
            }
            {
                !youtubeId ? 
                <View style={styles.imageContainer}>
                    <ImageBackground source={{uri: news.media.thumbnail}} style={styles.image} />
                </View> : null
            }
            <View style={styles.articleCategoryContainer}>
                <Text style={styles.articleCategoryText}>Business</Text>
                <AntDesign name="right" size={12} color="black" />
                <Text style={styles.articleCategoryText}>{news.interests.map(interest => interest.interest).join(', ')}</Text>
            </View>
            <View style={styles.newsDetails}>
                <View style={styles.crumbs}>
                    <View>
                        <Text style={styles.newsTitle}>{news.title}</Text>
                        <Text style={styles.newsCaption}>{news.caption}</Text>
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
                            {
                                !news?.profile_picture && 
                                <View 
                                    style={{                
                                        width: 36,
                                        height: 26,        
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <FontAwesome5 name="user-alt" size={14} color={Colors.text1} /> 
                                </View>
                            }                    
                            {
                                news?.profile_picture &&
                                <Image resizeMode="cover" source={{ uri: news?.profile_picture }} style={{ width: 18, height: 18, borderRadius: 100, justifyContent: 'center', alignItems: 'center', marginRight: 1 }} />
                            }  
                            <Text style={styles.newsSummaryText}> {news.author}</Text>
                        </View>
                        
                    </View>
                </View>
                <View>
                    <View style={{
                        marginTop: 25,
                        marginBottom: 180,  
                        fontFamily: 'DMRegular',                       
                    }}>
                        <HTMLView
                            value={`${news.content}`}
                            stylesheet={styling}  
                            renderNode={renderNode}                          
                        />                        
                    </View>
                </View>                        
        </View>            
        </ScrollView>
        : null
        }
        
        <ArticleBottomTab newsTitle={news.title} id={news_id} />
    </View>        
    )
}

export default ArticleRead;

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
        width: Platform.OS === 'ios' ? Dimensions.get('window').width /1.09 : Dimensions.get('window').width,                
    },
    image: {
        height: 170,        
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
        marginLeft: 6,
        textTransform: 'capitalize'
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