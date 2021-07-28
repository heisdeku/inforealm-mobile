import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, RefreshControl, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import NewsItem from '../../components/NewsItem';
import Colors from '../../colors/colors';
import apiConnect from '../../api/apiConnect';

const SelectedLocationScreen = ({navigation, route}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [news, setNews] = useState(null);
    const { location_id } = route.params;
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(false);

    const loadMoreNewsByLocation = async () => {
        try {
            const bodyForm = new FormData();
            bodyForm.append('location_id', location_id);
            bodyForm.append('page', page);
            const response = await apiConnect.post('/getNewsByLocation', bodyForm);
            if(response.data.status == 'success'){
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
    
    const getNewsByLocation = async () => {
        setError('');
        setIsLoading(true);
        try {
            const bodyForm = new FormData();
            bodyForm.append('location_id', location_id);
            const response = await apiConnect.post('/getNewsByLocation', bodyForm);
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
        getNewsByLocation();
        setRefreshing(false);
    }

    useEffect(() => {
        getNewsByLocation();
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
                    <TouchableOpacity style={{width: '100%'}} onPress={() => getNewsByLocation()}>
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
                !isLoading && news ?
                <View                
                style={{flex: 1, backgroundColor: '#E5E5E5'}}
                >
                    <FlatList
                    data={news}
                    keyExtractor={item => `locationNews-${location_id}-${item.id.toString()}-${Math.floor(Math.random() * 1000)}`}
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
                    onEndReached={() => loadMoreNewsByLocation()}
                    onEndReachedThreshold={0.7}
                    ListFooterComponent={!hasMoreData ? <Text style={{fontSize: 16, fontFamily: 'DMBold', textAlign: 'center', paddingVertical: 20}}>We guess you've seen it all</Text> : null}
                    />
                </View>
                :
                null
            }
        </SafeAreaView>
    )
}

export default SelectedLocationScreen

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
})
