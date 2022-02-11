import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@/Hooks'
import Icon from 'react-native-vector-icons/FontAwesome';

//This is the Yellow notification that shows in the modal
// text = "onboarding_account_modal_yellow 
const ModalNotification = ({ text, showIcon }) => {
  const { Colors } = useTheme()

  return (
      <View style={ {flexDirection: 'column', width: 326 , height: 88 } }> 
        { showIcon === true && 
            <View style={styles.icon}> 
                <Icon name="exclamation-circle" size={23} color={Colors.someText} />           
            </View> 
        }

        <View style={ [styles.container] }>     
            <Text style={[styles.text]}>{(text)}</Text>
        </View>

      </View>   
  )
} 

ModalNotification.propTypes = {
    text: PropTypes.string,
    showIcon: PropTypes.bool,
}
  
ModalNotification.defaultProps = {
    text: "",
    showIcon: true
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: "center",   
      backgroundColor: "#FCF3C9",
      borderRadius:6,
      marginBottom: '5%'      
    },
    icon:{
        marginBottom: -5,
        height:24,
        alignSelf:"center",
        zIndex:1,
        position:'absolute'     
    },
    text:{
        fontWeight:"normal",      
        fontFamily:"Inter-Regular",
        fontSize:12,
        lineHeight:20,
        color: "#1F1F1F"
    }
});
/**   paddingTop:"24px",
      paddingBottom:"24px",
      paddingRight:"30px",
      paddingLeft:"30px", */
export default ModalNotification