import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'
import Colors from '../../colors/colors'
import ReaderItem from '../../components/ReaderItem'
import SliderContiner from '../../components/SliderContiner'
import { Feather } from '@expo/vector-icons'

const { width } = Dimensions.get('window')
const ReaderScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }
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
        <View style={styles.container}>
          <View style={styles.heading}>
            <SliderContiner />
          </View>
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
                <ReaderItem />
                <ReaderItem />
                <ReaderItem />
                <ReaderItem />
                <ReaderItem />
                <ReaderItem />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    paddingTop: 20,
    paddingBottom: 18,
    width: width,
    borderBottomColor: '#cdcccc',
    borderTopColor: '#cdcccc',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    marginVertical: 40,
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
