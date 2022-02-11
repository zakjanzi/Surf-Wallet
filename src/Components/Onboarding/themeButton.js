import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'
import Icon from 'react-native-vector-icons/Entypo';

//title = "theme_darkmode | theme_lightmode"
const ThemeButton = ({ onPress, title, iconName, iconFontSize }) => {
  const { Colors } = useTheme()
  const { t } = useTranslation() 

  return (
   
      <TouchableOpacity onPress={onPress} style={ [styles.container, { backgroundColor : Colors.langButton} ] } >
          <Icon name={iconName} style={styles.icon} size={18} color={Colors.text} />
          <Text style={[ styles.text, {color: Colors.text, fontSize: iconFontSize } ]}>{t(title)}</Text>
      </TouchableOpacity>
   
  )
} 

ThemeButton.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    iconName: PropTypes.string,
    iconFontSize: PropTypes.number
}
  
ThemeButton.defaultProps = {
    onPress: ()=>{},
    title: "Empty",
    iconName: "",
    iconFontSize: 12
}

const styles = StyleSheet.create({
    container: {     
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: 2,
      width: 125,
      height: 50,
      borderRadius: 15,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#E0E0E0"      
    },
    icon:{      
      marginHorizontal:10,
    },
    text: {     
        width:63,
        height: 28,
        fontWeight:"500",
        fontFamily:"Inter-Regular",
        fontSize:12,
        lineHeight:18,
        textTransform: 'capitalize',
        alignSelf:'flex-end',
        color: "#292929"
    }
});



export default ThemeButton