import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ArticleRead from '../screens/Article/ArticleRead';
import ArticleWatch from '../screens/Article/ArticleWatch'
import { ArticleNavigation } from '../components/ArticleNavigation';

const Article = createStackNavigator()

export const ArticleStack = ({ navigation }) => {  
  
  const state = navigation.dangerouslyGetState();
  let actualRoute = state.routes[state.index];  
  while (actualRoute.state) {
      actualRoute = actualRoute.state.routes[actualRoute.state.index];
  }
  
  return(
    <Article.Navigator>
      <Article.Screen 
        name='ArticleRead'
        component={ArticleRead}
        options={{
            header: ({ scene, previous, navigation }) => {
                const { options } = scene.descriptor;
                return (
                    <ArticleNavigation goBackEvt={navigation.goBack} style={options.headerStyle} />
                )
                }                                  
        }}
      />
    <Article.Screen 
      name='ArticleWatch'
      component={ArticleWatch}
      options={{
            header: ({ scene, previous, navigation }) => {
                const { options } = scene.descriptor;
                return (
                    <ArticleNavigation goBackEvt={navigation.goBack} style={options.headerStyle} />
                )
                }                                  
        }}
    />
    </Article.Navigator>
  )
}
