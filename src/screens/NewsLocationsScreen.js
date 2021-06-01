import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../colors/colors';

const NewsLocationsScreen = ({navigation}) => {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
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
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.navigate('SelectedLocation')}>
                        <View style={styles.location}>
                            <Text style={styles.locationText}>Location</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.location}>
                            <Text style={styles.locationText}>Location</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.location}>
                            <Text style={styles.locationText}>Location</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.location}>
                            <Text style={styles.locationText}>Location</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.location}>
                            <Text style={styles.locationText}>Location</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.location}>
                            <Text style={styles.locationText}>Location</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
    }
});
