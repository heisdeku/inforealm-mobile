import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, TouchableOpacity, Text, ScrollView, RefreshControl, ActivityIndicator, View, Alert, ImageBackground, Dimensions } from 'react-native';
import { Feather, MaterialIcons, AntDesign, FontAwesome5  } from '@expo/vector-icons';
import Colors from '../../colors/colors';
import ArticleBottomTab from '../../components/ArticleBottomTab';
import { getNewsData } from '../../redux/operations/news.op';
import { hasError, isLoading, selectNews, selectNewsCaption, selectNewsTitle } from '../../redux/selectors/news.selector';

const ArticleRead = ({ route }) => {
    const dispatch = useDispatch()
    const loading = useSelector(isLoading)
    const error = useSelector(hasError)
    const news = useSelector(selectNews)
    const title = useSelector(selectNewsTitle)
    const caption = useSelector(selectNewsCaption)
    const { news_id } = route.params; 

    const [refreshing, setRefreshing] = useState(false) 

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
          
    return (
    <View style={{ position: 'relative', flex: 1}} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[Colors.brand, Colors.secondary, Colors.caption]}
          tintColor={Colors.brand}
        />
      }>
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
                <View>
                    <Text style={styles.articleWriteUp}>
                        {news.content}
                    </Text>
                </View>                        
        </View>            
        </ScrollView>
        : null
        }
        
        <ArticleBottomTab id={news_id} />
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
        paddingHorizontal: 20,            
        width: Dimensions.get('window').width,
    },
    imageContainer: {
        width: Dimensions.get('window').width,                
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
        marginTop: 24,     
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 30,
    letterSpacing: -0.408,
    color: '#343A40',
    marginBottom: 100
    }
});
