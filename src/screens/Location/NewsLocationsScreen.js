import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, RefreshControl, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from '../../colors/colors';
import apiConnect from '../../api/apiConnect';

const NewsLocationsScreen = ({navigation}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [locations, setLocations] = useState(null);
    
    const getNewsLocation = async () => {
        setError('');
        setIsLoading(true);
        try {
            const response = await apiConnect.get('/getNewsLocation');
            if(response.data.status === 'success'){
                setIsLoading(false);
                setLocations(response.data.locations)
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
        getNewsLocation();
        setRefreshing(false);
    }

    useEffect(() => {
        getNewsLocation();
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
                    <TouchableOpacity style={{width: '100%'}} onPress={() => getNewsLocation()}>
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
                !isLoading && locations ?
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
                            locations.map((location, i) => {
                                return(
                                    <TouchableOpacity key={i} onPress={() => navigation.navigate('SelectedLocation', {
                                        location_id: location.location_id
                                    })}>
                                        <View style={styles.location}>
                                            <Text style={styles.locationText}>{location.location}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </ScrollView>
                :
                null
            }
        </SafeAreaView>
    )
}

export default NewsLocationsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    location: {
        marginTop: 16,
        paddingBottom: 16,
        borderBottomColor: 'rgba(205, 204, 204, 0.6)',
        borderBottomWidth: 1
    },
    locationText: {
        fontSize: 16,
        fontFamily: 'DMBold',
        color: Colors.text2
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
});
