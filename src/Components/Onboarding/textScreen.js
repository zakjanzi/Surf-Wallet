import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View} from 'react-native'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'

//title_header && title_body = " onboarding_textheader | onboarding_textbody | onboarding_textheader_two | onboarding_textbody_two | onboarding_textheader_three | onboarding_textbody_three "
const TextScreen = ({ title_header, title_body, nextScreen, onSkip }) => {
  const { Colors } = useTheme()
  const { t } = useTranslation() 

  return (
    <View  style={ [styles.container, { backgroundColor : Colors.backgroundColor} ] }>
      
        <Text style={[ styles.headertext, {color: Colors.headerText} ]}>{t(title_header)}</Text>

        <Text style={[ styles.bodytext, {color: Colors.text} ]}>{t(title_body)}</Text>      

    </View>
  )
} 

TextScreen.propTypes = {
    title_header: PropTypes.string,
    title_body: PropTypes.string,
    nextScreen: PropTypes.func
}
  
TextScreen.defaultProps = {
    title_header: "",
    title_body: "",
    nextScreen: () => {}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-around",
      padding: 1,
      width: 279,
      height:122
    },
   
    headertext: {       
        fontWeight:"800",
        fontFamily:"Inter-Regular",
        fontSize:19,
        lineHeight:29,
        textTransform: 'capitalize'
    },
    bodytext: {       
        fontWeight:"500",
        fontFamily:"Inter-Regular",
        fontSize:16,
        lineHeight:28
    },
   
});

export default TextScreen