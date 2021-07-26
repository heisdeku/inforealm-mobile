import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { FlatList, StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import ArticleCommentContainer from './ArticleCommentContainer';
import { CommentBox } from './CommentBox';
import { selectNewsComments, selectNewsId } from '../redux/selectors/news.selector';
import { newsTypes } from '../redux/types/news.types';
import { selectUserId } from '../redux/selectors/user.selector';
import apiConnect from '../api/apiConnect';
import { getNews } from '../redux/actions/news.actions';

const ArticleCommentsContainer = () => {        
    const comments = useSelector(selectNewsComments)
    const dispatch = useDispatch()
    const userId = useSelector(selectUserId)
    const newsId = useSelector(selectNewsId)

    const articles = useRef(null)

    useEffect(() => {
        const commentsLikeStatus = async () => {
          const response = await apiConnect.get(`/getNews?id=${newsId}&user_id=${userId}`)            
          if (response.data.status === 'success') {              
            getNews(newsId, response.data.news)    
          }          
        }
        commentsLikeStatus()
        //eslint-disable-next-line
      }, [])

    useEffect(() => {
        dispatch({ type: newsTypes.GET_COMMENTS})
    }, [])

    return (        
    <View style={styles.container}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={60} style={{ flex: 1}}>                        
            {   
                !comments.length ?
                <View style={{flex: 1, justifyContent: 'center', marginBottom: 150,  alignItems: 'center'}}>
                    <View style={styles.emptyView}>
                        <Text style={styles.emptyText}>Here’s a little empty</Text>
                    </View>
                </View>
                :
                null
            }
            {
                comments.length > 0 ?
                    <FlatList
                    style={{ position: 'absolute' }}
                    scrollToOverflowEnabled={true}
                        ref={articles}
                        style={{ marginBottom: 100,}}
                        data={comments}
                        onContentSizeChange={() => {
                            articles.current.scrollToEnd({ animated: true})
                        }}
                        renderItem={({item}) => <ArticleCommentContainer comment={item} name={item.key} />}
                    />
                : null
            }     
            <CommentBox />                       
        </KeyboardAvoidingView>         
    </View>        
    )
}

export default ArticleCommentsContainer;

const styles = StyleSheet.create({
    container: {        
        paddingHorizontal: 18,
        backgroundColor: '#F7F7F7',
        position: 'relative',   
        flex: 1,      
    }
});