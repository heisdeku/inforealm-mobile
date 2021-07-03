import React from 'react'
import { ScrollView, SafeAreaView, StyleSheet, View, Text, Image } from 'react-native'
import { LoginPrompt } from '../../components/Account/LoginPrompt'
import { UserDetails } from '../../components/Account/UserDetails'

const AccountMain = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <UserDetails />
                    <LoginPrompt />                    
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})

export default AccountMain