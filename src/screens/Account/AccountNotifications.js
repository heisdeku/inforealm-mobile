import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, ImageBackground, Dimensions } from 'react-native';
import { NotificationPrompt } from '../../components/Account/NotificationPrompt';
import { NotificationSettingsContainer } from '../../components/Account/NotificationSettingsContainer';

const AccountNotifications = () => {
    const [ notificationAllowed, setNotification ] = useState(false)
    return (
        <ScrollView style={styles.news}>   
               { !notificationAllowed && <NotificationPrompt setEvt={setNotification} />}
               <NotificationSettingsContainer active={notificationAllowed} />            
        </ScrollView>
    )
}

export default AccountNotifications;

const styles = StyleSheet.create({
    news: {
        flex: 1,        
        width: Dimensions.get('window').width,
    },    
});
