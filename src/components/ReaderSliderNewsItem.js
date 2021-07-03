import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  ImageBackground,  
} from 'react-native'

import { Feather, MaterialIcons } from '@expo/vector-icons'

const { width } = Dimensions.get('window')
const ReaderSliderNewsItem = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View          
        >
          <ImageBackground
            source={require('../../assets/images/american-flag.png')}
            style={styles.imageBackground}
          />
        </View>
        <View style={styles.newsDetails}>
          <View style={styles.crumbs}>
            <Text style={styles.crumbText}>News </Text>
            <Feather name='chevron-right' size={14} color={'white'} />
            <Text style={styles.crumbText}> Interest</Text>
          </View>
          <Text style={styles.newsTitle}>
            The wave of dark money in American Politics
          </Text>
          <View style={styles.newsSummary}>
            <View style={styles.newsSummaryItem}>
              <Feather size={14} color={'white'} name='clock' />
              <Text style={styles.newsSummaryText}> 30 mins ago</Text>
            </View>
            <View style={styles.newsSummaryItem}>
              <MaterialIcons size={14} color={'white'} name='library-books' />
              <Text style={styles.newsSummaryText}> 3 min read</Text>
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
