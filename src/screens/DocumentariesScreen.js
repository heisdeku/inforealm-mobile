import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import Colors from '../colors/colors';
import DocumentaryItem from '../components/DocumentaryItem';
import { Feather } from '@expo/vector-icons';

const DocumentariesScreen = ({navigation}) => {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }

    return (
        <SafeAreaView style={{flex: 1}}>
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
                            <View style={styles.categoryHeadView}>
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
                            </View>
                            <View style={styles.categoryItems}>
                                <DocumentaryItem />
                                <DocumentaryItem />
                                <DocumentaryItem />
                                <DocumentaryItem />
                                <DocumentaryItem />
                            </View>
                        </View>
                        <View style={styles.category}>
                            <View style={styles.categoryHeadView}>
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
                            </View>
                            <View style={styles.categoryItems}>
                                <DocumentaryItem />
                                <DocumentaryItem />
                                <DocumentaryItem />
                                <DocumentaryItem />
                                <DocumentaryItem />
                            </View>
                        </View>
                        <View style={styles.category}>
                            <View style={styles.categoryHeadView}>
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
                            </View>
                            <View style={styles.categoryItems}>
                                <DocumentaryItem />
                                <DocumentaryItem />
                                <DocumentaryItem />
                                <DocumentaryItem />
                                <DocumentaryItem />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
    }
})


export default DocumentariesScreen;
