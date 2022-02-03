import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'
import Icon from 'react-native-vector-icons/FontAwesome';

//title = "theme_darkmode | theme_lightmode"
const themeButton = ({ onPress, title }) => {
  const { Colors } = useTheme()
  const { t } = useTranslation() 

  return (
    <TouchableOpacity onPress={onPress} style={ [styles.container, { backgroundColor : Colors.primary} ] }>
        <Icon name="moon" style={styles.icon} size={30} color={Colors.text} />
        <Text style={[ styles.text, {color: Colors.text} ]}>{t(title)}</Text>
    </TouchableOpacity>
  )
} 

themeButton.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string
}
  
themeButton.defaultProps = {
    onPress: ()=>{},
    title: "Empty"
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      padding: "16px",
      backgroundColor: "#ffffff",
      width: "125px",
      height: "50px",
      borderRadius: "15px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#E0E0E0"      
    },
    icon:{
        left:"12.8%",
        right:"73.6%"
    },
    text: {       
        left:"36.8%",
        right:"12.8%",
        width: "53px",
        height: "28px",
        fontWeight:"500",
        fontFamily:"Inter",
        fontSize:"12px",
        lineHeight:"18px",
        textTransform: 'capitalize',
        color: "#292929"
    }
});



export default themeButton