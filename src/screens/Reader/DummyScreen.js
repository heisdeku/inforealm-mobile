import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native';
import ReaderItem from '../../components/ReaderItem';
import InterestItem from '../../components/InterestItem'
import Colors from '../../colors/colors';


const interests = [{
  interest: "News",
  interest_id: "1"
  },
  {
  interest: "Business",
  interest_id: "2"
  },
  {
  interest: "Sport",
  interest_id: "3"
  },
  {
  interest: "Health",
  interest_id: "4"
  },
  {
  interest: "Investigation",
  interest_id: "5"
  },
  {
  interest: "Politics",
  interest_id: "6"
  },
  {
  interest: "Documentary",
  interest_id: "7"
  },
  {
  interest: "Video",
  interest_id: "8"
}]

const DummyScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
        setRefreshing(false);
    }, 2000);
}
  return (
      <SafeAreaView style={{flex: 1}}>
          <ScrollView style={{flex: 1, backgroundColor: '#E5E5E5'}}
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
              <View style={{ flex: 1}}>
                {
                  interests.map((i) => (
                    <InterestItem name={i.interest} key={i.interest_id}/>
                  ))
                }
              </View>
              <View style={{flex: 1}}>
                <ReaderItem />
                <ReaderItem />
                <ReaderItem />
                <ReaderItem />
                <ReaderItem />
                <ReaderItem />
              </View>
            </View>
          </ScrollView>
      </SafeAreaView>
  )
  }

export default DummyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
