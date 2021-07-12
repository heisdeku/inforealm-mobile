import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import Colors from '../colors/colors'

const ReaderItem = ({ navigation, news }) => { 
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
        <Image
          source={{uri: news.media.thumbnail}}
          style={styles.image}
        />
      </View>
      <View style={styles.newsDetails}>
        <View style={styles.crumbs}>
          <Text style={styles.crumbText}>News </Text>
          <Feather name='chevron-right' size={14} color={Colors.text2} />
          <Text style={styles.crumbText}>{news.interests.map(interest => interest.interest).join(', ')}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.1}
          onPress={() => 
            navigation.navigate('Article', {
              screen: 'ArticleRead',
              params: {news_id: news.id},
            })
            
          }
        >
          <Text style={styles.newsTitle}>
            {news.title}
          </Text>
        </TouchableOpacity>
        <Text style={styles.newsCaption}>
          {news.caption}
        </Text>
        <View style={styles.newsSummary}>
          <View style={styles.newsSummaryItem}>
            <Feather size={14} color={Colors.text1} name='clock' />
            <Text style={styles.newsSummaryText}> {news.date}</Text>
          </View>
          <View style={styles.newsSummaryItem}>
            <MaterialIcons
              size={14}
              color={Colors.text1}
              name='library-books'
            />
            <Text style={styles.newsSummaryText}> {news.time_to_read} min read</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ReaderItem

const styles = StyleSheet.create({
  news: {
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cdcccc',
    flexDirection: 'row',
    marginTop: 15,
    position: 'relative'
  },
  imageContainer: {
    width: 120,
    marginRight: 19,
  },
  image: {
    height: 160,
    width: 116,
    resizeMode: 'cover',
  },
  crumbs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crumbText: {
    fontFamily: 'DMRegular',
    fontWeight: '500',
  },
  newsTitle: {
    fontSize: 20,
    fontFamily: 'DMBold',
    marginVertical: 15,
  },
  newsDetails: {
    flex: 1,
  },
  newsCaption: {
    color: Colors.text2,
    fontSize: 14,
    fontFamily: 'DMRegular',
    marginBottom: 15,
  },
  newsSummary: {        
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newsSummaryText: {
    fontSize: 12,
    fontFamily: 'DMRegular',
    color: '#8E8D8D',
  },
  newsSummaryItem: {
    flexDirection: 'row',
  },
})
