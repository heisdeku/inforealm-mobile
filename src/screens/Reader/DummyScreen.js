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
import { InterestContainer } from '../../components/InterestContainer'
import Colors from '../../colors/colors'
import { ReaderTopContainer } from '../../components/ReadeTopContainer'
import { getLatestFeed } from '../../redux/operations/feed.op'
import { error, isLoading, selectLatestFeed } from '../../redux/selectors/feed.selector'
import { getCurrentUser } from '../../redux/selectors/user.selector'

const DummyScreen = ({ navigation }) => {
  const loading = useSelector(isLoading)
  const hasError = useSelector(error)
  const feed = useSelector(selectLatestFeed)
  const user = useSelector(getCurrentUser)
  const dispatch = useDispatch()
  
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true)
    dispatch(getLatestFeed())    
    setRefreshing(false)    
  }

  const getFeed = async () => {
    dispatch(getLatestFeed())
  }

  useEffect(() => {
    getFeed()
  }, [])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {
        loading &&
        <View style={styles.loadingView}>
            <ActivityIndicator color={Colors.secondary} size='large' />
        </View>
      }
      {
        !loading && hasError ?
        <View style={styles.errorView}>
            <Text>{hasError}</Text>
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
          <ScrollView
            style={{ flex: 1, backgroundColor: '#E5E5E5' }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Colors.brand, Colors.secondary, Colors.caption]}
                tintColor={Colors.brand}
              />
            }
          >                 
            <View style={styles.container}>
              {!user?.user_id && <InterestContainer />}
              {user?.user_id && <ReaderTopContainer />}
              {
                /*
                <FlatList 
                  data={feed} 
                  renderItem={({item}) => {
                    if (item.media.videos.length) {
                      <ReaderDocumentaryItem news={item} navigation={navigation} />
                    } else {
                      <ReaderItem news={item} navigation={navigation} />
                    }
                  }} 
                />*/                
                feed.map((f,i) => {
                  if (f.media.videos.length) {
                    return <ReaderDocumentaryItem news={f} key={i} navigation={navigation} />  
                  }
                    return <ReaderItem news={f} key={i} navigation={navigation} />
                    
                })
              }                                       
            </View>
          </ScrollView>
          :
          null
      }   
      {
        !feed.length && !loading ?
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.emptyView}>
                <Text style={styles.emptyText}>Here’s a little empty</Text>
            </View>
        </View>
        :
        null 
    }               
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
  }
})
