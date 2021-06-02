import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import Colors from '../colors/colors';
import { Ionicons, Feather } from '@expo/vector-icons';

const LocationNewsItem = () => {
    return (
        <View style={styles.newsItem}>
            <View style={styles.newsImageContainer}>
                <ImageBackground 
                source={require('../../assets/images/location-news-demo.png')}
                style={styles.image}
                >
                    <TouchableOpacity style={{flexDirection: 'row', marginTop: 68, marginLeft: 15}}>
                        <View style={{backgroundColor: '#fff', height: 23, width: 23, justifyContent: 'center', alignItems: 'center', borderRadius: 11.5}}><Ionicons name='md-play-circle' size={24} color='#000' /></View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <View style={styles.newsDetails}>
                <TouchableOpacity><Text style={styles.newsTitle}>Covid-19: Norway i...</Text></TouchableOpacity>
                <Text style={styles.newsCaption}>Doctors in Norway have been told to conduct more thorough eva...</Text>
                <View style={styles.newsSummary}>
                    <View style={styles.newsSummaryItem}><Feather size={14} color={Colors.text1} name='clock' /><Text style={styles.newsSummaryText}> Oct 27, 2020</Text></View>
                    <View style={styles.newsSummaryItem}><Ionicons size={14} color={Colors.text1} name='md-play-circle' /><Text style={styles.newsSummaryText}> 3 min watch</Text></View>
                </View>
            </View>
        </View>
    )
}

export default LocationNewsItem;

const styles = StyleSheet.create({
    newsItem: {
        paddingHorizontal: 16,
        paddingVertical: 17,
        borderTopColor: '#cdcccc',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#cdcccc',
        flexDirection: 'row'
    },
    newsImageContainer: {
        width: 120,
        marginRight: 15,
        borderRadius: 4,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 96,
        resizeMode: 'contain'
    },
    newsDetails: {
        flex: 1
    },
    newsTitle: {
        fontSize: 20,
        fontFamily: 'DMBold',
        marginBottom: 10,
        color: Colors.text1
    },
    newsCaption: {
        fontSize: 14,
        fontFamily: 'DMRegular',
        marginBottom: 10,
        color: Colors.text2
    },
    newsSummaryText: {
        fontSize: 12,
        fontFamily: 'DMRegular',
        color: '#8E8D8D'
    },
    newsSummaryItem: {
        flexDirection: 'row'
    },
    newsSummary: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
