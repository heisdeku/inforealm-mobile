import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Dimensions, Alert,  StyleSheet, TouchableOpacity, TextInput, Pressable } from 'react-native'
import { addNewsComment, getNews } from '../redux/actions/news.actions'
import { selectNewsComments, selectNewsId } from '../redux/selectors/news.selector'
import { getCurrentUser } from '../redux/selectors/user.selector'
import moment from 'moment'

import apiConnect from '../api/apiConnect'
import { newsTypes } from '../redux/types/news.types'
import Send from '../svgs/sendIcon'
import Colors from '../colors/colors'

export const CommentBox = () => {
    const dispatch = useDispatch()    
    const comments = useSelector(selectNewsComments)
    const user = useSelector(getCurrentUser)
    const newsId = useSelector(selectNewsId)

    const [ comment, setComment ] = useState('')

    const handleCommentAdd = async () => {
        if (!comment) {
            Alert.alert('Error', 'comment box is empty')
            return;
        }
        let data = new FormData()
        data.append('user_id', user.user_id)
        data.append('news_id', newsId)
        data.append('comment', comment)

        await dispatch(addNewsComment({
            "user": `${user.firstname} ${user.lastname}`,
            "user_id": user.user_id,
            "date": moment().format('ll'),
            "time": "09:48:34",
            "comment": comment,
            "replies": [],
            "likes": 0,
            "likeStatus": false,
            "dislikes": 0,
            "dislikeStatus": false,
            "id": String((comments.length + 1) + 1),
            "profile_picture": user.profile_picture
          }))

        setComment('')   

        const response = await apiConnect.post(`/addComment`, data)        
        if (response.data.status === 'success') {  
            const response2 = await apiConnect.get(`/getNews?id=${newsId}`)            
            if (response2.data.status === 'success') {
                dispatch(getNews(newsId, response2.data.news)
            )                    
            dispatch({ type: newsTypes.GET_COMMENTS })
            }
        } else {
            console.log('error')
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.commentBox}>                
                <TextInput
                    style={{ height: 50, width: '85%'}}                    
                    placeholder="Add a comment..."
                    onChangeText={comment => setComment(comment)}
                    defaultValue={comment}
                    multiline={true}
                    editable={user !== null ? true : false}
                />  
                <Pressable android_ripple={
                    {
                        color: Colors.secondary,
                        radius: 40,
                        borderless: true
                    }
                } style={{ marginLeft: 8, width: 30, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center'}} hitSlop={2} pressRetentionOffset={{ left: 10, bottom:10, top: 10}} onPressOut={handleCommentAdd}>
                    <Send />      
                </Pressable>                
            </View>            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {        
        position: 'absolute',         
        width: Dimensions.get('window').width,
        height: 100,
        marginTop: 'auto',
        paddingTop: 21,
        paddingBottom: 34,
        paddingHorizontal: 16,
        left: -20,
        bottom: 0,
        backgroundColor: '#F7F7F7',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,           
    },
    commentBox: {
        minHeight: 50, 
        backgroundColor: 'rgba(118, 118, 128, 0.12)',  
        borderRadius: 10, 
        paddingLeft: 32, 
        display: 'flex', 
        flex: 1, flexDirection: 'row', alignItems: 'center'     
    }
});