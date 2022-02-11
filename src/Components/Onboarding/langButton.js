import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'

//title = "language"
const LangButton = ({ onPress, title }) => {
  const { Colors } = useTheme()
  const { t } = useTranslation()

  return (
    <TouchableOpacity onPress={onPress} style={ [styles.container, { backgroundColor : Colors.langButton } ] }>
        <Text style={[ styles.text, {color: Colors.text} ]}>{t(title)}</Text>
    </TouchableOpacity>
  )
} 

LangButton.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string
}
  
LangButton.defaultProps = {
    onPress: ()=>{},
    title: "Empty"
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent:"center",
      alignItems: "center",
      marginHorizontal:8,
      padding: 30,
      backgroundColor: "#ffffff",
      width: 156,
      height: 156,
      borderRadius: 15,
      shadowColor: "rgba(0, 0, 0, 0.05)",
      shadowOffset: {
        width: 5,
        height: 2
      }
    },
    text: {       
        alignSelf:"center",
        width: 53,
        height: 28,
        fontWeight:"800",
        fontFamily:"Inter-Regular",
        fontSize:15,
        lineHeight:28,
        textTransform: 'capitalize',
        color: "#141414"
    }
});



export default LangButton