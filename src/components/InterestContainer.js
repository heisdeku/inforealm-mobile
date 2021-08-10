import React from 'react'

import { ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInterests } from '../redux/selectors/interest.selectors'
import { InterestItem } from './InterestItem'

const InterestContainer = ({ interests }) => {
  return (
    <ScrollView
      horizontal={true}
      style={styles.interests}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ alignItems: 'center', marginTop: 10,    
      flexDirection: 'row',
      marginBottom: 10,}}
    >
      {interests.map((i) => {
        return <InterestItem name={i.interest} id={i.interest_id} key={i.interest_id} />
      })}
    </ScrollView>
  )
}

const mapStateToProps = createStructuredSelector({
  interests: selectInterests
})

const styles = StyleSheet.create({
  interests: {       
      maxHeight: 80,
      backgroundColor: '#F7F7F7'
  },
})

export default connect(mapStateToProps)(InterestContainer)