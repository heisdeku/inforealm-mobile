import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { FlatList, StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import Colors from '../colors/colors';
import ArticleCommentContainer from './ArticleCommentContainer';
import { CommentBox } from './CommentBox';
import { selectNewsComments } from '../redux/selectors/news.selector';

const ArticleCommentsContainer = () => {        
    const comments = useSelector(selectNewsComments)
    const [ newsComments, setNewsComments ] = useState(comments)

    return (        
    <View style={styles.container}>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={10} >                        
            {   
                !newsComments.length ?
                <View style={{flex: 1, justifyContent: 'center', marginBottom: 150,  alignItems: 'center'}}>
                    <View style={styles.emptyView}>
                        <Text style={styles.emptyText}>Here’s a little empty</Text>
                    </View>
                </View>
                :
                null
            }
            {
                newsComments.length > 0 ?
                    <FlatList
                        style={{ marginBottom: 100,}}
                        data={[
                            {key: 'Davido'},
                            {key: 'Joeboy'},
                            {key: 'Joeboy'},
                            {key: 'Joeboy'},
                            {key: 'Joeboy'},
                            {key: 'Joeboy'},
                            {key: 'Joeboy'},
                            {key: 'Joeboy'},
                            {key: 'Joeboy'},
                        ]}
                        renderItem={({item}) => <ArticleCommentContainer name={item.key} />}
                    />
                : null
            }     
            <CommentBox add={setNewsComments} />                       
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

/**
 * data={[
                {key: 'Uduak'},
                {key: 'Damola Moski'},
                {key: 'Deku Feranmi'},
                {key: 'Mure Funds'},
                {key: 'Davido'},
                {key: 'Joeboy'},
                {key: 'John'},
                {key: 'Jude Bella'},
                {key: 'Jimmy'},
                {key: 'Seyi Olatunji'},
                {key: 'Anola'},
                {key: 'Dominic'},
                {key: 'Rema'},
                ]}
 */