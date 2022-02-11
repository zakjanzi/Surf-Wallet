import React from 'react'
import { StyleSheet , View} from 'react-native'
import PropTypes from 'prop-types'
import { useTheme } from '@/Hooks'
import * as Progress from 'react-native-progress';

const ProgressBar = ({ progress, width }) => {
  const { Colors } = useTheme()

  return (
    <View style={ [styles.container ] }>
       <Progress.Bar progress={progress} width={width} color={Colors.someText} />
    </View>
  )
} 

ProgressBar.propTypes = {
    progress: PropTypes.number,
    width: PropTypes.number
}
  
ProgressBar.defaultProps = {
    progress: 0.1,
    width: 230
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      width: "100%"
    }
});



export default ProgressBar