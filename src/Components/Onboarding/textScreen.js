import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'

//title_header && title_body = " onboarding_textheader | onboarding_textbody | onboarding_textheader_two | onboarding_textbody_two | onboarding_textheader_three | onboarding_textbody_three "
const textScreen = ({ title_header, title_body }) => {
  const { Colors } = useTheme()
  const { t } = useTranslation() 

  return (
    <View  style={ [styles.container, { backgroundColor : Colors.primary} ] }>
      
        <Text style={[ styles.headertext, {color: Colors.headertext} ]}>{t(title_header)}</Text>

        <Text style={[ styles.bodytext, {color: Colors.text} ]}>{t(title_body)}</Text>

    </View>
  )
} 

textScreen.propTypes = {
    title_header: PropTypes.string,
    title_body: PropTypes.string
}
  
textScreen.defaultProps = {
    title_header: "",
    title_body: ""
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-around",
      padding: "1px",
      backgroundColor: "#ffffff",
      width: "279px",
      height: "122px"
    },
    headertext: {       
        fontWeight:"800",
        fontFamily:"Inter",
        fontSize:"19px",
        lineHeight:"29px",
        textTransform: 'capitalize',
        color: "#3700B3"
    },
    bodytext: {       
        fontWeight:"500",
        fontFamily:"Inter",
        fontSize:"16px",
        lineHeight:"28px",      
        color: "#333333"
    }
});

export default textScreen