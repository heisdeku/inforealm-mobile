import React , { useState }from 'react';
import {TextInput, View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';


export const PasswordTextField = ({ content, onChange, placeholder }) => {
  const [value, onChangeText] = useState(content);
  const [visible, setVisibility] = useState(false);

  return (
    <View
      style={{
        display: 'flex',    
      }}>          
          
      <View style={styles.container}>
        <TextInput
            onChangeText={text => {
                onChangeText(text);
                onChange(text)
            }}
            value={value}
            style={{
                height: 50, 
                fontSize: 18, 
                width: '90%',
                color: '#343a40',
                zIndex: 2
            }}                                   
            textContentType='password'
            placeholderTextColor="#cdcccc"
            placeholder={placeholder}
            secureTextEntry={!visible}
        />
        <TouchableOpacity onPress={() => setVisibility(!visible)}>
            { !visible ? <Feather name="eye-off" size={20} style={styles.icons} color="#cdcccc" /> : <AntDesign name="eye" size={20} style={styles.icons} color="black" />   }
        </TouchableOpacity>        
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginTop: 21,     
    position: 'relative',   
    paddingHorizontal: 1,   
    borderBottomWidth: 1,                             
    borderBottomColor: '#cdcccc',  
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',        
    width: Dimensions.get('window').width - 30,    
  },
  icons: {        
  },
});