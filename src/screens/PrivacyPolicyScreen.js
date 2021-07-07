import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import apiConnect from '../api/apiConnect';
import Colors from '../colors/colors';
import { WebView } from 'react-native-webview';

const PrivacyPolicyScreen = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const runfist = `document.style.fontSize: '12px';
    document.style.fontFamily: 'DM Sans'
    `

    const getPrivacyPolicy = async () => {
        try {
            setError('');
            setIsLoading(true)
            const response = await apiConnect.get('/getPrivacyPolicy');
            if(response.data.status === 'success'){
                const policyObject = response.data.policy;
                setTitle(policyObject.title);
                setDate(policyObject.last_updated);
                setContent(policyObject.content);
                setIsLoading(false);
            }
        } catch (error) {   
            console.log(error);
            setError('Something went wrong');
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getPrivacyPolicy();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.headingText}>last updated on {date}</Text>
            </View>
            <View style={styles.body}>
                {
                    isLoading ?
                    <View style={styles.loadingView}>
                        <ActivityIndicator size='large' color={Colors.secondary} />
                    </View>
                    :
                    null
                }
                {
                    !isLoading && error ?
                    <View style={styles.errorView}>
                        <Text style={styles.bodyHeading}>{error}</Text>
                        <TouchableOpacity style={{width: '100%'}} onPress={() => getPrivacyPolicy()}>
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
                    !isLoading && content ?
                        <WebView 
                        originWhitelist={['*']}
                        source={{html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet"></head><body>${content}</body></html>`}}
                        style={{marginTop: 20, backgroundColor: '#E5E5E5'}}
                        injectedJavaScript={runfist}
                        />
                    :
                    null
                }  

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5'
    },
    title: {
        fontFamily: 'DMBold',
        fontSize: 18
    },
    heading: {
        minHeight: 100,
        backgroundColor: '#F7F7F7',
        paddingTop: 30,
        paddingHorizontal: 15,
        elevation: 4,
        shadowRadius: 20,
        shadowOffset: {
            height: 4,
            width: 4
        }
    },
    headingText: {
        fontFamily: 'DMRegular',
        fontSize: 12,
        marginTop: 10,
        fontWeight: '500'
    },
    bodyHeading: {
        fontSize: 16,
        fontFamily: 'DMBold',
        marginBottom: 8
    },
    bodyText: {
        fontSize: 14,
        fontFamily: 'DMRegular',
        marginBottom: 16
    },
    body: {
        padding: 15,
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
        marginBottom: 8
    },
    buttonText: {
        fontSize: 14,
        fontFamily: 'DMRegular'
    },
});

export default PrivacyPolicyScreen;
