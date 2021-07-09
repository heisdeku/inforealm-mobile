import React from 'react'
import {
  Alert,    
  StyleSheet,
  Dimensions,
} from 'react-native'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import ReaderSliderNewsItem from './ReaderSliderNewsItem'
import { CustomPagination } from './CustomPagination'

const { width } = Dimensions.get('window')

export default ({ data }) => {
  const scrollRef = React.useRef(null)
  const onChangeIndex = ({ index, prevIndex }) => {
    // console.log({ index, prevIndex })
  }
  return (
    <SwiperFlatList
      autoplay      
      autoplayLoop
      showPagination
      PaginationComponent={CustomPagination}
      ref={scrollRef}
      onChangeIndex={onChangeIndex}
      style={styles.container}
      style={data !== undefined && data.length > 0 ? { height: 200} : { height: 20}}
    >
      {
        data !== undefined && data.length > 0 && data.map((d, i) => {
          return <ReaderSliderNewsItem key={i} news={d} />
        })
      }      
    </SwiperFlatList>
  )
}

const styles = StyleSheet.create({
  container: {    
    borderRadius: 80,
    width: width,
  },
})
