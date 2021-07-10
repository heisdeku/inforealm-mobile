import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Image, Text, Platform } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getCurrentUser, selectUserId } from '../../redux/selectors/user.selector';
import * as ImagePicker from 'expo-image-picker';
import { updateUserPicture } from '../../redux/operations/user.op';

export const UserDetails = () => {
    const dispatch = useDispatch()
    const userId = useSelector(selectUserId)
    const user = useSelector(getCurrentUser)
    const [image, setImage] = useState(user.profile_picture);
    const [loading, setLoading ] = useState(null)
    const [error, setError ] = useState(null)
        
    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            let userData = new FormData()
            userData.append('user_id', userId)
            userData.append('firstname', user.firstname)
            userData.append('lastname', user.lastname)
            userData.append('email', user.email)
            userData.append('profile_picture_uri_string', result.base64)

            let idData = new FormData()
            idData.append('user_id', userId)
            dispatch(updateUserPicture(userData, idData))
        }
    };

    if (userId && userId !== undefined) {
        return (
            <View style={styles.container}>
                <View style={styles.updatePhotoContainer}>
                    {
                        !image && <View style={styles.emptyPhoto}>
                        <MaterialCommunityIcons name="account" size={26} color="#6C757D" />
                    </View>
                    }                    
                    {image && 
                        <Image resizeMode="cover" source={{ uri: image }} style={{ width: 60, height: 60,borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} />}
                    <TouchableOpacity onPress={pickImage} style={styles.updatePhotoButton}>
                        <Text style={styles.updatePhotoButtonText}>Update Your Photo</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 10, }}> 
                    <Text style={styles.accountName}>{`${user.firstname} ${user.lastname}`}</Text> 
                    <Text style={styles.accountEmail}>{user.email}</Text>               
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.updatePhotoContainer}>
                    <View style={styles.emptyPhoto}>
                        <MaterialCommunityIcons name="account" size={26} color="#6C757D" />
                    </View>
                    <TouchableOpacity style={styles.updatePhotoButtonNull}>
                        <Text style={styles.updatePhotoButtonNullText}>Update Your Photo</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 10, }}> 
                    <Text style={styles.accountName}>Unknown</Text> 
                    <Text style={styles.accountEmail}>Your email address</Text>               
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({  
    container: {
        flex: 1,
        paddingLeft: 17,
    },
    updatePhotoContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '52%'
    },  
    emptyPhoto: {
        backgroundColor: 'rgba(196, 196, 196, 0.4)',
        borderRadius: 50,
        width: 56,
        height: 56,        
        justifyContent: 'center',
        alignItems: 'center',
    },
    updatePhotoButtonNull: {  
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',     
        textAlign: 'center',
        width: '100%',
        width: 125,
        height: 35,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 28
    },
    updatePhotoButtonNullText: {        
        fontSize: 12,
        lineHeight: 18,
        color: '#BDBDBD'
    },
    updatePhotoButton: {  
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',     
        textAlign: 'center',
        width: '100%',
        width: 125,
        height: 35,
        backgroundColor: '#2B2D42',
        borderRadius: 28
    },
    updatePhotoButtonText: {        
        fontSize: 12,
        lineHeight: 18,
        color: '#fff'
    },
    accountName: {
        fontFamily: 'DMSerif',
        fontSize: 36,
        lineHeight: 40,
        color: '#2B2D42',
        textTransform: 'capitalize'
    },
    accountEmail: {
        fontSize: 13,
        lineHeight: 17,
        color: '#2B2D42',
    }
})