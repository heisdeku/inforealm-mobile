import React, { useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import Colors from '../colors/colors'
import {
SimpleLineIcons,
AntDesign   
} from '@expo/vector-icons'
import { createStructuredSelector } from 'reselect';
import RBSheet from 'react-native-raw-bottom-sheet'
import { ReaderInterestItem } from './Reader/ReaderInterestItem'
import { selectInterests } from '../redux/selectors/interest.selectors';
import { connect, useDispatch, useSelector } from 'react-redux'
import { getLatestFeed } from '../redux/operations/feed.op';
import { getCurrentUser } from '../redux/selectors/user.selector';


const ReaderTopContainer = ({ interests }) => {
  const refRBSheet = useRef()
  const user = useSelector(getCurrentUser)
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 19,  
          borderBottomColor: '#cdcccc',
          borderBottomWidth: 0.5,
          paddingBottom: 23
        }}
      >
        <View style={styles.editorContainer}>
          <Text style={styles.editorText}>Editor's Pick</Text>
        </View>
        <View>
          <TouchableOpacity style={{ 
            paddingRight: 18
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
          <ScrollView contentContainerStyle={styles.interestOverlayInterests}>
            {interests.map((i) => {
              return (
                <ReaderInterestItem name={i.interest} id={i.interest_id} key={i.interest_id} />
              )
            })}
          </ScrollView>
          <TouchableOpacity onPress={() => {
            refRBSheet.current.close()
            dispatch(getLatestFeed(user.user_id))  
          }}>
            <View style={styles.doneBtn}>
              <Text style={styles.doneBtnText}>Done</Text>
            </View>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  )
}

const mapStateToProps = createStructuredSelector({
  interests: selectInterests
})

const styles = StyleSheet.create({
  container: {    
    alignItems: 'center',
  },
  editorContainer: {
    width: '60%',    
  },
  editorText: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'DMBold', 
    paddingLeft: 25,   
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
    position: 'relative',    
  },
  interestOverlayHeading: {
    marginTop: 37,
    marginBottom: 34,
  },
  interestOverlayInterests: {
    flexDirection: 'row',
    paddingHorizontal: 6,
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
    //marginTop: 15,
    borderRadius: 8,
    marginBottom: 30,
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


export default connect(mapStateToProps)(ReaderTopContainer)