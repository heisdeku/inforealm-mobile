import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import Colors from '../../colors/colors';
import DocumentaryItem from '../../components/DocumentaryItem';
import { Feather } from '@expo/vector-icons';
import apiConnect from '../../api/apiConnect';

const DocumentariesScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [news, setNews] = useState([]);
    const category_id = 2;
    
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
                        <View style={styles.heading}>
                            <Text style={styles.headingText}>Documentaries</Text>
                            <Text style={{fontFamily: 'DMRegular', fontSize: 13}}>Welcome sensei</Text>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.category}>
                                {/* <View style={styles.categoryHeadView}>
                                    <View style={{width: '50%'}}>
                                        <Text style={styles.categoryHead}>
                                            Category
                                        </Text>
                                        <Text style={styles.categoryCaption}>
                                            Breaking news for all of the latest updates about the category.
                                        </Text>
                                    </View>
                                    <TouchableOpacity onPress={() => navigation.navigate('DocCategory')} style={{flexDirection: 'row'}}>
                                        <Text style={{fontSize: 14, color: Colors.secondary}}>View all </Text><Feather size={18} name='chevron-right' color={Colors.secondary} />
                                    </TouchableOpacity>
                                </View> */}
                                <View style={styles.categoryItems}>
                                    {
                                        news.map((news, i) => {
                                            return(
                                                <DocumentaryItem key={i} news={news} />
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


export default DocumentariesScreen;
