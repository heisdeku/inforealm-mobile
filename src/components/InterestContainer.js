import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { InterestItem } from './InterestItem'
const interests = [
  {
    interest: 'All',
    interest_id: '0',
  },
  {
    interest: 'News',
    interest_id: '1',
  },
  {
    interest: 'Business',
    interest_id: '2',
  },
  {
    interest: 'Sport',
    interest_id: '3',
  },
  {
    interest: 'Health',
    interest_id: '4',
  },
  {
    interest: 'Investigation',
    interest_id: '5',
  },
  {
    interest: 'Politics',
    interest_id: '6',
  },
  {
    interest: 'Documentary',
    interest_id: '7',
  },
  {
    interest: 'Video',
    interest_id: '8',
  },
]
export const InterestContainer = () => {
  return (
    <ScrollView
      horizontal={true}
      style={styles.interests}
      showsHorizontalScrollIndicator={false}
    >
      {interests.map((i) => {
        return <InterestItem name={i.interest} key={i.interest_id} />
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  interests: {
    flex: 1,
    marginTop: 25,
    flexDirection: 'row',
    marginBottom: 10,
  },
})
