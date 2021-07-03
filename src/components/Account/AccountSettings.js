import React from 'react'

import { StyleSheet, View, TouchableOpacity, Image, Text, } from 'react-native'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

export const AccountSettings = () => {
    return (
        <View style={styles.container}>
           <Text>Account Settings</Text>
           <View>
               <View>
                   <Text>Update email address</Text>
                   <TouchableOpacity>
                       <AntDesign name="right" size={12} color="#f7f7f7" />
                    </TouchableOpacity>
               </View>
               <View>
                   <Text>Change Password</Text>
                   <TouchableOpacity>
                       <AntDesign name="right" size={12} color="#f7f7f7" />
                    </TouchableOpacity>
               </View>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({  
    container: {
        flex: 1,
        paddingLeft: 17,
    },
})