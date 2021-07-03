import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Colors from '../colors/colors';
import ArticleCommentContainer from './ArticleCommentContainer';
import { CommentBox } from './CommentBox';

const ArticleCommentsContainer = () => {
    return (        
    <View style={styles.container}> 
        <FlatList
            data={[
            {key: 'Devin'},
            {key: 'Dan'},
            {key: 'Dominic'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
            ]}
            renderItem={({item}) => <ArticleCommentContainer name={item.key} />}
        />
        <CommentBox />
    </View>        
    )
}

export default ArticleCommentsContainer;

const styles = StyleSheet.create({
    container: {        
        padding: 18,
        backgroundColor: '#F7F7F7',
        position: 'relative', 
    }
});
