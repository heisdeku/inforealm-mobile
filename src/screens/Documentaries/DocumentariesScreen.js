import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, RefreshControl, ActivityIndicator, FlatList } from 'react-native';
import Colors from '../../colors/colors';
import DocumentaryItem from '../../components/DocumentaryItem';
import apiConnect from '../../api/apiConnect';
import { getCurrentUser, selectUserId } from '../../redux/selectors/user.selector'
import NewDocumentariesItem from '../../components/NewDocumentariesItem';

const DocumentariesScreen = () => {
    const userId = useSelector(selectUserId)
    const user = useSelector(getCurrentUser)
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(false);
    const category_id = 2;

    const loadMoreNewsByCategory = async () => {
        try {
            console.log('fetching more news');
            const bodyForm = new FormData();
            bodyForm.append('category_id', category_id)
            bodyForm.append('page', page)
            console.log('pulling api');
            const response = await apiConnect.post('/getNewsByCategory', bodyForm);
            if(response.data.status === 'success'){
                console.log('setting news')
                console.log(response.data.news)
                setNews([...news, ...response.data.news]);
                setPage(page => page+1);
                if(response.data.news.length >= 25){
                    console.log('has more data');
                    setHasMoreData(true);
                }else{
                    console.log('has no more data')
                    setHasMoreData(false);
                }
            }else{
                console.log('no success message');
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
                <View style={{flex: 1}}
                >
                    <View style={styles.container}>
                        <View style={styles.heading}>
                            <Text style={styles.headingText}>Documentaries</Text>
                            <Text style={{fontFamily: 'DMRegular', fontSize: 13}}>Welcome {userId ? `${user.firstname}` : 'sensei'}</Text>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.category}>
                                <View style={styles.categoryItems}>
                                    <FlatList
                                    data={news}
                                    keyExtractor={item => `Documentaries-${category_id}-${item.id.toString()}-${Math.floor(Math.random() * 10000)}`}
                                    renderItem={({item}) => {
                                        return(
                                            <NewDocumentariesItem news={item} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    heading: {
        minHeight: 100,
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingBottom: 18,
        paddingHorizontal: 15
    },
    headingText: {
        fontSize: 29,
        fontFamily: 'DMSerif'
    },
    body: {
        backgroundColor: '#E5E5E5',
        flex: 1,
        paddingVertical: 15
    },
    category: {
        marginBottom: 0,
        borderBottomColor: '#CDCCCC',
        borderBottomWidth: 0.5,
        flex: 1
        // paddingHorizontal: 15
    },
    categoryHead: {
        fontSize: 20,
        fontFamily: 'DMBold',
        paddingHorizontal: 15
    },
    categoryItems: {
        flex: 1
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


export default DocumentariesScreen;
