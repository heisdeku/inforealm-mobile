import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Text, TextInput, Dimensions } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { getSearchData } from '../redux/operations/search.op';
import { useDispatch, useSelector } from 'react-redux';
import { setValue } from '../redux/actions/search.action';
import { getSearchValue } from '../redux/selectors/search.selector';


export const SearchNavigation = ({ goBackEvt }) => {
    const dispatch = useDispatch()   
    const value = useSelector(getSearchValue) 
    const [ searchValue, setSearchValue ] = useState(value) 

    const handleNewsSearch = async () => {        
        await dispatch(setValue(searchValue))
        await dispatch(getSearchData(searchValue))
        setSearchValue('')
        await dispatch(setValue(''))           
    }       

    return (
        <View style={styles.container}>
            <TouchableOpacity
            onPress={goBackEvt}
                style={{marginTop: 20, marginBottom: 15}}
            >
                <AntDesign name='arrowleft' color='black' size={24} />
            </TouchableOpacity>
            <Text style={styles.navigationHeader}>Search</Text>
            <View style={styles.flexArea}>
                <View style={styles.searchBox}>
                    <Ionicons style={styles.searchIcon} name="md-search" size={18} color="#8e8e93" />
                    <TextInput onSubmitEditing={() => handleNewsSearch()} style={styles.searchInput} onChangeText={text=> setSearchValue(text)}
                    defaultValue={searchValue} />
                </View>
                <TouchableOpacity onPress={() => {
                    dispatch(setValue(''))
                    setSearchValue('')
                }}>
                    <Text style={styles.cancelText}>Cancel</Text>     
                </TouchableOpacity>                
            </View>            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 190,
        paddingLeft: 17,
        backgroundColor: '#FFFFFF',        
    },
    navigationHeader: {
        fontFamily: 'DMSerif',
        fontSize: 30,
        lineHeight: 40,
        marginTop: 10,
        marginBottom: 16,
    },
    flexArea: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchBox: {height: 50, width: '80%', marginRight: 14, backgroundColor: 'rgba(118, 118, 128, 0.12)',  borderRadius: 10, paddingLeft: 16},
    searchIcon: {
        position: 'absolute',
        top: 15,
        left: 10,       
    },
    searchInput: {
        height: '100%',
        width: '100%',
        paddingLeft: 24,
        fontSize: 18
    },
    cancelText: {
        fontSize: 17,
        color: '#343A40'
    }
})