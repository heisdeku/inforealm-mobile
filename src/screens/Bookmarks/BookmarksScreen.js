import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Colors from '../../colors/colors';
import { Feather, FontAwesome } from '@expo/vector-icons';

const BookmarksScreen = ({navigation}) => {
    console.log(navigation);
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.emptyBox}>
                    <View style={styles.graphicBox}>
                        <View style={styles.graphicDetails}>
                            <View style={styles.graphicUserDetails}>
                                <View style={styles.graphicUserBox}>
                                    <FontAwesome name='user' color='#E5E5E5' size={14} />
                                </View>
                                <View style={{flex: 1}}>
                                    <View style={{...styles.detailsStrip, width: 70}}></View>
                                    <View style={{...styles.detailsStrip, width: 50}}></View>
                                </View>
                            </View>
                            <View style={{...styles.detailsStrip, width: 187}}></View>
                            <View style={{...styles.detailsStrip, width: 167}}></View>
                        </View>
                        <View style={styles.badge}>
                            <Feather name='bookmark' size={20} color='#fff' />
                        </View>
                    </View>
                    <Text style={styles.emptyHeadingText}>Here’s a little empty</Text>
                    <Text style={styles.emptyText}>Swipe right to bookmark a content you might want to read for later. All bookmarked contents will be available ofline.</Text>
                    <TouchableOpacity style={{flexDirection: 'row'}}>
                        <Text style={styles.emptyActionText}>Let's try it </Text><Feather name='chevron-right' color={Colors.secondary} style={{marginTop: 2}} size={16} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BookmarksScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        paddingHorizontal: 16
    },
    emptyBox: {
        borderWidth: 1,
        borderColor: '#CDCCCC',
        borderRadius: 4,
        overflow: 'hidden',
        paddingHorizontal: 32,
        paddingVertical: 36,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyHeadingText: {
        fontSize: 20,
        color: Colors.text1,
        fontFamily: 'DMBold',
        marginTop: 24
    },
    emptyText: {
        fontSize: 14,
        fontFamily: 'DMRegular',
        color: Colors.text2,
        marginVertical: 8,
        textAlign: 'center'
    },
    emptyActionText: {
        color: Colors.secondary,
        fontSize: 14,
        fontFamily: 'DMBold'
    },
    graphicBox: {
        borderRadius: 8,
        overflow: 'hidden',
        flexDirection: 'row'
    },
    badge: {
        width: 71,
        height: 81,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    graphicDetails: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'rgba(196, 196, 196, 0.4)',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        paddingTop: 8
    },
    graphicUserBox: {
        backgroundColor: 'rgba(196, 196, 196, 0.4)',
        height: 26,
        width: 26,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        marginRight: 8
    },
    detailsStrip: {
        borderRadius: 2,
        height: 7,
        backgroundColor: 'rgba(196, 196, 196, 0.4)',
        marginBottom: 4
    },
    graphicUserDetails: {
        flexDirection: 'row',
        marginBottom: 8
    }
});
