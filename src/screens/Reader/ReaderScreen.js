import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'
import Colors from '../../colors/colors'
import ReaderItem from '../../components/ReaderItem'
import SliderContiner from '../../components/SliderContiner'
import { Feather } from '@expo/vector-icons'
import { fetchTopNews, getTrend } from '../../redux/operations/feed.op'
import { error, isLoading, selectTopNews, selectTrendingFeed } from '../../redux/selectors/feed.selector'
import ReaderDocumentaryItem from '../../components/ReaderDocumentaryItem'


const { width } = Dimensions.get('window')

const ReaderScreen = ({ navigation }) => {
  const loading = useSelector(isLoading)
  const hasError = useSelector(error)
  const trend = useSelector(selectTrendingFeed)
  const topNews = useSelector(selectTopNews)

  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true)
    dispatch(getTrend())  
    dispatch(fetchTopNews())  
    setRefreshing(false) 
  }

  const getTrendingFeed = async () => {
    dispatch(getTrend())
    dispatch(fetchTopNews())
  }

  useEffect(() => {
    getTrendingFeed()
  }, [navigation])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
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
          loading &&
          <View style={styles.loadingView}>
              <ActivityIndicator color={Colors.secondary} size='large' />
          </View>
        }
        {
          !loading && hasError ?
          <View style={styles.errorView}>
              <Text>{hasError}</Text>
              <TouchableOpacity style={{width: '100%'}} onPress={() => getTrend()}>
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
        <View style={styles.container}>          
            {
              !loading && trend.length ?    
                <View style={styles.heading}>    
                  {
                    trend.map((t,i) => {                  
                        return <SliderContiner data={t}  />
                    })
                  }  
                </View>
              :
              null
            }  
            {
        !loading && topNews.length ?
          <View style={styles.body}>
          <View style={styles.category}>
            <View style={styles.categoryHeadView}>
              <View style={{ width: '50%' }}>
                <Text style={styles.categoryHead}>Top News</Text>
                <Text style={styles.categoryCaption}>
                  All Curated Top News From The Past Week till Now
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('TopNews')}
                style={{ flexDirection: 'row' }}
              >
                <Text style={{ fontSize: 14, color: Colors.secondary }}>
                  View all{' '}
                </Text>
                <Feather
                  size={18}
                  name='chevron-right'
                  color={Colors.secondary}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
            {
              topNews.map((t,i) => {
                if (t.media.videos.length) {
                  return <ReaderDocumentaryItem news={t} key={i} navigation={navigation} />  
                }
                  return <ReaderItem news={t} key={i} navigation={navigation} />
                  
              })
            }
            </View>
          </View>
        </View>
          :
          null
      }                     
        </View>
        {
        !trend.length && !topNews.length && !loading ?
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.emptyView}>
                <Text style={styles.emptyText}>Here’s a little empty</Text>
            </View>
        </View>
        :
        null 
    }  
      </ScrollView>
    </SafeAreaView>
  )
}

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
  heading: {
    paddingTop: 20,
    paddingBottom: 18,
    width: width,
    borderBottomColor: '#cdcccc',
    borderTopColor: '#cdcccc',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    marginVertical: 20,
  },
  categoryHead: {
    fontSize: 20,
    fontFamily: 'DMBold',
    paddingHorizontal: 15,
  },
  categoryHeadView: {
    borderBottomColor: '#cdcccc',
    borderBottomWidth: 0.5,
  },
  categoryItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryHeadView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
  },
  categoryCaption: {
    fontSize: 12,
    color: Colors.text2,
    paddingLeft: 15,
  },
})

export default ReaderScreen
