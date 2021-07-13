import React, { useEffect, useState, useRef  } from 'react';
import { StyleSheet, ScrollView, Text, View, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { EvilIcons, AntDesign, Feather } from '@expo/vector-icons';
import RBSheet from 'react-native-raw-bottom-sheet'

import Colors from '../colors/colors';
import ArticleCommentsContainer from './ArticleCommentsContainer';

const ArticleBottomTab = (props) => {    
    const refRBSheet = useRef()
    const [ likeStatus, setLikeStatus ] = useState(false)
    const [morePressed, setMorePressed] = useState(false)
    const { navigation, state } = props;
    // const [mode, setMode] = useState(0);
    const connection = {
        state: {
            index: 5
        }
    }

    const mode = new Animated.Value(0);

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(mode, {
                toValue: mode._value === 0 ? 1 : 0,
                useNativeDriver: false,
                timing: 2
            })
        ]).start();
    }
    useEffect(() => {
        Animated.sequence([
            Animated.timing(mode, {
                toValue: morePressed ? 1 : 0,
                useNativeDriver: false,
                timing: 2
            })
        ]).start()
    }, [morePressed])

    const componentHeight = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [70, Dimensions.get('window').height]
    })

    return (
        <Animated.View
          style={{height: 120, backgroundColor: 'transparent', width: Dimensions.get('window').width, position: 'absolute', top: Dimensions.get('window').width + 200, left: 0}}
        >
            <View style={styles.tabBar}>
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                  <View style={styles.tab}>
                    <EvilIcons name="comment" size={28} color="#050618" />
                      <Text style={styles.tabLabel}>Comment</Text>
                  </View>
              </TouchableOpacity>
                <TouchableOpacity onPress={() => setLikeStatus(!likeStatus)}>
                    <View style={styles.tab}>                        
                        <AntDesign name="like2" size={24} color={likeStatus ? Colors.secondary : '#050618'} />
                        <Text style={{ ...styles.tabLabel, color: likeStatus ? Colors.secondary : '#050618' }}>Like</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.tab}>
                        <Feather name="share" size={20} color="#050618" />
                        <Text style={styles.tabLabel}>Share</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={() => setMorePressed(!morePressed)} onPress={() => handlePress()}>
                    <View>                        
                        <AntDesign name="up" size={18} color="black" color={ morePressed ? Colors.secondary : '#050618'} />                                                
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}                
                customStyles={{
                wrapper: {                
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                },
                draggableIcon: {
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    width: 140,                    
                },
                container: {
                    height: Dimensions.get('window').height / 1.12,                    
                    borderTopRightRadius: 32,
                    borderTopLeftRadius: 32,   
                    backgroundColor: '#F7F7F7',                 
                },
                }}
            >
                                
                <ArticleCommentsContainer />                                    
            </RBSheet>
            </ScrollView>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        height: '100%',
        width: '100%',
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderColor: '#cdcccc',
        borderWidth: 0.5,
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingBottom: 20,
        alignItems: 'center',
        height: 70,
        paddingTop: 10,
        backgroundColor: '#fff',
    },
    tab: {
        width:( Dimensions.get('window').width)/ 4,        
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center'
    },
    tabLabel: {
        fontSize: 12,
        color: '#8E8D8D',
        marginTop: 5,
        fontFamily: 'DMRegular',
        fontWeight: '500',
        marginLeft: 6,
    },
    closeBtn: {
        height: 50,
        width: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 0.3,
        borderColor: Colors.secondary,
        // position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionBtn: {
        height: 50,
        width: 50,
        backgroundColor: Colors.secondary,
        borderRadius: 25,
        borderWidth: 0.3,
        borderColor: Colors.secondary,
        // position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default ArticleBottomTab;
