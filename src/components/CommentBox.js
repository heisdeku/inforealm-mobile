import React, { useState } from 'react'
import { View, Dimensions, StyleSheet, Text, TextInput } from 'react-native'

export const CommentBox = () => {
    const [ comment, setComment ] = useState('')
    return (
        <View style={styles.container}>
            <TextInput
                style={{height: 50, backgroundColor: 'rgba(118, 118, 128, 0.12)',  borderRadius: 10, paddingLeft: 16}}
                placeholder="Add a comment..."
                onChangeText={comment => setComment(comment)}
                defaultValue={comment}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {        
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: 120,
        paddingTop: 21,
        paddingBottom: 34,
        paddingHorizontal: 16,
        left: 0,
        bottom: 0,
        backgroundColor: '#F7F7F7',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,        
    }
});