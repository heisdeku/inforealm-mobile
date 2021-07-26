import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, Text, View, Image, Dimensions, Animated, TouchableOpacity } from 'react-native';
import Colors from '../colors/colors';
import { selectNews } from '../redux/selectors/news.selector';
import { useNavigation } from '@react-navigation/native';
import CloseIcon from '../svgs/closeIcons';
import { clearNews } from '../redux/actions/news.actions';

const CurrentNewsContainer = () => { 
    const dispatch = useDispatch() 
    const navigation = useNavigation()            
    const news = useSelector(selectNews)          
    return (
        <Animated.View
          style={{height: 60, backgroundColor: 'blue', width: Dimensions.get('window').width, position: 'absolute', borderTopLeftRadius: 8, borderTopRightRadius: 8, borderRadius: 8, bottom: 0, zIndex: 10, left: 0, opacity: 1}}
        >
            <View style={styles.tabBar}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <View style={styles.imageContainer}>
                        {
                            news && news?.media !== undefined && <Image
                            source={{uri: news?.media.thumbnail}}
                            style={styles.image}
                            />
                        }
                        
                    </View>
                    <TouchableOpacity 
                    onPress={() => 
                        navigation.navigate('Article', {
                            screen: 'ArticleRead',                        
                            params: {news_id: news.id},              
                        })}
                    >
                        <Text style={{ fontWeight: '700', fontFamily: 'DMBold', fontSize: 16, lineHeight: 21, color: '#2B2D42'}}>Continue Reading</Text>
                        <Text style={{ fontSize: 13, color: '#343A40', lineHeight: 18}}>{news && news.title !== undefined &&  news?.title.slice(0, 50) + '...'}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => {
                        dispatch(clearNews())
                    }}>
                        <CloseIcon />
                    </TouchableOpacity>
                </View>                               
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        height: '100%',
        width: '100%',
        paddingRight: 20,        
        paddingLeft: 15,
        flexDirection: 'row',
        borderColor: '#cdcccc',
        borderWidth: 0.5,
        justifyContent: 'space-between',
        alignItems: 'baseline',        
        alignItems: 'center',
        height: 60,
        paddingVertical: 8,
        backgroundColor: '#fff',
    },
    tab: {
        width:( Dimensions.get('window').width)/ 4,        
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center'
    },
    imageContainer: {
        width: 35,
        marginRight: 9,
        borderRadius: 4
      },
      image: {
        height: 44,
        width: 32,
        borderRadius: 4,
        resizeMode: 'cover',
      },
    closeBtn: {
        height: 50,
        width: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 0.3,
        borderColor: Colors.secondary,        
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default CurrentNewsContainer;


/**
 *         <Animated.View
          style={{height: componentHeight, backgroundColor: 'transparent', width: Dimensions.get('window').width, position: 'absolute', bottom: 0, left: 0, opacity: loading ? 0 : 1}}
        >
            <View style={styles.tabBar}>
              <TouchableOpacity>
                <Text>Hi</Text>
              </TouchableOpacity>               
            </View>
        </Animated.View>
 */