import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, RefreshControl, ActivityIndicator, Dimensions, TouchableOpacity, Modal, Alert } from 'react-native';
import ReaderItem from '../../components/ReaderItem'
import ReaderDocumentaryItem from '../../components/ReaderDocumentaryItem'
import Colors from '../../colors/colors';
import { ClearSearchContainer } from './ClearSearchContainer';
import { getSearchDatas, getSearchValue, hasError, isLoading } from '../../redux/selectors/search.selector';
import { getSearchData } from '../../redux/operations/search.op';
import { searchNews } from '../../redux/actions/search.action';

const MainSearchScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const searchValue = useSelector(getSearchValue)
    const data = useSelector(getSearchDatas)
    const loading = useSelector(isLoading)
    const error = useSelector(hasError)    
    const [refreshing, setRefreshing] = useState(false);
    const [ visible, setVisible ] = useState(false)

    const onRefresh = async () => {
        setRefreshing(true);
        await dispatch(getSearchData(searchValue))
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
                <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={() => {
                    Alert.alert('Modal has been closed')
                }}>
                    <View 
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,  
                            backgroundColor: 'rgba(0, 0, 0, 0.35)',
                            paddingHorizontal: 30,
                        }}
                    >
                    <View style={{
                        display: 'flex',
                        paddingTop: 26,
                        alignItems: 'center',
                        backgroundColor: 'white',
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        width: Dimensions.get('window').width - 26,
                        height: 350,
                        borderRadius: 8,
                        shadowOffset: {
                            width: 0,
                            height: 2
                        }
                    }}>
                        <Text style={{
                            fontFamily: 'DMBold',                    
                            fontWeight: '700',
                            fontSize: 20,
                            lineHeight: 28,                    
                            letterSpacing: 0.38,
                            textAlign: 'center',
                            width: '60%',
                            color: '#2B2D42',                    
                        }}>Are you sure you want to clear all your search history? </Text>
                        <View style={{
                            backgroundColor: '#F0F0F0',
                            borderRadius: 8,
                            marginBottom: 24,
                            marginTop: 41, 
                        }}>
                            <Text 
                            style={{                                                    
                                fontSize: 14,
                                lineHeight: 21,                    
                                letterSpacing: -0.41,
                                textAlign: 'center',
                                paddingVertical: 21,
                                paddingHorizontal: 24,                    
                                color: '#343A40',                                      
                            }}>Once it is done, It can't be reverted again.</Text>
                        </View>
                        
                        <TouchableOpacity style={styles.clearBtn} onPress={() => {
                            dispatch(searchNews([]))
                            setVisible(!visible)
                            }}>
                            <Text style={styles.clearBtnText}>Clear All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setVisible(!visible)}>
                            <Text style={{ color: '#050618'}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>          
                    </View>

                </Modal>
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
                        <ClearSearchContainer showModal={() => setVisible(true)} />                
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
    },
    clearBtn: {
        height: 50,
        backgroundColor: Colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        width: 180,
        //marginTop: 15,
        borderRadius: 8,
        marginBottom: 30,
      },
      clearBtnText: {
        fontFamily: 'DMBold',
        color: 'white',
        fontSize: 16,
      },
});
