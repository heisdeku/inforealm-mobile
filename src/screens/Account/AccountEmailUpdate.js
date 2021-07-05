import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, ScrollView, View, ImageBackground, Dimensions } from 'react-native';
const AccountEmailUpdate = ({ saveAction}) => {
    const [ email, setEmail ] = useState('')
    const [ newEmail, setNewEmail ] = useState('')
    const [ confirmNewEmail, setConfirmNewEmail ] = useState('')

    useEffect(() => {
        if (email.length > 0 && newEmail.length > 0 && confirmNewEmail.length > 0) {
            saveAction(true)
        }else {
            saveAction(false)
        }
    }, [email, newEmail, confirmNewEmail])
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
                        onChangeText={email => setEmail(email)}
                        defaultValue={email}
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
                        onChangeText={newEmail => setNewEmail(newEmail)}
                        defaultValue={newEmail}
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
                        onChangeText={confirmNewEmail => setConfirmNewEmail(confirmNewEmail)}
                        defaultValue={confirmNewEmail}
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
