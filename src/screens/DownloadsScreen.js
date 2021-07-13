import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import Colors from '../colors/colors';
import { Feather, FontAwesome } from '@expo/vector-icons';
import DocumentaryItem from '../components/DocumentaryItem';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectDownloadsArticles } from '../redux/selectors/downloads.selectors';

const BookmarksScreen = ({navigation, downloadedArticles}) => {
    const [reloaded, setReloaded] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }
    
    return (
        <SafeAreaView style={{flex: 1}}>
            {
                !downloadedArticles.length ?
                <View style={styles.container}>
                    <View style={styles.emptyBox}>
                        <View style={styles.graphicBox}>
                            <View style={styles.badge}>
                                <Feather name='download-cloud' size={20} color='#fff' />
                            </View>
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
                        </View>
                        <Text style={styles.emptyHeadingText}>Here’s a little empty</Text>
                        <Text style={styles.emptyText}>Download articles to read when you’re offline.</Text>
                        {/* <TouchableOpacity style={{flexDirection: 'row'}}>
                            <Text style={styles.emptyActionText}>Let's try it </Text><Feather name='chevron-right' color={Colors.secondary} style={{marginTop: 2}} size={16} />
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => setReloaded(true)}>
                            <Text style={styles.emptyActionText}>Test filled view </Text><Feather name='chevron-right' color={Colors.secondary} style={{marginTop: 2}} size={16} />
                        </TouchableOpacity> */}
                    </View>
                </View>
                :
                <ScrollView contentContainerStyle={{flex: 1}}
                refreshControl={
                <RefreshControl 
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Colors.brand, Colors.secondary, Colors.caption]}
                tintColor={Colors.brand}
                />
                }
                >
                    <View style={{flex: 1}}>
                        <View style={styles.body}>
                            <View style={styles.category}>
                                <View style={styles.categoryItems}>
                                    {
                                        downloadedArticles.map((article, i) => {
                                            return(
                                                <DocumentaryItem news={article} key={i} />
                                            )
                                        })
                                    }                                    
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            }
        </SafeAreaView>
    )
}

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
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        paddingTop: 8,
        paddingLeft: 22
    },
    graphicUserBox: {
        backgroundColor: 'rgba(196, 196, 196, 0.4)',
        height: 26,
        width: 26,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
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
    },    
    body: {
        backgroundColor: '#E5E5E5',
        flex: 1,
        paddingVertical: 15
    },
    category: {
        marginBottom: 30,
        borderBottomColor: '#CDCCCC',
        borderBottomWidth: 0.5,
        // paddingHorizontal: 15
    },
    categoryHead: {
        fontSize: 20,
        fontFamily: 'DMBold',
        paddingHorizontal: 15
    },
    categoryItems: {        
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    categoryHeadView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 15
    },
    categoryCaption: {
        fontSize: 12,
        color: Colors.text2,
        paddingLeft: 15
    }
});

const mapStateToProps = createStructuredSelector({
    downloadedArticles: selectDownloadsArticles
})

export default connect(mapStateToProps)(BookmarksScreen);