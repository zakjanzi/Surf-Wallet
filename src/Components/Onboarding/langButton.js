import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'

//title = "language"
const langButton = ({ onPress, title }) => {
  const { Colors } = useTheme()
  const { t } = useTranslation()

  return (
    <TouchableOpacity onPress={onPress} style={ [styles.container, { backgroundColor : Colors.primary} ] }>
        <Text style={[ styles.text, {color: Colors.text} ]}>{t(title)}</Text>
    </TouchableOpacity>
  )
} 

langButton.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string
}
  
langButton.defaultProps = {
    onPress: ()=>{},
    title: "Empty"
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      padding: 64,
      backgroundColor: "#ffffff",
      width: "156px",
      height: "156px",
      borderRadius: "15px",
      shadowColor: rgba(0, 0, 0, 0.05),
      shadowOffset: {
        width: '5px',
        height: '2px'
      }
    },
    text: {       
        alignSelf:"center",
        width: "53px",
        height: "28px",
        fontWeight:"600",
        fontFamily:"Inter",
        fontSize:"15px",
        lineHeight:"28px",
        textTransform: 'capitalize',
        color: "#141414"
    }
});



export default langButton