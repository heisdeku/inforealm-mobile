import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Colors from '../colors/colors';
import { Feather, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

const ArticleCommentContainer = ({ name }) => {    
    return (
        <View style={styles.commentContainer}>
            <View style={styles.commentatorContainer}>
                <Image style={styles.commentatorImage} source={require('../../assets/images/man-one.png')} />
            </View>
            <View style={styles.commentMain}>
                <View style={styles.commentMainHeader}>
                    <Text>{name}</Text>
                    <View style={styles.commentDate}>
                        <Feather size={14} color={Colors.text1} name='clock' />
                        <Text style={styles.commentDateText}>Oct 30, 2021</Text>
                    </View>
                </View>
                <View style={styles.commentBox}>
                    <Text style={styles.comment}>Hi, i'm oluwaferanmi and i dissaprove this article which says qatar is the richest, ever heard of UAR.</Text>
                </View>
                <View style={styles.commentDecisions}>
                    <View style={styles.commentDecision}>
                        <AntDesign name="like2" size={24} color="black" />
                        <Text style={styles.commentDecisionText}>Like(16)</Text>
                    </View>
                    <View style={styles.commentDecision}>                        
                        <AntDesign style={styles.commentDislike} name="dislike2" size={24} color="black" />
                        <Text style={styles.commentDecisionText}>Dislike(20)</Text>
                    </View>                    
                </View>
            </View>
        </View>
    )
}

export default ArticleCommentContainer;

const styles = StyleSheet.create({
    commentContainer: {
        maxHeight: 170,
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#cdcccc',
        paddingBottom: 18,        
    },
    commentatorContainer: {
        width: '16%',        
    },
    commentatorImage: {
        resizeMode: 'contain',
        width: 50,
    },
    commentMain: {        
        marginLeft: 10,         
    },
    commentMainHeader: {
        width: '75%',
        marginTop: 10,
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
        width: '36%',
        justifyContent: 'space-between'
    },
    comment: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.4,
    color: '#343A40',
    width: '50%', 
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
