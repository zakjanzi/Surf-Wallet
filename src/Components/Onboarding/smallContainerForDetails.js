import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'
import Icon from 'react-native-vector-icons/FontAwesome';

// text = "onboarding_helper_info

const smallContainerForDetails = ({ onInformation, text, showInfoIcon, showTickIcon }) => {
  const { Colors } = useTheme()
  const { t } = useTranslation() 

  return (
    <View style={ [styles.container, { backgroundColor : Colors.primary} ] }> 
        { showInfoIcon && 
            (<>
                <TouchableOpacity onPress={onInformation} style={styles.icon}>
                    <Icon name="info-circle" size={8} color={Colors.text} />
                </TouchableOpacity>
            </>) 
        }

        <View  style={ [styles.content, { backgroundColor : Colors.primary} ] }>      
            <Text style={[ styles.text, {color: Colors.text} ]}>{t(text)}</Text>
        </View>

        { showTickIcon && 
            (<>
                <TouchableOpacity style={styles.icon2}>
                    <Icon name="info-circle" size={30} color={Colors.text} />
                </TouchableOpacity>
            </>) 
        }
    </View>
  
  )
} 

smallContainerForDetails.propTypes = {
    onInformation: PropTypes.func,
    text: PropTypes.string,
    showInfoIcon: PropTypes.bool,
    showTickIcon:  PropTypes.bool
}
  
smallContainerForDetails.defaultProps = {
    onInformation: () => {},
    text: "",
    showInfoIcon: false,
    showTickIcon: false
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      padding: "5px",
      backgroundColor: "#ffffff",
      width: "328px",
      height: "153px"
    },
    content:{
        padding: 15,
        flexDirection: "column"
    },
    text: {       
        alignSelf:"flex-start",
        fontWeight:"normal",      
        fontFamily:"Inter",
        fontSize:"14px",
        lineHeight:"20px",
        color: "#333333"
    },
    icon:{
        alignSelf: 'center',
        marginBottom:"-10px"
    },
    icon2:{
        alignSelf: 'center',
        marginTop:"-10px"
    }
});

export default smallContainerForDetails