import React, { useState } from 'react';
import { FlatList, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import Colors from '../colors/colors';
import ArticleCommentContainer from './ArticleCommentContainer';
import { CommentBox } from './CommentBox';

const ArticleCommentsContainer = () => {
    return (        
    <View>
        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={10} style={styles.container}>
            <FlatList
                style={{ marginBottom: 100,}}
                data={[
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
                renderItem={({item}) => <ArticleCommentContainer name={item.key} />}
            />
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
    }
});
