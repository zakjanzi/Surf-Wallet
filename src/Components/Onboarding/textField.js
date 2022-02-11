import React from 'react'
import { StyleSheet , View, Text, TextInput} from 'react-native'
import PropTypes from 'prop-types'
import { useTheme } from '@/Hooks'

// name = onboarding_textfield_email 
const TextField = ({ onChange, name, value }) => {
  const { Colors } = useTheme()
  
  return (
    <View style={ [styles.container, { backgroundColor : Colors.backgroundColor }] }>
            
            <Text style={[ styles.text, {color: Colors.skip} ]} > { (name) } </Text>
            
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputField} maxLength={50} onChangeText={onChange} value={value} />
            </View>
              
    </View>
  )
} 

TextField.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string
}
  
TextField.defaultProps = {
    onChange: () => {},
    name: ""
}

const styles = StyleSheet.create({
    container: {     
      flexDirection: "column",
      alignItems: "flex-start",   
      height:72     
    },
    inputContainer: {
        flex: 1,        
        width: '100%',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth:1,
        borderStyle:"solid",
        borderColor: "#CCCCCC",
    },
    inputField: {       
        fontSize: 14,
        width: '90%',
        paddingHorizontal: 20
    },
    text: {       
        fontWeight: "600",
        fontStyle:"normal",
        textTransform: "capitalize",
        fontFamily:"Inter-Regular",
        fontSize:14,
        lineHeight:28,
       
        height: 28,
        marginBottom:5
    }
});



export default TextField
