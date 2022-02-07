import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'
import Icon from 'react-native-vector-icons/FontAwesome';

const FloatButton = ( { onPress } ) => {
  const { Colors } = useTheme()
 
  return (
    <View  style={ [styles.container, { backgroundColor : Colors.backgroundColor} ] }>
      
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPress}
         >
            <Icon name="arrow-right" style={styles.floatingButtonStyle} size={30} color={Colors.text} />
        </TouchableOpacity>

    </View>
  )
} 

FloatButton.propTypes = { }
  
FloatButton.defaultProps = { }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: 1,
      backgroundColor: "#ffffff",
      borderRadius: 84,
      shadowColor: "rgba(58, 12, 163, 0.3)",
      shadowOffset: {
        width: 5,
        height: 2
      }
    },
    
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50
    },

});

export default FloatButton