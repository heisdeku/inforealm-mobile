import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import NewsItem from '../../components/NewsItem';
import Colors from '../../colors/colors';
import apiConnect from '../../api/apiConnect';

const DynamicNewsScreen = ({interest_id}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [news, setNews] = useState([]);
        
    const getNewsByInterest = async () => {
        setError('');
        setIsLoading(true);
        try {
            const bodyForm = new FormData();
            bodyForm.append('interest_id', interest_id)
            const response = await apiConnect.post('/getNewsByInterest', bodyForm);
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
        getNewsByInterest();
        setRefreshing(false);
    }

    useEffect(() => {
        getNewsByInterest();
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
                    <TouchableOpacity style={{width: '100%'}} onPress={() => getNewsByInterest()}>
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
                        {
                            news.map((news,i) => {
                                return <NewsItem news={news} key={i} />
                            })
                        }
                    </View>
            </ScrollView>
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

export default DynamicNewsScreen;

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
