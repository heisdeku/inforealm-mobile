import React from 'react'
import { TouchableOpacity, StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../../redux/selectors/user.selector';
import { MaterialCommunityIcons } from '@expo/vector-icons'

export const ReaderNavigation = ({ visitProfile, visitSearch }) => {
    const user = useSelector(getCurrentUser)       
    return (
        <View style={styles.container}>                    
            <View style={styles.mainNavigation}>   
                <TouchableOpacity onPress={visitProfile}>
                    {
                        user === null && !user?.profile_picture && <View style={styles.emptyPhoto}>
                        <MaterialCommunityIcons name="account" size={27} color="#6C757D" />
                    </View>
                    }                    
                    {user !== null && user?.profile_picture &&
                        <Image resizeMode="cover" source={{ uri: user?.profile_picture }} style={{ width: 30, height: 30, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }} />
                    }                    
                </TouchableOpacity>                 
                    <Image
                        source={require('../../../assets/images/inforealm-blue.png')}
                        style={{ height: 44, marginLeft: 'auto', marginRight: 'auto' }}
                    /> 
                <TouchableOpacity onPress={visitSearch}>
                    <Feather name='search' size={24} />
                </TouchableOpacity> 
            </View>  
            <View> 
                <Text style={styles.readerScreenTitle}>Reader</Text> 
                <Text style={styles.userName}>Welcome {user?.user_id ? user.firstname : 'sensei'}</Text>               
            </View>            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 150,
        paddingHorizontal: 17,        
        backgroundColor: '#FFFFFF',        
    },
    mainNavigation: {
        flexDirection: 'row',         
        marginTop: 30,
        alignItems: 'center',    
        justifyContent: 'space-between'
    },
    readerScreenTitle: {
        marginTop: 10,
        fontFamily: 'DMSerif',
        fontSize: 30,  
        lineHeight: 40,
        color: '#000000'
    },
    userName: {
        marginTop: 3,
        fontSize: 14,
        lineHeight: 17,
        color: '#000000',
        textTransform: 'capitalize'
    }
})