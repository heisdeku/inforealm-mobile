import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView, Alert, ActivityIndicator, Platform, TextInput, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useForm, Controller } from 'react-hook-form'
import Colors from '../colors/colors';
import { emailSignUp } from '../redux/operations/user.op';
import { isLoading } from '../redux/selectors/user.selector';

const LoginScreen = ({navigation}) => { 
    const dispatch = useDispatch()
    const loading = useSelector(isLoading)
    const { control, handleSubmit, formState: { errors } } = useForm();

    const handleRegistration = async (data) => {        
        let userData = new FormData()

        userData.append('firstname', data.firstname)
        userData.append('lastname', data.lastname)
        userData.append('email', data.email)
        userData.append('password', data.password)
        
        const response = await dispatch(emailSignUp(userData))          
        if (response.error) {            
            Alert.alert(response.error)
        }
        else if (response === 'success') {            
            navigation.navigate('Login');
        } else {
            return;
        }
    }
    return (       
        <ScrollView>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'position'}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} style={{ flex: 1 }}>
                 <View style={styles.container}>
                <Text style={styles.heading}>Stay up to date with insightful news and trends</Text>
                <Image style={styles.pana} source={require('../../assets/images/pana.png')} />
                <View style={{ width: '100%'}}>   
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                placeholder='Enter your First name'
                                placeholderTextColor="#aaaaaa"             onChangeText={(value) => onChange(value)}
                                value={value}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                                /> 
                            )}
                        name="firstname"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    <View>
                        {errors.firstname && <Text style={{ color: Colors.secondary, fontSize: 14}}>Firstname Field Cannot be Empty</Text>}
                    </View> 
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                placeholder='Enter your Last name'
                                placeholderTextColor="#aaaaaa"             onChangeText={(value) => onChange(value)}
                                value={value}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                                /> 
                            )}
                        name="lastname"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    <View>
                        {errors.lastname && <Text style={{ color: Colors.secondary, fontSize: 14}}>Lastname Field Cannot be Empty</Text>}
                    </View>
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                placeholder='Enter your e-mail'
                                placeholderTextColor="#aaaaaa"                                
                                onChangeText={(value) => onChange(value)}
                                value={value}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                                /> 
                            )}
                        name="email"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    <View>
                        {errors.email && <Text style={{ color: Colors.secondary, fontSize: 14}}>You must fill in an email address</Text>}
                    </View> 
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#aaaaaa"
                                onBlur={onBlur}
                                secureTextEntry
                                placeholder='Enter your password'
                                onChangeText={(value) => onChange(value)}
                                value={value}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />  
                        )}
                        name="password"
                        rules={{ required: true }}
                        defaultValue=""
                    />
                    <View>
                        {errors.password && <Text style={{ color: Colors.secondary, fontSize: 14}}>You must fill in your password</Text>}
                    </View>                                                        
                    <View style={styles.footerView}>
                        <Text style={styles.footerViewText}>Created an Acccount?  {``}
                            <Text onPress={() => navigation.navigate('Login')} style={styles.footerLink}>Login
                            </Text>
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleSubmit(handleRegistration)} style={{width: '100%'}}>
                    <View style={{...styles.onboardButton, borderColor: Colors.secondary, backgroundColor: Colors.secondary}}>
                        {
                            loading && <ActivityIndicator color='#FFF' size='large' />
                        }
                        {
                            !loading && <Text
                            style={{...styles.buttonText, color: '#fff'}}
                          >
                            Register
                          </Text>
                        }                        
                    </View>
                </TouchableOpacity>               
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        By signing up, you accept to our
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Terms')}><Text style={{...styles.footerText, textDecorationLine: 'underline'}}>Terms of Sevices</Text></TouchableOpacity>
                    <Text style={styles.footerText}> & </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Privacy')}><Text style={{...styles.footerText, textDecorationLine: 'underline'}}>Privacy Policy</Text></TouchableOpacity>
                </View>
            </View>
           
            </KeyboardAvoidingView>   
            </ScrollView>                          
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 35,
        backgroundColor: '#F7F7F7'
    },
    heading: {
        fontSize: 22,
        fontFamily: 'DMBold',
        textAlign: 'center',
        marginTop: 11,
        width: '80%',
        textTransform: 'capitalize'
    },
    pana: {
        height: 139,
        resizeMode: 'contain',
        marginVertical: 8
    },
    input: {
        height: 48,
        width: '100%',        
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        fontSize: 16,
        backgroundColor: 'transparent',
        borderBottomColor: '#cdcccc',
        borderBottomWidth: 1.25,        
        marginBottom: 10,                        
    },
    footerView: {             
        marginVertical: 25,
        fontSize: 14
    },
    footerViewText: {
        fontSize: 16,          
        color: '#2e2e2d',        
    },
    footerLink: {             
        color: "#e33127",
        fontWeight: "bold",
        fontSize: 16
    },
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
        fontSize: 14,
        fontFamily: 'DMRegular'
    },
    footer: {
        marginTop: 15,
        marginBottom: 60,
        flexDirection: 'row',
        width: 195,
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    footerText: {
        fontSize: 12,
        fontFamily: 'DMRegular',
        textAlign: 'center'
    }
})
