import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions, Text, } from 'react-native'
import { Switch } from 'react-native-switch';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationToken, productsNotificationsStatus, recomNotificationsStatus, topNotificationStatus } from '../../redux/selectors/notifications.selectors';
import { manageProductNotification, manageRecommendationNotification, manageTopNewsNotification } from '../../redux/operations/notifications.op';
import { getCurrentUser } from '../../redux/selectors/user.selector';


export const NotificationSettingsContainer = () => {
    const user = useSelector(getCurrentUser)
    const token = useSelector(getNotificationToken)  
    const dispatch = useDispatch()    
    const topNews = useSelector(topNotificationStatus) 
    const recommendations = useSelector(recomNotificationsStatus)
    const products = useSelector(productsNotificationsStatus) 

    const setTopNews = async (action) => {
        await dispatch(manageTopNewsNotification(user.user_id, action, token))
    }

    const setRecommendation = async (action) => {        
        await dispatch(manageRecommendationNotification(user.user_id, action, token))
    }
    const setProducts = async (action) => {
        await dispatch(manageProductNotification(user.user_id, action, token))
    }

    return (
        <View style={styles.container}>
           <Text style={styles.containerTitle}>Notification Settings</Text>
           <View style={styles.settingsBox}>               
                <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#cdcccc', ...styles.settings}}>
                    <View>
                        <Text style={styles.settingText}>Top News</Text>
                        <Text style={styles.settingTextDesc}>Get Top stories picked by the author</Text>
                    </View>   
                    <Switch
                        value={topNews}
                        onValueChange={(topNews) => {
                            topNews ? setTopNews('add') : setTopNews('remove')
                        }}
                        disabled={user === null ? true : false}
                        activeText={'On'}
                        inActiveText={'Off'}
                        circleSize={15}                        
                        barHeight={25}
                        circleBorderWidth={0}
                        backgroundActive={'#e33127'}
                        backgroundInactive={'#e5e5e5'}
                        circleActiveColor={'#fafafa'}
                        circleInActiveColor={'#fafafa'}
                        changeValueImmediately={true}
                        renderActiveText={false}
                        renderInActiveText={false}
                        switchLeftPx={1.5}
                        switchRightPx={1.5}
                        switchWidthMultiplier={3.2}
                        switchBorderRadius={16}
                    />                                   
                </View>
                
                <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#cdcccc', ...styles.settings}}>
                    <View>
                        <Text style={styles.settingText}>Recommendations</Text>
                        <Text style={styles.settingTextDesc}>Personalized recommendations based on your interest</Text>
                    </View>   
                    <View style={{ marginLeft: -5}}>
                    <Switch
                        value={recommendations}
                        onValueChange={(recommendations) => {
                            recommendations ? setRecommendation('add') : setRecommendation('remove')
                        }}
                        disabled={user === null ? true : false}
                        activeText={'On'}
                        inActiveText={'Off'}
                        circleSize={15}                        
                        barHeight={25}
                        circleBorderWidth={0}
                        backgroundActive={'#e33127'}
                        backgroundInactive={'#e5e5e5'}
                        circleActiveColor={'#fafafa'}
                        circleInActiveColor={'#fafafa'}
                        changeValueImmediately={true}
                        switchLeftPx={1.5}
                        switchRightPx={1.5}
                        renderActiveText={false}
                        renderInActiveText={false}
                        switchWidthMultiplier={3.2}
                        switchBorderRadius={16}
                    />     
                    </View>                                     
                </View>                
                    <View style={styles.settings}>
                        <View>
                            <Text style={styles.settingText}>Product Updates</Text>
                            <Text style={styles.settingTextDesc}>Get Notified of new features and improvements to your app</Text>
                        </View>
                        <View style={{ marginLeft: -35}}>
                        <Switch
                        value={products}
                        onValueChange={(products) => {
                            products ? setProducts('add') : setProducts('remove')
                        }}
                        disabled={user === null ? true : false}
                        activeText={'On'}
                        inActiveText={'Off'}
                        circleSize={15}                        
                        barHeight={25}
                        circleBorderWidth={0}
                        backgroundActive={'#e33127'}
                        backgroundInactive={'#e5e5e5'}
                        circleActiveColor={'#fafafa'}
                        circleInActiveColor={'#fafafa'}
                        changeValueImmediately={true}
                        switchLeftPx={1.5}
                        switchRightPx={1.5}
                        renderActiveText={false}
                        renderInActiveText={false}
                        switchWidthMultiplier={3.2}
                        switchBorderRadius={16}
                    />    
                        </View>                     
                </View>                                                       
           </View>
        </View>
    )
}

const styles = StyleSheet.create({  
    container: {   
        marginTop: 32,     
        paddingLeft: 17,
        width: (Dimensions.get('window').width) - 10,
    },
    containerTitle: {
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 30,
        color: '#2b2d42',
        letterSpacing: -0.4,
        marginBottom: 12,
    },
    settingsBox: {
        flex: 1,                        
        backgroundColor: '#FFFFFF',
        width: (Dimensions.get('window').width) - 35,
        borderColor: '#cdcccc',
        paddingLeft: 16,
        paddingRight: 25,        
        borderRadius: 8,
    },
    settings: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',                
        paddingVertical: 19,        
    },
    settingText: {
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: -0.4,
        color: '#2b2d42',        
    },
    settingTextDesc: {    
        width: '70%',    
        fontSize: 13,
        lineHeight: 18,
        letterSpacing: -0.4,
        color: '#2b2d42', 
    }
})