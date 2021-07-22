import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import Colors from '../colors/colors';
import { Feather, AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';
import apiConnect from '../api/apiConnect';
import { selectUserId } from '../redux/selectors/user.selector';
import { selectNewsId } from '../redux/selectors/news.selector';
import { newsTypes } from '../redux/types/news.types';
import { getNews } from '../redux/actions/news.actions';
selectNewsId


const ArticleCommentContainer = ({ comment }) => { 
  const dispatch = useDispatch()

  const userId = useSelector(selectUserId)
  const newsId = useSelector(selectNewsId)

  const [ actionStatus, setActionStatus ] = useState('')
  const [ hasLiked, setHasLiked ] = useState(comment.comment_like_status)
  const [ hasDisliked, setHasDisliked ] = useState(comment.comment_dislike_status)

  const handleLike = async () => {      
      if (!userId) {
          Toast.show("You can't like as you're not signed in", {
              duration: Toast.durations.SHORT,
              position: Toast.positions.CENTER
          });
          return
      }
      if (!hasLiked) {
          if(!actionStatus || actionStatus === 'dislike') {
              setActionStatus('like')
          }
          comment.likes += 1   
          if (hasDisliked) {
              comment.dislikes -= 1 
              comment.dislikes < 0 ? comment.likes = 0 : comment.likes
              setHasDisliked(false)
          }                                            
          setHasLiked(true)          
          const response = await handleLikeOperation()       
          if (response.status === 'success') {  
            fetchUpdatedNewsData() 
          } else {
            console.log('error')
          }                                                                                  
      } else {
          comment.likes -= 1
          setActionStatus('')
          setHasLiked(false)                     
          const response = await handleLikeOperation()                                                
          if (response.status === 'success') {  
            fetchUpdatedNewsData()            
        } else {
          console.log('error')
        } 
      }               
  }          
  const handleDisLike = async () => {
      setHasLiked(false)
      if (!hasDisliked) {
          if(!actionStatus || actionStatus === 'like') {
              setActionStatus('dislike')
          }            
          comment.likes -= 1
          comment.likes < 0 ? comment.likes = 0 : comment.likes
          comment.dislikes += 1
          setHasDisliked(true)
          const response = await handleDislikeOperation()                                             
          if (response.status === 'success') {  
            fetchUpdatedNewsData() 
          } else {
            console.log('error')
          }          
      } else {
          comment.dislikes -= 1
          setActionStatus('')
          setHasDisliked(false)
          const response = await handleDislikeOperation()                                             
          if (response.status === 'success') {  
            fetchUpdatedNewsData() 
          } else {
            console.log('error')
          }
      }                
  }     

  const fetchUpdatedNewsData = async () => {
    const response = await apiConnect.get(`/getNews?id=${newsId}&user_id=${userId}`) 
    if (response.data.status === 'success') {
      dispatch(getNews(newsId, response.data.news)) 
      Toast.show(response.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER
      })                          
      dispatch({ type: newsTypes.GET_COMMENTS })
  }
  }
  const handleLikeOperation = async () => {
    let data = new FormData()
    data.append('news_id', newsId)
    data.append('user_id', userId)
    data.append('comment_id', comment.id)
    const response = await apiConnect.post('/likeComment', data)        
    const { message, status } = response.data  
    return {
      status,
      message
    }
  }
  const handleDislikeOperation = async () => {
    let data = new FormData()
    data.append('news_id', newsId)
    data.append('user_id', userId)
    data.append('comment_id', comment.id)
    const response = await apiConnect.post('/dislikeComment', data)        
    const { message, status } = response.data  
    return {
      status,
      message
    }
  } 

  useEffect(() => {
    comment.comment_like_status && setActionStatus('like')
    comment.comment_dislike_status && setActionStatus('dislike')
  }, [])


  const fullname = comment.user
  const splittedFullName = fullname.split(' ')    
  const firstLetterOfName = splittedFullName[0][0]
  const secondLetterOfName = splittedFullName[1][0]  

  return (
      <View style={styles.commentContainer}>
          <View style={styles.commentatorContainer}>
              {
                  !comment?.profile_picture ? 
                  <View style={{ textTransform: 'capitalize', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 42,
                  height: 42, backgroundColor: '#cdcdcd', borderRadius: 100}}>
                      <Text style={{ textTransform: 'capitalize', fontSize: 18,}}>
                      {firstLetterOfName}{secondLetterOfName}
                      </Text>
                  </View>
                  :
                  <Image style={styles.commentatorImage} source={{ uri: comment.profile_picture }} />
              }                
          </View>
          <View style={styles.commentMain}>
              <View style={styles.commentMainHeader}>
                  <Text>{comment.user}</Text>
                  <View style={styles.commentDate}>
                      <Feather size={14} color={Colors.text1} name='clock' />
                      <Text style={styles.commentDateText}>{comment.date}</Text>
                  </View>
              </View>
              <View style={styles.commentBox}>
                  <Text style={styles.comment}>{comment.comment}</Text>
              </View>
              <View style={styles.commentDecisions}>
                  <TouchableOpacity onPress={handleLike}>
                      <View style={styles.commentDecision}>
                          <AntDesign name="like2" size={24} color={actionStatus !== 'like' ? "black" : Colors.secondary} />
                          <Text style={styles.commentDecisionText}>Like({comment.likes})</Text>
                      </View>    
                  </TouchableOpacity>                    
                  <TouchableOpacity onPress={handleDisLike}>
                      <View style={styles.commentDecision}>                        
                          <AntDesign style={styles.commentDislike} name="dislike2" size={24} color={actionStatus !== 'dislike' ? "black" : Colors.secondary} />
                          <Text style={styles.commentDecisionText}>Dislike({comment.dislikes})</Text>
                      </View>
                  </TouchableOpacity>                                        
              </View>
          </View>
      </View>
  )
}

export default ArticleCommentContainer;

const styles = StyleSheet.create({
  commentContainer: {        
      flex: 1,
      width: Dimensions.get('window').width,
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderBottomColor: '#cdcccc',
      paddingBottom: 18,  
      paddingTop: 24,      
  },
  commentatorContainer: {
      width: 50,          
      borderRadius: 50,          
  },
  commentatorImage: {        
      width: 42,
      height: 42,
      resizeMode: 'cover',
      borderRadius: 100,                 
  },
  commentMain: {        
      marginLeft: 10, 
      flex: 1,          
  },
  commentMainHeader: {
      width: Dimensions.get('window').width / 1.4,               
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  commentDate: {
      flexDirection: 'row',  
  },
  commentDateText: {
      marginLeft: 10,
      fontSize: 12,
      lineHeight: 18,
      color: '#8e8d8d',
  },
  commentBox: {
      marginTop: 7,
      marginBottom: 12,
  },
  commentDecisions: {
      flexDirection: 'row',
      marginTop: 5,
      width: Dimensions.get('window').width / 2, 
      justifyContent: 'space-between'
  },
  comment: {
      fontSize: 14,
      lineHeight: 21,
      letterSpacing: -0.4,
      color: '#343A40',
      width: Dimensions.get('window').width / 1.4,  
  },
commentDecision: {
  flexDirection: 'row',
  alignItems: 'baseline'
},
commentDecisionText: {
  color: '#868D8D',
  marginLeft: 8
},
commentDislike: {
  
}
})
