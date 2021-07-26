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
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    marginBottom: 10,
  },
})

export default connect(mapStateToProps)(InterestContainer)