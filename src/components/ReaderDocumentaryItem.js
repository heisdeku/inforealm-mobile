import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import Colors from '../colors/colors'
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons'

const ReaderDocumentaryItem = ({ navigation, news }) => {
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
      <View
        style={{
          borderRadius: 4,
          marginRight: 30,
          overflow: 'hidden',
          alignSelf: 'center',
        }}
      >
        <ImageBackground
          source={{uri: news.media.thumbnail}}
          style={styles.Image}
        >
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <View
              style={{
                backgroundColor: '#fff',
                height: 23,
                width: 23,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 11.5,
              }}
            >
              <Ionicons name='md-play-circle' size={24} color='#000' />
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={{ flex: 1 }}>
      <TouchableOpacity 
          onPress={() => 
            navigation.navigate('Article', {
              screen: 'ArticleWatch',
              params: {news_id: news.id},
            })
            
          }
        >
          <Text style={styles.title}>{news.title}</Text>
        </TouchableOpacity>
        <Text style={styles.caption}>
          {news.caption}
        </Text>
        <View
          style={{
            display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              //justifyContent: 'space-between',
              position: 'absolute',
              bottom: 0,
              width: '100%',  
          }}
        >
          <View style={styles.date}>
            <Feather size={14} color={Colors.text1} name='clock' />
            <Text style={styles.dateText}> {news.date}</Text>
          </View>
          <View style={styles.date}>
            <Ionicons name='md-play-circle' size={14} color={Colors.text1} />
            <Text style={styles.dateText}> {news.time_to_read} min watch</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  news: {
    paddingVertical: 12,
    paddingLeft: 15,
    paddingRight: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cdcccc',
    flexDirection: 'row',
    marginTop: 15,
    position: 'relative'
  },
  Image: {
    height: 100,
    width: 116,
    borderRadius: 10,
    paddingTop: 70,
    paddingLeft: 10,
    shadowColor: 'rgba(0, 0, 0, 0.3)'
  },
  title: {
    fontSize: 20,
    fontFamily: 'DMBold',
    marginVertical: 3,
    color: '#2B2D42',
  },
  caption: {
    fontSize: 14,
    fontFamily: 'DMRegular',
    marginBottom: 11,
    color: Colors.text2,
  },
  dateText: {
    color: Colors.text2,
    fontSize: 12,
    fontFamily: 'DMRegular',
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '45%', 
    marginBottom: 8
  },
  rbIcon: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: Colors.secondary,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rbText: {
    fontSize: 16,
    fontFamily: 'DMRegular',
    fontWeight: '500',
  },
  closeBtn: {
    height: 46,
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 24,
  },
  closeBtnText: {
    fontFamily: 'DMBold',
    color: Colors.text2,
    fontSize: 16,
  },
})

export default ReaderDocumentaryItem
