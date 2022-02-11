import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'
import Icon from 'react-native-vector-icons/Ionicons';


const SmallContainerForKeys = ({ onCopy, header, address, showCopyIcon, showBorderBottom }) => {
  const { Colors } = useTheme()

  return (
    <View  style={ [styles.container , showBorderBottom === true ? styles.borderLine : {} ] }> 
        <View style={  [ { flexDirection: "row" , justifyContent: 'space-between' }] }>     
            <Text style={[ styles.text, {color: Colors.skip} ]}>{ (header) }</Text>
            { showCopyIcon && 
            (<>
                <TouchableOpacity onPress={onCopy} style={styles.icon}>
                    <Icon name="copy-outline" size={20} color={Colors.someText} />
                </TouchableOpacity>
            </>) 
            }
        </View> 
        <Text style={[ styles.address, {color: Colors.text} ]}>{address}</Text>
    </View>
  )
} 

SmallContainerForKeys.propTypes = {
    onCopy: PropTypes.func,
    header: PropTypes.string,
    address: PropTypes.string,
    showCopyIcon: PropTypes.bool,
    showBorderBottom: PropTypes.bool
}
  
SmallContainerForKeys.defaultProps = {
    onCopy: () => {},
    header: "",
    address: "",
    showCopyIcon: false,
    showBorderBottom: false
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "column", 
      justifyContent: "space-evenly",   
      padding: 5,    
      width: "100%",
      height: 74,
    
    },
    text: {       
        alignSelf:"flex-start",
        fontWeight:"normal",
        width:120,
        height: 16,
        fontFamily:"Inter-Regular",
        fontSize:14,
        lineHeight:18,      
        textTransform: 'capitalize',
        color: "#707070"        
    },
    icon:{
       width:20,
       height:20
    },
    address: {
        fontWeight:"500",
        width: "100%",        
        paddingHorizontal:5,
        paddingVertical:5,
        fontFamily:"Inter-Regular",
        fontSize:16,
        lineHeight:20,      
        color: "#141414",        
        flexWrap: "wrap",
        
    },
    borderLine: {
        borderBottomColor: "#707070",
        borderBottomWidth: 1,
        borderStyle: 'solid'
    }
});

export default SmallContainerForKeys