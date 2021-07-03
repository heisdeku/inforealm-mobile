import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export const ReaderInterestItem = ({ name, state }) => {
  const [selected, setSelected] = useState(state || false)
  const setInterest = (id) => {
    setSelected(!selected)
  }
  useEffect(() => {})
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
    alignItems: 'center',          
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#cdcccc',
    borderRadius: 8,
    textAlign: 'center',
    paddingHorizontal: 28,
    paddingVertical: 13,
    minWidth: 108,
    marginHorizontal: 6,
  },
  interestSelected: {    
    height: 50,
    marginVertical: 10,    
    borderWidth: 1,
    borderColor: '#cdcccc',
    borderRadius: 8,    
    alignItems: 'center',    
    paddingVertical: 13,
    paddingHorizontal: 28,
    minWidth: 108,
    marginHorizontal: 6,
    backgroundColor: '#050618',
  },
  interestText: {
    color: '#343A40',
    fontSize: 16
  },
  interestTextSelected: {
    color: '#f7f7f7',
    fontSize: 16
  },
})
