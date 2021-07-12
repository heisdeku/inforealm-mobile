import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import ReaderItem from '../../components/ReaderItem'
import ReaderDocumentaryItem from '../../components/ReaderDocumentaryItem'
import Colors from '../../colors/colors';
import { ClearSearchContainer } from './ClearSearchContainer';
import { getSearchDatas, getSearchValue, hasError, isLoading } from '../../redux/selectors/search.selector';
import { getSearchData } from '../../redux/operations/search.op';

const MainSearchScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const searchValue = useSelector(getSearchValue)
    const data = useSelector(getSearchDatas)
    const loading = useSelector(isLoading)
    const error = useSelector(hasError)    
    const [refreshing, setRefreshing] = useState(false);
    

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(getSearchData(searchValue))
        setRefreshing(false);
    }

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
                            if (d.media.videos.length) {
                                return <ReaderDocumentaryItem news={d} key={i} navigation={navigation} />  
                            }
                                return <ReaderItem news={d} key={i} navigation={navigation} />
                                
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

export default MainSearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 25,
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
