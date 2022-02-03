import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'
import Icon from 'react-native-vector-icons/FontAwesome';
import TouchableRipple  from 'react-native-touch-ripple'

//title = "onboarding_create_address | "
const fingerButton = ({ onPress }) => {
  const { Colors } = useTheme()
  const { t } = useTranslation() 

  return (
    <>
        <TouchableRipple rippleColor="#3A0CA3" rippleOpacity={0.7} rippleDuration={1200}>
            <View style={ [styles.container] }>
                <View  style={ [styles.innercircle] }>
                    <TouchableOpacity onPress={onPress} >
                        <Icon name="fingerprint" size={23} color={Colors.primary} />            
                    </TouchableOpacity>            
                </View>
            </View>  
            <Text style={[ styles.text, {color: Colors.text} ]}>{t(title)}</Text>
        </TouchableRipple>
     </>  
  )
} 

fingerButton.propTypes = {
    onPress: PropTypes.func 
}
  
fingerButton.defaultProps = {
    onPress: ()=>{}
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: 'transparent',
      width: "146px",
      height: "146px",
      borderRadius: "50px",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: rgba(58, 12, 163, 0.12)      
    },

    innercircle: {
        backgroundColor: 'transparent',
        width: "107px",
        height: "107px",
        borderRadius: "50px",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: rgba(58, 12, 163, 0.12),
        alignContent: 'center'   
    },
    text :{
        marginTop: "10px",
        color: "#3700B3",
        width: "228px",
        height: "28px",
        fontWeight:"500",
        fontFamily:"Inter",
        fontSize:"15px",
        lineHeight:"28px",
        textTransform: 'capitalize'
    }
});



export default fingerButton