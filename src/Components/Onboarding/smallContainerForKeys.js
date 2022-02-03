import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'
import Icon from 'react-native-vector-icons/FontAwesome';

// title = "onboarding_create_address_header

const smallContainerForKeys = ({ onCopy, header, address, showCopyIcon }) => {
  const { Colors } = useTheme()
  const { t } = useTranslation() 

  return (
    <View  style={ [styles.container, { backgroundColor : Colors.primary} ] }>      
        <Text style={[ styles.text, {color: Colors.text} ]}>{t(header)}</Text>
        { showCopyIcon && 
        (<>
            <TouchableOpacity onPress={onCopy}>
                <Icon name="copy" style={styles.icon} size={30} color={Colors.text} />
            </TouchableOpacity>
         </>) 
        }
        <Text style={[ styles.address, {color: Colors.text} ]}>{address}</Text>
    </View>
  )
} 

smallContainerForKeys.propTypes = {
    onCopy: PropTypes.func,
    header: PropTypes.string,
    address: PropTypes.string,
    showCopyIcon: PropTypes.bool
}
  
smallContainerForKeys.defaultProps = {
    onCopy: () => {},
    header: "",
    address: "",
    showCopyIcon: false
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      flexBasis: 3,
      padding: "5px",
      backgroundColor: "#ffffff",
      width: "328px",
      height: "74px"
    },
    text: {       
        alignSelf:"flex-start",
        fontWeight:"normal",
        width: "65px",
        height: "16px",
        fontFamily:"Inter",
        fontSize:"12px",
        lineHeight:"16px",
        textTransform: 'capitalize',
        color: "#707070",
        flexGrow: 2
    },
    icon:{
        flexGrow: 1,
        alignSelf: 'flex-end'
    },
    address: {       
        alignSelf:"flex-start",
        fontWeight:"normal",
        width: "279px",
        height: "26px",
        flexGrow: 2,
        fontFamily:"Inter",
        fontSize:"14px",
        lineHeight:"26px",      
        color: "#141414"
    }
});

export default smallContainerForKeys