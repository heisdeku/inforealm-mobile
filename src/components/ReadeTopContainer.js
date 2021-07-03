import React, { useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import Colors from '../colors/colors'
import {
SimpleLineIcons,
AntDesign   
} from '@expo/vector-icons'

import RBSheet from 'react-native-raw-bottom-sheet'
import { ReaderInterestItem } from './Reader/ReaderInterestItem'

const interests = [
  {
    interest: 'All News',
    interest_id: '0',
  },
  {
    interest: 'Politics',
    interest_id: '1',
  },
  {
    interest: 'Video',
    interest_id: '2',
  },
  {
    interest: "Eidtor's Pick",
    interest_id: '3',
  },
  {
    interest: 'History',
    interest_id: '4',
  },
  {
    interest: 'Science',
    interest_id: '5',
  },
  {
    interest: 'Trending',
    interest_id: '6',
  },
  {
    interest: 'Health',
    interest_id: '7',
  },
  {
    interest: 'Business',
    interest_id: '9',
  },
  {
    interest: 'Sport',
    interest_id: '10',
  },
  {
    interest: 'Exclusive',
    interest_id: '11',
  },
  {
    interest: 'Documentaries',
    interest_id: '12',
  },
  {
    interest: 'Investigation',
    interest_id: '13',
  },
]

export const ReaderTopContainer = () => {
  const refRBSheet = useRef()
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 17,  
          borderBottomColor: '#cdcccc',
          borderBottomWidth: 0.5,
          paddingBottom: 21       
        }}
      >
        <View style={styles.editorContainer}>
          <Text style={styles.editorText}>Editor's Pick</Text>
        </View>
        <View>
          <TouchableOpacity style={{ 
            paddingRight: 12
          }} onPress={() => refRBSheet.current.open()}>
            <View style={styles.organize}>
              <Text style={styles.organizeText}>Organize Your Feeds</Text>
              <SimpleLineIcons  style={styles.equalizer} name="equalizer" size={14} color={Colors.secondary} />              
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={330}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
          draggableIcon: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            width: 134,
            marginBottom: 5,
            marginTop: 17,
          },
          container: {
            height: Dimensions.get('window').height / 1.16,
            backgroundColor: '#F7F7F7',
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            paddingHorizontal: 4,
          },
        }}
      >
        <View style={styles.interestOverlayContainer}>
        <TouchableOpacity style={styles.closeIcon} onPress={() => refRBSheet.current.close()}>          
            <AntDesign name="close" size={24} color="black" />          
          </TouchableOpacity>
          <View style={styles.interestOverlayHeading}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'DMSerif',
                fontSize: 28,
                letterSpacing: 0.36
              }}
            >
              Select your interests
            </Text>
            <Text style={styles.interestOverlayText}>
              Select your interests to curate your news feed according to your favourites
            </Text>
          </View>
          <View style={styles.interestOverlayInterests}>
            {interests.map((i) => {
              return (
                <ReaderInterestItem name={i.interest} key={i.interest_id} />
              )
            })}
          </View>
          <TouchableOpacity onPress={() => refRBSheet.current.close()}>
            <View style={styles.doneBtn}>
              <Text style={styles.doneBtnText}>Done</Text>
            </View>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  editorContainer: {
    width: '60%',    
  },
  editorText: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'DMBold', 
    paddingLeft: 15,   
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
    transform: [{ rotate: '90deg' }],
    marginLeft: 16,        
  },
  interestOverlayContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative'
  },
  interestOverlayHeading: {
    marginTop: 37,
    marginBottom: 1,
  },
  interestOverlayInterests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  interestOverlayText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign:'center',
    maxWidth: '80%',
    marginTop: 8
  },
  doneBtn: {
    height: 50,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    marginTop: 15,
    borderRadius: 8,
  },
  doneBtnText: {
    fontFamily: 'DMBold',
    color: 'white',
    fontSize: 16,
  },

  closeIcon: {
    position: 'absolute',
    right: 9
  }
})
