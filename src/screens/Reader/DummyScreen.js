import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native'
import ReaderItem from '../../components/ReaderItem'
import ReaderDocumentaryItem from '../../components/ReaderDocumentaryItem'
import { InterestContainer } from '../../components/InterestContainer'
import Colors from '../../colors/colors'
import { ReaderTopContainer } from '../../components/ReadeTopContainer'

const DummyScreen = () => {
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
          {/*<InterestContainer />*/}
          <ReaderTopContainer />
          <View style={{ flex: 1 }}>
            <ReaderItem />
            <ReaderDocumentaryItem />
            <ReaderItem />
            <ReaderItem />
            <ReaderDocumentaryItem />
            <ReaderItem />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DummyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
