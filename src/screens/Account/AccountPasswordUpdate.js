import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View,  Dimensions } from 'react-native';
import { PasswordTextField } from '../../components/Account/PasswordText';
import { AntDesign } from '@expo/vector-icons';


const AccountPasswordUpdate = ({ saveAction, password, setPasswordState }) => {
    useEffect(() => {
        if (password.current.length > 0 && password.new.length > 0 && password.confirmNew.length > 0) {
            saveAction(true)
        }else {
            saveAction(false)
        }
    }, [password])

    const setPasswordCurrent = (text) => {
        setPasswordState({
            ...password,
            current: text
        })
    }
    const setPasswordNew = (text) => {
        setPasswordState({
            ...password,
            new: text
        })
    }
    const setPasswordConfirm = (text) => {
        setPasswordState({
            ...password,
            confirmNew: text
        })
    }
    return (
        <ScrollView style={styles.news}>   
               <Text style={{ fontSize: 24, marginBottom: 8, fontWeight: '700'}}>Create a strong Password</Text>
               <PasswordTextField content={password.current} onChange={setPasswordCurrent} placeholder="Enter your current Password" />
               <PasswordTextField content={password.new} onChange={setPasswordNew} placeholder="Enter your new password" />
               <PasswordTextField content={password.confirmNew} onChange={setPasswordConfirm} placeholder="Confirm your new password" />  
               <View style={{ marginTop: 34}}>
                    <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 16, color: '#343a40'}}>Must Contain</Text>   
                    <View>
                        <View style={{ flexDirection: 'row', marginVertical: 8}}>
                            <AntDesign name="minus" size={12} color="#6c757d" />
                            <Text style={{ color: '#6c757d', fontSize: 14, marginLeft: 10}}>Min 5 characters </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 8}}>
                            <AntDesign name="minus" size={12} color="#6c757d" />
                            <Text style={{ color: '#6c757d', fontSize: 14, marginLeft: 10}}>An Uppercase letter </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 8}}>
                            <AntDesign name="minus" size={12} color="#6c757d" />
                            <Text style={{ color: '#6c757d', fontSize: 14, marginLeft: 10}}>A special character </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 8}}>
                            <AntDesign name="minus" size={12} color="#6c757d" />
                            <Text style={{ color: '#6c757d', fontSize: 14, marginLeft: 10}}> A number </Text>
                        </View>                                                                                            
                    </View>
                </View>               
        </ScrollView>
    )
}

export default AccountPasswordUpdate;

const styles = StyleSheet.create({
    news: {
        flex: 1, 
        marginTop: 31,       
        width: Dimensions.get('window').width,
        paddingHorizontal: 16,
    },    
});
