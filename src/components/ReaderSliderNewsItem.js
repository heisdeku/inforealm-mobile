import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  ImageBackground,  
} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Feather, MaterialIcons } from '@expo/vector-icons'

const { width } = Dimensions.get('window')
const ReaderSliderNewsItem = ({ news }) => {
  const navigation = useNavigation();
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
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Article', { screen: 'ArticleRead', params: { news_id: news.id }})}>
        <View          
        >
          <ImageBackground
            source={{uri: news.media.thumbnail}}
            style={styles.imageBackground}
          />
        </View>
        <View style={styles.newsDetails}>
          <View style={styles.crumbs}>
            <Text style={styles.crumbText}>News </Text>
            <Feather name='chevron-right' size={14} color={'white'} />
            <Text style={styles.crumbText}> {news.interests.map(interest => interest.interest).join(', ')}</Text>
          </View>
          <Text style={styles.newsTitle}>
            {news.title}
          </Text>
          <View style={styles.newsSummary}>
            <View style={styles.newsSummaryItem}>
              <Feather size={14} color={'white'} name='clock' />
              <Text style={styles.newsSummaryText}> {news.date}</Text>
            </View>
            <View style={styles.newsSummaryItem}>
              <MaterialIcons size={14} color={'white'} name='library-books' />
              <Text style={styles.newsSummaryText}> {news.time_to_read} read</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {    
    width,
    paddingHorizontal: 15,
    height: 200,
    color: '#F7F7F7',
    borderRadius: 50
  },
  imageBackground: {
    flex: 1,
    width: width * 0.94,
    resizeMode: 'cover',
    height: 200,    
    backgroundColor: 'linear-gradient(0deg, rgba(5, 6, 24, 0.87) 0%, rgba(5, 6, 24, 0) 59.98%)',
  },
  crumbs: {
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 7,
    width: 110,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
  },
  crumbText: {
    fontFamily: 'DMRegular',
    fontWeight: '500',
    color: '#F7F7F7',
  },
  newsTitle: {
    fontSize: 20,
    fontFamily: 'DMBold',
    marginTop: 40,
    paddingLeft: 10,
    color: '#F7F7F7',
  },
  newsSummary: {
    flexDirection: 'row',
    marginTop: 15,
    paddingLeft: 10,
  },
  newsSummaryText: {
    fontSize: 14,
    paddingLeft: 5,
    fontFamily: 'DMRegular',
    color: '#F7F7F7',
  },
  newsSummaryItem: {
    flexDirection: 'row',
    marginRight: 25,
  },
})

export default ReaderSliderNewsItem
