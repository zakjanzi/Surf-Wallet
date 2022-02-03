import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { useTheme } from '@/Hooks'
import Icon from 'react-native-vector-icons/FontAwesome';

const floatButton = ( { onPress } ) => {
  const { Colors } = useTheme()
 
  return (
    <View  style={ [styles.container, { backgroundColor : Colors.primary} ] }>
      
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPress}
          style={styles.touchableOpacityStyle}>
            <Icon name="arrow-right" style={styles.floatingButtonStyle} size={30} color={Colors.text} />
        </TouchableOpacity>

    </View>
  )
} 

floatButton.propTypes = { }
  
floatButton.defaultProps = { }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: "1px",
      backgroundColor: "#ffffff",
      borderRadius: "84px",
      shadowColor: rgba(58, 12, 163, 0.3),
      shadowOffset: {
        width: '5px',
        height: '2px'
      }
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
    },

});

export default floatButton