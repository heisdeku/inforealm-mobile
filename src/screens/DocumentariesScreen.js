import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import DocumentaryItem from '../components/DocumentaryItem'

const DocumentariesScreen = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.heading}>
                        <Text style={styles.headingText}>Documentaries</Text>
                        <Text style={{fontFamily: 'DMRegular', fontSize: 13}}>Welcome sensei</Text>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.category}>
                            <Text style={styles.categoryHead}>
                                Category
                            </Text>
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
    }
})


export default DocumentariesScreen
