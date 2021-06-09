import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import Colors from '../../colors/colors';
import DocumentaryItem from '../../components/DocumentaryItem';

const BookmarkedDocumentariesScreen = () => {
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
            <ScrollView style={{flex: 1}}
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
                                    <DocumentaryItem />
                                    <DocumentaryItem />
                                    <DocumentaryItem />
                                    <DocumentaryItem />
                                    <DocumentaryItem />
                                </View>
                            </View>
                        </View>
                    </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BookmarkedDocumentariesScreen;

const styles = StyleSheet.create({
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
})