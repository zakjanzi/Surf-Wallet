import React from 'react'
import { StyleSheet , View, Text} from 'react-native'
import PropTypes from 'prop-types'
import { useTheme } from '@/Hooks'

// no translation needed here
const SeedPhraseBlock = ({ text }) => {
  const { Colors } = useTheme()

  return (
    <View style={ [styles.container, { backgroundColor : Colors.backgroundColor } ] }>
       <Text style={[ styles.text, {color: Colors.text } ]}>{text}</Text>
    </View>
  )
} 

SeedPhraseBlock.propTypes = {
    text: PropTypes.string
}
  
SeedPhraseBlock.defaultProps = {
    text: "Nil"
}

const styles = StyleSheet.create({
    container: {     
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal:10,
      padding: 5,
      width: "20%",
      height: 36,
      borderRadius: 6,
      borderColor: 'transparent',
      borderWidth: 1      
    },
    text: {
      fontWeight:"700",
      fontFamily:"Inter-Regular",
      fontSize:12,
      lineHeight:20
  }
});



export default SeedPhraseBlock