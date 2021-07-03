import React from 'react'
import {
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import ReaderSliderNewsItem from './ReaderSliderNewsItem'
import { CustomPagination } from './CustomPagination'

const { width, height } = Dimensions.get('window')

export default () => {
  const scrollRef = React.useRef(null)
  const onChangeIndex = ({ index, prevIndex }) => {
    // console.log({ index, prevIndex })
  }
  return (
    <SwiperFlatList
      autoplay
      autoplayDelay={3}
      autoplayLoop
      showPagination
      PaginationComponent={CustomPagination}
      ref={scrollRef}
      onChangeIndex={onChangeIndex}
      style={styles.container}
    >
      <ReaderSliderNewsItem />
      <ReaderSliderNewsItem />
      <ReaderSliderNewsItem />
    </SwiperFlatList>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 20,
    width: width,
  },
})