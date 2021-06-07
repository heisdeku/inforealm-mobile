import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export const InterestItem = ({ interest, state }) => {
  const [selected, setSelected] = useState(state || false)
  const setInterest = (id) => {
    setSelected(!selected)
  }
  useEffect(() => {

  })
  return (
    <TouchableOpacity onPress={() => setInterest()}>
      <View style={
        selected ? styles.interestSelected : styles.interestContainer}
      >
        <Text style={styles.interestText}>{name}</Text>
      <View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    interestContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#cdcccc',
        borderRadius: 8
    },
    interestSelected: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#cdcccc',
        borderRadius: 8,
        background: '#050618'

    },
    interestText: {
      color: '#343A40'
    }
});
