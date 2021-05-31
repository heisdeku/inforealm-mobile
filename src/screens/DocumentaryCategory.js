import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import Colors from '../colors/colors';
import DocumentaryItem from '../components/DocumentaryItem';

const DocumentaryCategory = ({navigation}) => {
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
                <View style={styles.container}>
                    <View style={styles.body}>
                        <View style={styles.category}>
                            <View style={styles.categoryHeadView}>
                                <View style={{width: '50%'}}>
                                    <Text style={styles.categoryHead}>
                                        Category
                                    </Text>
                                    <Text style={styles.categoryCaption}>
                                        Breaking news for all of the latest updates about the category.
                                    </Text>
                                </View>
                            </View>
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

export default DocumentaryCategory;

const styles = StyleSheet.create({
    container: {
        flex: 1
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
