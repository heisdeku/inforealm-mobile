import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, RefreshControl, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import Colors from '../../colors/colors';
import GlanceItem from '../../components/GlanceItem';
import apiConnect from '../../api/apiConnect';

const BookmarkedGlanceScreen = () => {
    const user_id = 'ebfcbd110f6758249df0e7f7d5f7b950';
    const category_id = 4;
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [news, setNews] = useState([]);
    
    const getBookmarks = async () => {
        setError('');
        setIsLoading(true);
        try {
            const bodyForm = new FormData();
            bodyForm.append('user_id', user_id);
            bodyForm.append('category_id', category_id);
            const response = await apiConnect.post('/getBookmarks', bodyForm);
            if(response.data.status === 'success'){
                setIsLoading(false);
                setNews(response.data.news)
            }else{
                setIsLoading(false);
                setError(response.data.message);
            }
        } catch (error) {
            console.log(error);
            setError('Something went wrong');
        }
    } 

    const onRefresh = () => {
        setRefreshing(true);
        getBookmarks();
        setRefreshing(false);
    }

    useEffect(() => {
        getBookmarks();
    }, [])

    return (
        <SafeAreaView style={{flex: 1}}>
            {
                isLoading ?
                <View style={styles.loadingView}>
                    <ActivityIndicator color={Colors.secondary} size='large' />
                </View>
                :
                null
            }
            {
                !isLoading && error ?
                <View style={styles.errorView}>
                    <Text >{error}</Text>
                    <TouchableOpacity style={{width: '100%'}} onPress={() => getMostPopularNewsByCategory()}>
                        <View style={{...styles.onboardButton, borderColor: Colors.secondary, backgroundColor: Colors.secondary}}>
                            <Text
                            style={{...styles.buttonText, color: '#fff'}}
                            >
                            Try Again
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                :
                null
            }
            {
                !isLoading && news.length ?
                <ScrollView contentContainerStyle={{flex: 1, backgroundColor: '#E5E5E5',}}
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
                                        news.map((news, i) => {
                                            return (
                                                <GlanceItem key={i} news={news} />
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
            </ScrollView>
            :
            null
            }
            {
                !isLoading && !news.length ?
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.emptyView}>
                        <Text style={styles.emptyText}>c</Text>
                    </View>
                </View>
                :
                null
            }
        </SafeAreaView>
    )
}

export default BookmarkedGlanceScreen;

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#E5E5E5',
        flex: 1,
        padding: 15,
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
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25
    },
    onboardButton: {
        height: 50,
        width: '100%',
        borderRadius: 4,
        borderWidth: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8
    },
    buttonText: {
        fontSize: 14,
        fontFamily: 'DMRegular'
    },
    emptyView: {
        height: 200,
        borderColor: Colors.caption,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        width: '80%'
    },
    emptyText: {
        fontSize: 20,
        fontFamily: 'DMBold'
    }
})
