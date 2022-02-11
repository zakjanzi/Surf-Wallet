import React from 'react'
import { StyleSheet , View, Text, TextInput, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import { useTheme } from '@/Hooks'

// no translation needed here
const TextArea = ({ onPress, pastedText }) => {
  const { Colors } = useTheme()

  return (
    <View style={ [styles.container,styles.shadowProp, { backgroundColor : Colors.backgroundColor }] }>
            <TextInput style={[styles.textinput, {backgroundColor: Colors.langButton } ]} multiline={true} editable={true} numberOfLines={6} placeholder='Paste your seed phrase here' placeholderTextColor={Colors.text} 
            maxLength={100} value={pastedText} />
            <TouchableOpacity onPress={onPress}> 
                <Text style={[ styles.text, {color: Colors.someText} ]}> Paste </Text>
            </TouchableOpacity>       
    </View>
  )
} 

TextArea.propTypes = {
    onPress: PropTypes.func
}
  
TextArea.defaultProps = {
    onPress: () => {}
}

const styles = StyleSheet.create({
    container: {     
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 5,
      width:328,
      height: 200,
          alignSelf:'center'
    },
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.8,
      shadowRadius: 4,
    },
    textinput:{
        width:"80%",
        height:"100%",
        padding:10,
        borderRadius: 7         
    },
    text: {       
        fontWeight: "700",
        fontStyle:"normal",
        textTransform: "capitalize",
        fontFamily:"Inter-Regular",
        fontSize:16,
        lineHeight:18,
        alignSelf:'center'
    }
});



export default TextArea