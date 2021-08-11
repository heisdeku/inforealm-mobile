import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, RefreshControl, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import NewsItem from '../../components/NewsItem';
import Colors from '../../colors/colors';
import apiConnect from '../../api/apiConnect';

const AllNewsScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(false);

    const loadMoreNews = async () => {
        try {
            const bodyForm = new FormData();
            bodyForm.append('page', page+1);
            const response = await apiConnect.post('/getLatestNews', bodyForm);
            if(response.data.status == 'success'){
                const newNews = [...news, ...response.data.news];
                setNews(newNews);
                setPage(page => page+1);
                if(response.data.news.length >= 25){
                    setHasMoreData(true);
                }else{
                    setHasMoreData(false)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const getLatestNews = async () => {
        setError('');
        setIsLoading(true);
        try {
            const response = await apiConnect.get('/getLatestNews');
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
        getLatestNews();
        setRefreshing(false);
    }

    useEffect(() => {
        getLatestNews();
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
                    <TouchableOpacity style={{width: '100%'}} onPress={() => getLatestNews()}>
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
                <View                
                style={{flex: 1, backgroundColor: '#E5E5E5'}}
                >
                    <FlatList
                    data={news}
                    keyExtractor={item => `allnews-${item.id.toString()}-${Math.floor(Math.random() * 1000)}`}
                    renderItem={({item}) => {
                        return(
                            <NewsItem news={item} />
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
                    onEndReached={loadMoreNews}
                    onEndReachedThreshold={0.7}
                    ListFooterComponent={!hasMoreData ? <Text style={{fontSize: 16, fontFamily: 'DMBold', textAlign: 'center', paddingVertical: 20}}>We guess you've seen it all</Text> : null}
                    />
                </View>
                :
                null
            }
            {
                !news.length && !isLoading ?
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

export default AllNewsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
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
});
