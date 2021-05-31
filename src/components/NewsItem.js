import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Colors from '../colors/colors';

const NewsItem = () => {
    return (
        <View style={styles.news}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images/demo-news-image.png')} style={styles.image} />
            </View>
            <View style={styles.newsDetails}>
                <View style={styles.crumbs}><Text style={styles.crumbText}>News </Text><Feather name='chevron-right' size={14} color={Colors.text2} /><Text style={styles.crumbText}> Interest</Text></View>
                <TouchableOpacity><Text style={styles.newsTitle}>How Qatar became the richest country in the world</Text></TouchableOpacity>
                <Text style={styles.newsCaption}>Qatar, By far, the richest country in the world..</Text>
                <View style={styles.newsSummary}>
                    <View style={styles.newsSummaryItem}><Feather size={14} color={Colors.text1} name='clock' /><Text style={styles.newsSummaryText}> Oct 27, 2020</Text></View>
                    <View style={styles.newsSummaryItem}><MaterialIcons size={14} color={Colors.text1} name='library-books' /><Text style={styles.newsSummaryText}> 3 min read</Text></View>
                </View>
            </View>
        </View>
    )
}

export default NewsItem;

const styles = StyleSheet.create({
    news: {
        padding: 16,
        borderTopWidth: 0.5,
        borderTopColor: '#cdcccc',
        borderBottomWidth: 0.5,
        borderBottomColor: '#cdcccc',
        flexDirection: 'row',
        marginTop: 15
    },
    imageContainer: {
        width: 120,
        marginRight: 19
    },
    image: {
        height: 160,
        width: 116,
        resizeMode: 'contain'
    },
    crumbs: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    crumbText: {
        fontFamily: 'DMRegular',
        fontWeight: '500'
    },
    newsTitle: {
        fontSize: 20,
        fontFamily: 'DMBold',
        marginVertical: 3,
    },
    newsDetails: {
        flex: 1
    },
    newsCaption: {
        color: Colors.text2,
        fontSize: 14,
        fontFamily: 'DMRegular',
        marginBottom: 5
    },
    newsSummary: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    newsSummaryText: {
        fontSize: 12,
        fontFamily: 'DMRegular',
        color: '#8E8D8D'
    },
    newsSummaryItem: {
        flexDirection: 'row'
    }
});
