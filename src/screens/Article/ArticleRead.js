import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, TouchableOpacity, Text, ScrollView, Platform, ActivityIndicator, View, Alert, ImageBackground, Dimensions, RefreshControl } from 'react-native';
import { Feather, MaterialIcons, AntDesign, FontAwesome5  } from '@expo/vector-icons';
import Colors from '../../colors/colors';
import ArticleBottomTab from '../../components/ArticleBottomTab';
import { getNewsData } from '../../redux/operations/news.op';
import { hasError, isLoading, selectNews, selectNewsCaption, selectNewsTitle } from '../../redux/selectors/news.selector';
import HTMLView from 'react-native-htmlview'

const ArticleRead = ({ route }) => {
    const dispatch = useDispatch()
    const loading = useSelector(isLoading)
    const error = useSelector(hasError)
    const news = useSelector(selectNews)        
    const { news_id } = route?.params; 
    const [refreshing, setRefreshing] = useState(false) 
    
    const onRefresh = () => {
        setRefreshing(true)
        getNews()  
        setRefreshing(false)    
      } 
        
    const getNews = async () => {
        console.log('dispatching')
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
            <View style={styles.imageContainer}>
                <ImageBackground source={{uri: news.media.thumbnail}} style={styles.image} />
            </View>
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
                        <FontAwesome5 name="user-alt" size={14} color={Colors.text1} />                            
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