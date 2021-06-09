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
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from '@expo/vector-icons'
import RBSheet from 'react-native-raw-bottom-sheet'
import { ReaderInterestItem } from './Reader/ReaderInterestItem'

const interests = [
  {
    interest: 'All',
    interest_id: '0',
  },
  {
    interest: 'News',
    interest_id: '1',
  },
  {
    interest: 'Business',
    interest_id: '2',
  },
  {
    interest: 'Sport',
    interest_id: '3',
  },
  {
    interest: 'Health',
    interest_id: '4',
  },
  {
    interest: 'Investigation',
    interest_id: '5',
  },
  {
    interest: 'Politics',
    interest_id: '6',
  },
  {
    interest: 'Documentary',
    interest_id: '7',
  },
  {
    interest: 'Video',
    interest_id: '8',
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
          marginTop: 5,
        }}
      >
        <View style={styles.editorContainer}>
          <Text style={styles.editorText}>Editor's Pick</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <View style={styles.organize}>
              <Text style={styles.organizeText}>Organize Your Feeds</Text>
              <MaterialCommunityIcons
                name='key'
                size={14}
                color={Colors.secondary}
              />
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
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            width: 134,
            marginBottom: 25,
          },
          container: {
            height: Dimensions.get('window').height / 1.12,
            backgroundColor: '#F7F7F7',
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            paddingHorizontal: 25,
          },
        }}
      >
        <View style={styles.interestOverlayContainer}>
          <View style={styles.interestOverlayHeading}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'DMSerif',
                fontSize: 22,
              }}
            >
              Select your interests
            </Text>
            <Text>
              Lorem Ipsum is simpy dummy text of the typesetting world
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
  },
  organize: {
    flexDirection: 'row',
  },
  organizeText: {
    fontSize: 14,
    color: Colors.secondary,
    fontFamily: 'DMRegular',
  },
  interestOverlayContainer: {
    flex: 1,
    alignItems: 'center',
  },
  interestOverlayInterests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  doneBtn: {
    height: 50,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    marginTop: 30,
    borderRadius: 8,
  },
  doneBtnText: {
    fontFamily: 'DMBold',
    color: 'white',
    fontSize: 16,
  },
})
