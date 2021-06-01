import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, RefreshControl, ScrollView, Image, Dimensions } from 'react-native';
import Colors from '../colors/colors';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import LocationNewsItem from '../components/LocationNewsItem';

const LocationScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{flex: 1, backgroundColor: '#E5E5E5'}}
            refreshControl={
                <RefreshControl 
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Colors.brand, Colors.secondary, Colors.caption]}
                tintColor={Colors.brand}
                />
            }
            >
                <View style={styles.container}>
                    <Image source={require('../../assets/images/news-location-demo.png')} style={styles.image} />
                    <View style={styles.crumbs}>
                        <Text style={styles.crumbText}>News </Text><Feather color={Colors.text2} size={14} name='chevron-right' /><Text style={styles.crumbText}> Location </Text><Feather color={Colors.text2} size={14} name='chevron-right' /><Text style={styles.crumbText}> Africa</Text>
                    </View>
                    <View style={styles.mainNews}>
                        <Text style={styles.mainNewsText}>Lorem Ipsum is simp ly dummy tex simp ly dummy tex</Text>
                        <Text style={styles.mainNewsCaption}>Lorem Ipsum is sim ply dummy te xdtex xdummyg...</Text>
                        <View style={styles.mainNewsSummary}>
                            <View style={styles.mainNewsSummaryItem}><Feather size={14} color={Colors.text1} name='clock' /><Text style={styles.newsSummaryText}> Oct 27, 2020</Text></View>
                            <View style={styles.mainNewsSummaryItem}><MaterialIcons size={14} color={Colors.text1} name='library-books' /><Text style={styles.newsSummaryText}> 3 min read</Text></View>
                        </View>
                    </View>
                    <LocationNewsItem />
                    <LocationNewsItem />
                    <LocationNewsItem />
                    <LocationNewsItem />
                    <LocationNewsItem />
                    <LocationNewsItem />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LocationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 29,
        paddingHorizontal: 16
    },
    image: {
        width: Dimensions.get('window').width - 32,
        height: 160,
        marginBottom: 15
    },
    crumbText: {
        fontSize: 12,
        fontFamily: 'DMRegular',
        fontWeight: '500'
    },
    crumbs: {
        flexDirection: 'row',
        marginBottom: 10
    },
    mainNewsText: {
        fontSize: 20,
        fontFamily: 'DMBold'
    },
    mainNewsCaption: {
        fontFamily: 'DMRegular',
        fontSize: 14,
        marginVertical: 10
    },
    mainNewsSummary: {
        flexDirection: 'row'
    },
    mainNewsSummaryItem: {
        flexDirection: 'row',
        width: '40%',
        alignItems: 'center'
    },
    newsSummaryText: {
        fontSize: 12,
        color: '#8E8D8D'
    },
    mainNews: {
        marginBottom: 20
    }
});
