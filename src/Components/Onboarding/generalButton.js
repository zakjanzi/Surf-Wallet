import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'

//title = "onboarding_create_wallet | "
const generalButton = ({ onPress, title }) => {
  const { Colors } = useTheme()
  const { t } = useTranslation() 

  return (
    <TouchableOpacity onPress={onPress} style={ [styles.container, { backgroundColor : Colors.primary} ] }>
        <Text style={[ styles.text, {color: Colors.text} ]}>{t(title)}</Text>
    </TouchableOpacity>
  )
} 

generalButton.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string
}
  
generalButton.defaultProps = {
    onPress: ()=>{},
    title: "Empty"
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:"row",
      elevation: 8,
      backgroundColor: "#009688",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      shadowColor: rgba(58, 12, 163, 0.15),
      shadowOffset: {
        width: '5px',
        height: '2px'
      },
      shadowRadius: "3px"     
    },
    text: {       
        color: "#fff",
        fontWeight: "600",
        fontStyle:"normal",
        alignSelf: "center",
        textTransform: "capitalize",
        fontWeight:"600",
        fontFamily:"Inter",
        fontSize:"14px",
        lineHeight:"20px"
    }
});



export default generalButton