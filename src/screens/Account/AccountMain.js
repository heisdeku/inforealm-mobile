import React from 'react'
import { useSelector } from 'react-redux'
import { ScrollView, SafeAreaView, StyleSheet, View, Text, Image } from 'react-native'
import { LoginPrompt } from '../../components/Account/LoginPrompt'
import { UserDetails } from '../../components/Account/UserDetails'
import { AccountSettings } from '../../components/Account/AccountSettings'
import { ConnectedAccounts } from '../../components/Account/ConnectedAccounts'
import { ManageNotifications } from '../../components/Account/ManageNotifications'
import { getCurrentUser } from '../../redux/selectors/user.selector'

const AccountMain = ({ navigation }) => {
    const user = useSelector(getCurrentUser)

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <UserDetails />
                    {!user.user_id && <LoginPrompt /> }
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