import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import ReaderDocumentaryItem from '../../components/ReaderDocumentaryItem'
import ReaderItem from '../../components/ReaderItem';
import Colors from '../../colors/colors';

import { ClearSearchContainer } from './ClearSearchContainer';
import { getSearchCategoryData, getSearchValue, hasError, isLoading } from '../../redux/selectors/search.selector';
import { getSearchDataByInterest } from '../../redux/operations/search.op';


const DynamicSearchScreen = ({ id, navigation }) => {
    const dispatch = useDispatch()

    const searchValue = useSelector(getSearchValue)
    const data = useSelector(getSearchCategoryData)
    const loading = useSelector(isLoading)
    const error = useSelector(hasError)   
    const [refreshing, setRefreshing] = useState(false);        
    console.log(searchValue)
    const onRefresh = () => {
        setRefreshing(true);
        getSearchById()
        setRefreshing(false);
    }
    const getSearchById = async () => {
        await dispatch(getSearchDataByInterest(searchValue || '', id))
    }
    useEffect(() => {
        searchValue !== null && getSearchById()
    }, [])

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
               {
                loading ?
                <View style={styles.loadingView}>
                    <ActivityIndicator color={Colors.secondary} size='large' />
                </View>
                :
                null
            }
            {
                !loading && error ?
                <View style={styles.errorView}>
                    <Text >{error}</Text>
                    <TouchableOpacity style={{width: '100%'}} onPress={() => dispatch(getSearchData(searchValue))}>
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
                !loading && data.length ?                
                    <View style={styles.container}>
                        <ClearSearchContainer />
                        {
                            data.map((d,i) => {
                                return <ReaderItem news={d} key={i} />
                            })
                        }
                    </View>            
                :
                null
            }
            {
                !data.length && !loading ?
                <View style={styles.container}>                                    
                </View>
                :
                null 
            }            
            </ScrollView>
        </SafeAreaView>
    )
}

export default DynamicSearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
