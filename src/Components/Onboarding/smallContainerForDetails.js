import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'
import Icon from 'react-native-vector-icons/Ionicons';

// text = "onboarding_helper_info
const SmallContainerForDetails = ({ onInformation, text, showInfoIcon, showTickIcon, onPress }) => {
  const { Colors } = useTheme()

  return (
    <View style={ [styles.container, styles.shadowProp, { backgroundColor : Colors.langButton } ] }> 
        { showInfoIcon === true && 
            (<>
                <TouchableOpacity onPress={onInformation} style={styles.icon}>
                    <Icon name="information-circle-sharp" size={14} color={Colors.text} />
                </TouchableOpacity>
            </>) 
        }

        <View  style={ [styles.content, { backgroundColor : Colors.langButton } ] }>      
            <Text style={[ styles.text, {color: Colors.text} ]}>{ (text)}</Text>
        </View>

        { showTickIcon  === true && 
            (<>
                <TouchableOpacity style={styles.icon2} onPress={onPress}>
                    <Icon name="checkmark-circle-sharp" style={{ color: Colors.someText }} size={50} color={Colors.text} />
                </TouchableOpacity>
            </>) 
        }
    </View>
  
  )
} 

SmallContainerForDetails.propTypes = {
    onInformation: PropTypes.func,
    text: PropTypes.string,
    showInfoIcon: PropTypes.bool,
    showTickIcon:  PropTypes.bool,
    onPress: PropTypes.func
}
  
SmallContainerForDetails.defaultProps = {
    onInformation: () => {},
    text: "",
    showInfoIcon: false,
    showTickIcon: false,
    onPress: () => {}
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      padding: 5,
      alignSelf: "center",
      width: "100%",
      height: 153,
      borderRadius: 10
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    content:{
        padding: 20,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center'
    },
    text: {       
        alignSelf:"flex-start",
        fontWeight:"normal",      
        fontFamily:"Inter-Regular",
        fontSize:14,
        lineHeight:20
    },
    icon:{
        alignSelf: 'center',
        top: -10,
        marginBottom: 4,
        position: 'absolute'
    },
    icon2:{
        alignSelf: 'center',
        bottom: -30,
        position:'absolute'
    }
});

export default SmallContainerForDetails