import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import Colors from '../../colors/colors';
import DocumentaryItem from '../../components/DocumentaryItem';
import { Feather } from '@expo/vector-icons';


import { ReaderStack } from '../../stacks/reader.stacks'

const ReaderScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
        setRefreshing(false);
    }, 2000);
}

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}
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
                <Text style={styles.headingText}>Reader</Text>
                <Text style={{fontFamily: 'DMRegular', fontSize: 13}}>Welcome sensei</Text>
            </View>
            <View style={styles.body}>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    minHeight: 100,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 18,
    paddingHorizontal: 15
  },
  headingText: {
    fontSize: 29,
    fontFamily: 'DMSerif'
  },
  body: {
    backgroundColor: '#E5E5E5',
    flex: 1,
    paddingVertical: 15
  }
})


export default ReaderScreen;
