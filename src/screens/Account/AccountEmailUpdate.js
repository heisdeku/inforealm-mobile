import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, ScrollView, View, Dimensions } from 'react-native';

const AccountEmailUpdate = ({ saveAction, email, setEmailState }) => {
    useEffect(() => {
        if (email.current.length > 0 && email.new.length > 0 && email.confirmNew.length > 0) {
            saveAction(true)
        }else {
            saveAction(false)
        }
    }, [email])
    return (
        <ScrollView style={styles.news}>   
               <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: '700'}}>Update Email Address</Text>
                <View>
                    <TextInput
                       style={{height: 50, fontSize: 18, borderBottomWidth: 1,
                        marginTop: 20,    
                        borderBottomColor: '#cdcccc', color: '#343a40'}}
                        placeholder="Enter your current email address"
                        keyboardType='email-address'
                        placeholderTextColor="#cdcccc"
                        onChangeText={text => setEmailState({...email, current: text})}
                        defaultValue={email.current}
                    />    
                </View>   
                <View>
                    <TextInput
                        style={{height: 50, fontSize: 18, borderBottomWidth: 1,
                            marginTop: 20,    
                            borderBottomColor: '#cdcccc', color: '#343a40'}}
                        placeholder="Enter your new email address"
                        keyboardType='email-address'
                        placeholderTextColor="#cdcccc"
                        onChangeText={text => setEmailState({...email, new: text})}
                        defaultValue={email.new}
                    />    
                </View>
                <View>
                    <TextInput
                       style={{height: 50, fontSize: 18, borderBottomWidth: 1,
                        marginTop: 20,    
                        borderBottomColor: '#cdcccc', color: '#343a40'}}
                        placeholder="Confirm your new email address"
                        keyboardType='email-address'
                        placeholderTextColor="#cdcccc"
                        onChangeText={text => setEmailState({...email, confirmNew: text})}
                        defaultValue={email.confirmNew}
                    />    
                </View>     
        </ScrollView>
    )
}

export default AccountEmailUpdate;

const styles = StyleSheet.create({
    news: {
        flex: 1, 
        marginTop: 31,       
        width: Dimensions.get('window').width,
        paddingHorizontal: 16,
    },    
});
