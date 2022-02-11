import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'

//title = "copy"
const CopyButton = ({ onPress, title }) => {
  const { Colors } = useTheme()

  return (
    <TouchableOpacity  onPress={onPress} style={ [styles.container, { backgroundColor : Colors.backgroundColor, borderColor: Colors.someText } ] }>
        <Text style={[ styles.text, {color: Colors.text, borderColor: Colors.someText } ]}>{(title)}</Text>
    </TouchableOpacity>
  )
} 

CopyButton.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string
}
  
CopyButton.defaultProps = {
    onPress: ()=>{},
    title: "Empty"
}

const styles = StyleSheet.create({
    container: {    
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",     
        width: 86,
        height: 44,
        borderRadius: 6,
        borderWidth: 1,      
        borderStyle:"solid",
        marginTop:20
    
    },
    text: {
        alignSelf: 'center',       
        height: 28,
        fontWeight:"700",
        fontFamily:"Inter-Regular",
        fontSize:15,
        lineHeight:25,
        textTransform: 'capitalize',
        color: "#141414"
    }
});



export default CopyButton