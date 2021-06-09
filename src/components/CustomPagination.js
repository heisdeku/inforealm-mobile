import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Pagination } from 'react-native-swiper-flatlist'
import Colors from '../colors/colors'

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  paginationContainer: {
    bottom: 10,
    left: width / 2.6,
  },
  pagination: {
    borderRadius: 50,
    width: 10,
    height: 10,
  },
})

export const CustomPagination = (props) => {
  return (
    <Pagination
      {...props}
      paginationStyle={styles.paginationContainer}
      paginationStyleItem={styles.pagination}
      paginationDefaultColor='white'
      paginationActiveColor='#E33127'
    />
  )
}
