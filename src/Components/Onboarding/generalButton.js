import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'
import DropShadow from "react-native-drop-shadow";

//title = "onboarding_create_wallet | "
const GeneralButton = ({ onPress, title, faded }) => {
  const { Colors } = useTheme()


  return (
  
   
      <TouchableOpacity onPress={onPress}  style={ [styles.container, { backgroundColor : faded === false ? Colors.normalButton : Colors.fadedButton } ] }>
          <Text style={[ styles.text, {color: Colors.textInButton , opacity:  faded === false ? 1.0 : 0.5 } ]}>{ title }</Text>
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
      flexDirection:"column",
      alignItems: "center",
      justifyContent:"center",
      borderRadius: 50,
      paddingVertical: 20,
      paddingHorizontal: 32   
    },
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.8,
      shadowRadius: 4,
    },
    text: {       
        fontWeight: "600",
        fontStyle:"normal",
     
        textTransform: "capitalize",
        fontFamily:"Inter-Regular",
        fontSize:14,
        lineHeight:20
    }
});



export default GeneralButton