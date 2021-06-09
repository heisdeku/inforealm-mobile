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

const ReaderDocumentaryItem = ({ item }) => {
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
          source={require('../../assets/images/demo-documentary.png')}
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
        <TouchableOpacity>
          <Text style={styles.title}>How these economic super powers...</Text>
        </TouchableOpacity>
        <Text style={styles.caption}>
          The African continent has 15% of the world’s...
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}
        >
          <View style={styles.date}>
            <Feather size={14} color={Colors.text1} name='clock' />
            <Text style={styles.dateText}> Oct 27, 2020</Text>
          </View>
          <View style={styles.date}>
            <Ionicons name='md-play-circle' size={14} color={Colors.text1} />
            <Text style={styles.dateText}> 3 min watch</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  news: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cdcccc',
    flexDirection: 'row',
    marginTop: 15,
  },
  Image: {
    height: 100,
    width: 116,
    borderRadius: 10,
    paddingTop: 70,
    paddingLeft: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'DMBold',
    marginVertical: 3,
    color: 'black',
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
    marginBottom: 4,
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
