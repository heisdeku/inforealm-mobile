import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../colors/colors'
import SwipeableContainer from './SwipeableContainer';
import { truncate } from '../helpers/utils';


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
    <SwipeableContainer>
      <View style={styles.news}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: news.media.thumbnail}}
          style={styles.image}
        />
      </View>
      <View style={styles.newsDetails}>
        <View style={styles.crumbs}> 
        <Text style={styles.crumbText}>{news.interests[0].interest}</Text>         
          {/*<Text style={styles.crumbText}>{news.interests.map(interest => interest.interest).join(', ')}</Text>*/}
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
          {truncate(news.caption, 65)}
        </Text>
        <View style={styles.newsSummary}>
          <View style={styles.newsSummaryItem}>
            <Feather size={14} color={Colors.text1} name='clock' />
            <Text style={{...styles.newsSummaryText, marginLeft: 5}}> {news.date}</Text>
          </View>
          <View style={styles.newsSummaryItem}>
            <MaterialIcons
              size={14}
              color={Colors.text1}
              name='library-books'
            />
            <Text style={{...styles.newsSummaryText, marginLeft: 5}}> {news.time_to_read} min read</Text>
          </View>
          <View style={styles.newsSummaryItem}>
            <Text style={{...styles.newsSummaryText, marginRight: 4}}>By</Text>
            {
              !news?.profile_picture && <View style={{                
                    width: 36,
                    height: 26,        
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <MaterialCommunityIcons name="account" size={18} color="#6C757D" style={{ marginRight: 2}} />
            </View>
            }                    
            {
              news?.profile_picture &&
              <Image resizeMode="cover" source={{ uri: news?.profile_picture }} style={{ width: 16, height: 16, borderRadius: 100, justifyContent: 'center', alignItems: 'center', marginRight: 2 }} />
            } 
            
            <Text style={styles.newsSummaryText}>{news.author}</Text>
          </View>
        </View>
      </View>
    </View>
    </SwipeableContainer>         
  )
}

export default ReaderItem

const styles = StyleSheet.create({
  news: {
    paddingVertical: 11,
    paddingLeft: 15,           
    flexDirection: 'row',
    paddingTop: 15,
    backgroundColor: '#F7F7F7',
    position: 'relative',
    borderBottomColor: '#cdcccc',
    borderBottomWidth: 1
  },
  imageContainer: {
    width: 120,
    marginRight: 19,
    borderRadius: 8
  },
  image: {
    height: 170,
    width: 112,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  crumbs: {
    flexDirection: 'row',       
  },
  crumbText: {
    fontFamily: 'DMBold',
    fontWeight: '500',
    color: '#343A40'
  },
  newsTitle: {
    fontSize: 18,
    fontFamily: 'DMBold',
    marginBottom: 8,
    color: '#2B2D42',
    lineHeight: 24,
    letterSpacing: 0.38
  },
  newsDetails: {
    flex: 1,        
  },
  newsCaption: {
    color: Colors.text2,
    fontSize: 14,    
    fontFamily: 'DMRegular',
    marginBottom: 5,
  },
  newsSummary: {        
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',    
    bottom: 0,
    marginTop: 'auto',
    width: 210, 
  },
  newsSummaryText: {
    fontSize: 12,
    fontFamily: 'DMRegular',
    color: '#8E8D8D', 
    textTransform: 'capitalize'       
  },
  newsSummaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '40%', 
    marginBottom: 8
  },
})
