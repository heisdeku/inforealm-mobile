import React, { useEffect } from 'react';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, ScrollView, Dimensions, Alert, Permission, } from 'react-native';
import { NotificationPrompt } from '../../components/Account/NotificationPrompt';
import { NotificationSettingsContainer } from '../../components/Account/NotificationSettingsContainer';
import { getNotificationToken, notificationsStatus, productsNotificationsStatus, recomNotificationsStatus, topNotificationStatus } from '../../redux/selectors/notifications.selectors';
import { setAllNotificationsActive, setNotificatonToken } from '../../redux/actions/notifications.actions';
import { getCurrentUser } from '../../redux/selectors/user.selector';
import { manageProductNotification, manageRecommendationNotification, manageTopNewsNotification } from '../../redux/operations/notifications.op';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const AccountNotifications = () => {
    const user = useSelector(getCurrentUser)        
    const userToken = useSelector(getNotificationToken)
    const top = useSelector(topNotificationStatus)
    const recommendation = useSelector(recomNotificationsStatus)
    const products = useSelector(productsNotificationsStatus)
    const dispatch = useDispatch()
        
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => dispatch(setNotificatonToken(token)));
    }, [dispatch]);    

    const notificationPrompt = () => {
        Alert.alert('Not Signed in', 'You need to be logged in to manage notifications')
    }

    const registerForPushNotificationsAsync = async () => {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
      }
    const setNotification = async () => {
        dispatch(setAllNotificationsActive())
        await registerForPushNotificationsAsync()
        await dispatch(manageTopNewsNotification(user.user_id, 'add', userToken))
        await dispatch(manageRecommendationNotification(user.user_id, 'add', userToken))
        await dispatch(manageProductNotification(user.user_id, 'add', userToken))        
    }

    return (
        <ScrollView style={styles.news}> 
                { !user?.user_id && <NotificationPrompt setEvt={notificationPrompt} />}  
               { user?.user_id && !top && !recommendation && !products && <NotificationPrompt setEvt={setNotification} />}
               <NotificationSettingsContainer />            
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
