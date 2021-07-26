import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ScrollView, ActivityIndicator, Alert, SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native'
import { LoginPrompt } from '../../components/Account/LoginPrompt'
import { UserDetails } from '../../components/Account/UserDetails'
import { AccountSettings } from '../../components/Account/AccountSettings'
import { ConnectedAccounts } from '../../components/Account/ConnectedAccounts'
import { ManageNotifications } from '../../components/Account/ManageNotifications'
import { getCurrentUser, isLoading } from '../../redux/selectors/user.selector'
import Colors from '../../colors/colors'
import { setUserStart, setUserSuccess } from '../../redux/actions/user.actions'

const AccountMain = ({ navigation }) => {
    const user = useSelector(getCurrentUser)
    const loading = useSelector(isLoading)
    const dispatch = useDispatch()
    console.log(user)
    const logout = () => {
        dispatch(setUserStart())
        setTimeout(async () => {
            await dispatch(setUserSuccess(null))
            Alert.alert('Logout', 'User Logged Out Successfully')
            navigation.navigate('MainStack');
            navigation.reset({
                index: 0,
                routes: [{
                    name: 'MainStack'
                }]
            })          
        }, 3500)
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <UserDetails />
                    {!user?.user_id && <LoginPrompt /> }
                    <AccountSettings navigation={navigation} />  
                    <ConnectedAccounts />  
                    <ManageNotifications navigation={navigation} /> 
                    { user !== null &&<TouchableOpacity onPress={logout} style={{
                        marginTop: 24, 
                        marginBottom: 25, paddingLeft: 17,
                    width: (Dimensions.get('window').width) - 18,
                    }}>
                            <View style={{...styles.onboardButton, borderColor: Colors.secondary, backgroundColor: Colors.secondary}}>
                            {
                                loading ? <ActivityIndicator size="large" color="#fff" /> : 
                                <Text
                                style={{...styles.buttonText, color: '#fff'}}
                                >Logout
                                </Text>
                            }
                            </View>
                        </TouchableOpacity>  }                                 
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
        fontSize: 20,
        fontFamily: 'DMRegular'
    },
})

export default AccountMain