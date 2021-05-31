import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native';
import NewsItem from '../components/NewsItem';
import Colors from '../colors/colors';

const AllNewsScreen = () => {
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
                    <NewsItem />
                    <NewsItem />
                    <NewsItem />
                    <NewsItem />
                    <NewsItem />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AllNewsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
