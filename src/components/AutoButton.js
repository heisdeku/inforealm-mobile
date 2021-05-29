import React from 'react;'
import { TouchableOpacity, Text, View } from 'react-native';

const AutoButton = (size, buttonColor, textColor, type, text, action) => {
    const appliedStyle = {
        borderRadius: 8,
        borderWidth: 1.5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: size == 'large' ? 147 : 132,
        minHeight: size == 'large' ? 50 : 44,
        borderColor: buttonColor,
        backgroundColor: type == 'outline' ? '#fff' : buttonColor
    }

    return (
        <TouchableOpacity 
        style={{...appliedStyle}}
        onPress={() => action()
        }>
            <View>
                <Text style={{fontSize: 16, color: textColor, fontFamily: 'DMRegular'}}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default AutoButton;