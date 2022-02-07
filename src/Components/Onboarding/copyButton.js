import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'

//title = "copy"
const CopyButton = ({ onPress, title }) => {
  const { Colors } = useTheme()
  const { t } = useTranslation()

  return (
    <TouchableOpacity onPress={onPress} style={ [styles.container, { backgroundColor : Colors.backgroundColor, borderColor: Colors.someText } ] }>
        <Text style={[ styles.text, {color: Colors.text} ]}>{t(title)}</Text>
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
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffffff",
      width: 84,
      height: 44,
      borderRadius: 4,
      borderTopWidth: 1,      
      borderStyle:"solid"
    },
    text: {
        width: 53,
        height: 28,
        fontWeight:600,
        fontFamily:"Inter-Regular",
        fontSize:15,
        lineHeight:28,
        textTransform: 'capitalize',
        color: "#141414"
    }
});



export default CopyButton