import React from 'react'
import { ScrollView, SafeAreaView, StyleSheet, View, Text, Image } from 'react-native'
import { LoginPrompt } from '../../components/Account/LoginPrompt'
import { UserDetails } from '../../components/Account/UserDetails'
import { AccountSettings } from '../../components/Account/AccountSettings'
import { ConnectedAccounts } from '../../components/Account/ConnectedAccounts'
import { ManageNotifications } from '../../components/Account/ManageNotifications'

const AccountMain = ({ navigation }) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <UserDetails />
                    <LoginPrompt /> 
                    <AccountSettings navigation={navigation} />  
                    <ConnectedAccounts />  
                    <ManageNotifications navigation={navigation} />               
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})

export default AccountMain