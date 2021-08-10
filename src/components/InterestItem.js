import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedStart } from '../redux/actions/feed.action'
import { getLatestFeed, getLatestFeedByInterest } from '../redux/operations/feed.op'
import { getCurrentUser } from '../redux/selectors/user.selector'


export const InterestItem = ({ name, id, state }) => {
  const user = useSelector(getCurrentUser)
  const dispatch = useDispatch()
  const [selected, setSelected] = useState(state || false)  
  const setInterest = async () => {
    setSelected(!selected)
    if (!selected) {
      let idData = new FormData()
      idData.append('interest_id', id) 
      //await dispatch(getFeedStart())          
      await dispatch(getLatestFeedByInterest(idData))        
    
    } else {
      await dispatch(getLatestFeed())
    }

  }  
  const styling = selected ? styles.interestSelected : styles.interestContainer
  const text = selected ? styles.interestTextSelected : styles.interestText
  return (
    <View style={styling}>
      <TouchableOpacity onPress={() => setInterest()}>
        <Text style={text}>{name}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  interestContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cdcccc',
    borderRadius: 8,
    paddingVertical: 7,
    paddingRight: 15,
    paddingLeft: 17,
    textAlign: 'center',
    minWidth: 55,
    marginHorizontal: 6,
  },
  interestSelected: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cdcccc',
    borderRadius: 8,
    paddingVertical: 7,
    paddingRight: 15,
    paddingLeft: 17,
    textAlign: 'center',
    minWidth: 55,
    marginHorizontal: 6,
    backgroundColor: '#050618',
  },
  interestText: {
    color: '#343A40',
  },
  interestTextSelected: {
    color: '#f7f7f7',
  },
})
