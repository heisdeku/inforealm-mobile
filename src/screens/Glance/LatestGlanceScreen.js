import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import Colors from '../../colors/colors';
import GlanceItem from '../../components/GlanceItem';
import apiConnect from '../../api/apiConnect';

const LatestGlanceScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(false);
    const category_id = 4;

    const loadMoreNewsByCategory = async () => {
        try {
            const bodyForm = new FormData();
            bodyForm.append('category_id', category_id)
            bodyForm.append('page', page)
            const response = await apiConnect.post('/getNewsByCategory', bodyForm);
            if(response.data.status === 'success'){
                setNews([...news, ...response.data.news]);
                setPage(page => page+1);
                if(response.data.news.length >= 25){
                    setHasMoreData(true);
                }else{
                    setHasMoreData(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const getNewsByCategory = async () => {
        setError('');
        setIsLoading(true);
        try {
            const bodyForm = new FormData();
            bodyForm.append('category_id', category_id)
            const response = await apiConnect.post('/getNewsByCategory', bodyForm);
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
        getNewsByCategory();
        setRefreshing(false);
    }

    useEffect(() => {
        getNewsByCategory();
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
                    <TouchableOpacity style={{width: '100%'}} onPress={() => getNewsByCategory()}>
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
                <View style={{flex: 1, backgroundColor: '#E5E5E5',}}
                >
                    <View style={{flex: 1}}>
                        <View style={styles.body}>
                            <View style={styles.category}>
                                <View style={styles.categoryItems}>
                                    <FlatList
                                    contentContainerStyle={{flex: 1}}
                                    data={news}
                                    keyExtractor={item => `Glance-${category_id}-${item.id.toString()}-${Math.floor(Math.random() * 10000)}`}
                                    renderItem={({item}) => {
                                        return(
                                            <GlanceItem news={item} />
                                        )
                                    }}
                                    refreshControl={
                                        <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                        colors={[Colors.brand, Colors.secondary, Colors.caption]}
                                        tintColor={Colors.brand}
                                        />
                                    }
                                    onEndReached={() => loadMoreNewsByCategory()}
                                    onEndReachedThreshold={0.7}
                                    ListFooterComponent={!hasMoreData ? <Text style={{fontSize: 16, fontFamily: 'DMBold', textAlign: 'center', paddingVertical: 20}}>We guess you've seen it all</Text> : null}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
            </View>
            :
            null
            }
            {
                !isLoading && !news.length ?
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.emptyView}>
                        <Text style={styles.emptyText}>Here’s a little empty</Text>
                    </View>
                </View>
                :
                null
            }
        </SafeAreaView>
    )
}

export default LatestGlanceScreen;

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#E5E5E5',
        flex: 1,
        padding: 15,
    },
    category: {
        marginBottom: 0,
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
