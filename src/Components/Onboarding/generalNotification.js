import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'

// header & body = "onboarding_account_info_header | onboarding_account_info_body | onboarding_account_modal_header | onboarding_account_modal_body
const GeneralNotification = ({ header, body }) => {
  const { Colors } = useTheme()
  const { t } = useTranslation() 

  return (
    <View style={ [styles.container, { backgroundColor : Colors.backgroundColor} ] }> 
       
        <View  style={[styles.header, { backgroundColor : Colors.backgroundColor}]} >      
            <Text style={[styles.headertext, {color: Colors.text} ]}>{t(header)}</Text>
        </View>

        <View  style={[ styles.body, { backgroundColor : Colors.backgroundColor}] }>      
            <Text style={ [styles.bodytext, {color: Colors.text} ]}>{t(body)}</Text>
        </View>

    </View>
  
  )
} 

GeneralNotification.propTypes = {
    header: PropTypes.string,
    body: PropTypes.string,
}
  
GeneralNotification.defaultProps = {
    header: "",
    body: ""
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      alignItems: 'flex-start',
      padding: 1,
      backgroundColor: "#ffffff",
      width: 327,
      height: 190
    },
    header:{
        width: 149,
        height: 28,
        marginBottom: 8     
    },
    headertext:{
        fontWeight:"bold",      
        fontFamily:"Inter-Regular",
        fontWeight:600,
        fontSize:16,
        lineHeight:28,
        color: "#292929"
    },
    body: {       
        flex:1,
        padding: 5
    },
    bodytext:{
        fontWeight:"normal",      
        fontFamily:"Inter-Regular",
        fontSize:14,
        lineHeight:26,
        color: "#707070"
    },
});

export default GeneralNotification