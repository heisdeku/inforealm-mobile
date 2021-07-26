import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  View,
  Text,
  RefreshControl,
  TouchableOpacity
} from 'react-native'
import ReaderItem from '../../components/ReaderItem'
import ReaderDocumentaryItem from '../../components/ReaderDocumentaryItem'
import InterestContainer from '../../components/InterestContainer'
import Colors from '../../colors/colors'
import ReaderTopContainer from '../../components/ReadeTopContainer'
import { getLatestFeed } from '../../redux/operations/feed.op'
import { error, isLoading, selectLatestFeed } from '../../redux/selectors/feed.selector'
import { getCurrentUser } from '../../redux/selectors/user.selector'
import useAsync from '../../hooks/useAsync'
import { selectNews, newsState } from '../../redux/selectors/news.selector'
import CurrentNewsContainer from '../../components/CurrentNewsContainer'


const DummyScreen = ({ navigation }) => {
  const loading = useSelector(isLoading)
  const hasError = useSelector(error)
  const feed = useSelector(selectLatestFeed)
  const user = useSelector(getCurrentUser)
  const dispatch = useDispatch()
  const news = useSelector(selectNews)  
  const isActive = useSelector(newsState)  
  
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true)
    getFeed()
    setRefreshing(false)    
  }  

  const getFeed = async () => {
    const response = user?.user_id ? await dispatch(getLatestFeed(user?.user_id)) : await dispatch(getLatestFeed())
    return response    
  }

  useEffect(() => {    
    let isMounted = true; 
              // note mutable flag
    if (isMounted) getFeed()
    else console.log("aborted setState on unmounted component")    
    return () => {         
        isMounted = false                
    };
     // use cleanup to toggle value, if unmounted
  }, [dispatch, setRefreshing]); 

  return (
    <SafeAreaView style={{ flex: 1, position: 'relative' }}>
      {
        loading &&
        <View style={styles.loadingView}>
            <ActivityIndicator color={Colors.secondary} size='large' />
        </View>
      }
      {
        !loading && hasError ?
        <View style={styles.errorView}>
            <Text>{hasError.includes('Request failed with status code 500') ? 'Issues currently from our server, Our Engineers would fix this sooon. Thanks' : hasError}</Text>
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
          !loading && feed.length ?
            <View style={styles.container}> 
              {!user?.user_id && <InterestContainer />}
              {user?.user_id && <ReaderTopContainer />}   
              <FlatList 
                style={{ flex: 1, position:   'relative' }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[Colors.brand, Colors.secondary, Colors.caption]}
                    tintColor={Colors.brand}
                  />
                }
                data={feed} 
                keyExtractor={(item) => item.id}
                renderItem={({item}) => {                
                  if (item.media.videos.length) {
                    return (
                      <ReaderDocumentaryItem news={item} navigation={navigation} />
                    )                  
                  } else {
                    return (
                      <ReaderItem news={item} navigation={navigation} />
                    )                  
                  }
                }} 
              />
          </View>          
          :
          null
      }   
      {
        !hasError && !feed.length && !loading ?
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.emptyView}>
                <Text style={styles.emptyText}>Here’s a little empty</Text>
            </View>
        </View>
        :
        null 
    }    
    {isActive && news && <CurrentNewsContainer />}           
    </SafeAreaView>
  )
}

export default DummyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  separator: {
    backgroundColor: '#cdcccc',
    height: StyleSheet.hairlineWidth,
  },
})
