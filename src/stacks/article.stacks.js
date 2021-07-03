import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import ArticleBottomTab from '../components/ArticleBottomTab';
import ArticleRead from '../screens/Article/ArticleRead';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ArticleNavigation } from '../components/ArticleNavigation';

const ArticleTabs = createBottomTabNavigator();
const Article = createStackNavigator()

const ArticleMainRead = ({ navigation }) => {
    return(
        <ArticleTabs.Navigator
            tabBar={props => <ArticleBottomTab {...props} />}
        >
            <Article.Screen 
                name='ArticleRead'
                component={ArticleRead}
            />
        </ArticleTabs.Navigator>
    )
}
const ArticleMainVideo = ({ navigation }) => {
    return(
        <ArticleTabs.Navigator
            tabBar={props => <ArticleBottomTab {...props} />}
        >
            <Article.Screen 
                name='ArticleRead'
                component={ArticleRead}
            />
        </ArticleTabs.Navigator>
    )
}
export const ArticleStack = ({navigation}) => {  
  return(
    <Article.Navigator>
      <Article.Screen 
        name='ArticleRead'
        component={ArticleMainRead}
        options={{
            header: ({ scene, previous, navigation }) => {
                const { options } = scene.descriptor;
                return (
                    <ArticleNavigation goBackEvt={navigation.goBack} style={options.headerStyle} />
                )
                }                                  
        }}
      />
    {/*<Article.Screen 
      name='ArticleWatch'
      component={bookmarkCategories}
      options={{
            header: ({ scene, previous, navigation }) => {
                const { options } = scene.descriptor;
                return (
                    <ArticleNavigation goBackEvt={navigation.goBack} style={options.headerStyle} />
                )
                }                                  
        }}
    />*/}
    </Article.Navigator>
  )
}
