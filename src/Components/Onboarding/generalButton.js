import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'

//title = "onboarding_create_wallet | "
const GeneralButton = ({ onPress, title, faded }) => {
  const { Colors } = useTheme()
  const { t } = useTranslation() 

  return (
    <TouchableOpacity onPress={onPress} style={ [styles.container, { backgroundColor : faded === false ? Colors.normalButton : Colors.fadedButton } ] }>
        <Text style={[ styles.text, {color: Colors.text} ]}>{t(title)}</Text>
    </TouchableOpacity>
  )
} 

GeneralButton.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    faded: PropTypes.bool
}
  
GeneralButton.defaultProps = {
    onPress: ()=>{},
    title: "Empty",
    faded: false
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:"column",
      alignItems: "center",
      justifyContent:"center",
      elevation: 8,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      shadowColor: "rgba(58, 12, 163, 0.15)",
      shadowOffset: {
        width: 5,
        height: 2
      },
      shadowRadius: 3    
    },
    text: {       
        color: "#fff",
        fontWeight: 600,
        fontStyle:"normal",
        alignSelf: "center",
        textTransform: "capitalize",
        fontFamily:"Inter-Regular",
        fontSize:14,
        lineHeight:20
    }
});



export default GeneralButton