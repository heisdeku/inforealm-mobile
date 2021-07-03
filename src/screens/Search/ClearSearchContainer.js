import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import Colors from '../../colors/colors'
import {
    EvilIcons   
} from '@expo/vector-icons'

export const ClearSearchContainer = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 13,               
        }}
      >
        <View style={styles.editorContainer}>
          <Text style={styles.editorText}>Search History</Text>
        </View>
        <View>
          <TouchableOpacity style={{ width: 70, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <View style={styles.organize}>
              <Text style={styles.organizeText}>Clear all</Text>
              <EvilIcons name="close"  style={styles.equalizer} size={20} color={Colors.secondary} />                     
            </View>
          </TouchableOpacity>
        </View>
      </View>
     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  editorContainer: {
    width: '75%',    
  },
  editorText: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: '#343A40', 
  },
  organize: {
    flexDirection: 'row',    
    },
  organizeText: {
    fontSize: 14,
    color: Colors.secondary,
    fontFamily: 'DMRegular',
  },
  equalizer: {
    paddingLeft: 10,
    paddingRight: 11        
  },
})
