import React , { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/Hooks'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    withTiming,
    Extrapolate,
    withRepeat,
    withDelay,
    Easing,
  } from 'react-native-reanimated';

const Pulse = ({ delay = 0, repeat }) => {
    const animation = useSharedValue(0);
    
    useEffect(() => {
      animation.value = withDelay(
        delay,
        withRepeat(
          withTiming(1, {
            duration: 2000,
            easing: Easing.linear,
          }),
          repeat ? -1 : 1,
          false
        )
      );
    }, []);

    const animatedStyles = useAnimatedStyle(() => {
      const opacity = interpolate(
        animation.value,
        [0, 1],
        [0.6, 0],
        Extrapolate.CLAMP
      );
      return {
        opacity: opacity,
        transform: [{ scale: animation.value }],
      };
    });
    return <Animated.View style={[styles.circle, animatedStyles]} />;
};



//title = "onboarding_create_address | "
const FingerButton = ({ onPress, title, waiting }) => {
  const [pulse, setPulse] = useState([1]);

  const { Colors } = useTheme() 

  return (
    <>
        
            <TouchableOpacity style={ [styles.container] } onPress={onPress} >
                <View style={[ styles.padCircle, { alignItems: 'center', justifyContent: 'center' , borderColor: waiting === true ? '#33c065' : Colors.someText} ]}>
                
                      <View style={[ styles.innerCircle, { borderColor: waiting === true ? '#33c065' : Colors.someText } ]} >
                          <Icon style={ [ styles.innerCircle]  }  name="fingerprint" size={50} color={Colors.someText} />            
                      </View>            
                 
                </View> 
                {pulse.map((item, index) => (
                    <Pulse key={index} repeat={index === 0} />
                ))}
            </TouchableOpacity>  

            <Text style={[ styles.text, {color: Colors.someText} ]}>{ String(title).concat( waiting ? " (Hold On!)" : "" )  }</Text>
      
     </>  
  )
} 

FingerButton.propTypes = {
    onPress: PropTypes.func ,
    waiting: PropTypes.bool,
    title: PropTypes.string
}
  
FingerButton.defaultProps = {
    onPress: ()=>{},
    title: "",
    waiting: false
}


const styles = StyleSheet.create({
    container: {   
      flex: 1,   
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: "center",
      backgroundColor: 'transparent',
      width: 146,
      height: 146,
        
    },

    circle: {
        backgroundColor: 'transparent',
        width: 120,
        height: 120,
        borderRadius: 150,
        position: 'absolute',
        borderWidth: 5,
        borderStyle: "solid",
       
        alignContent: 'center'   
    },

    innerCircle: {
        width: 50,
        borderRadius: 30,
        height: 50,       
        position: 'absolute',
        backgroundColor: 'transparent',
    },

    padCircle: {
      width: 70,
      borderRadius: 40,
      height: 70,
      position: 'absolute',
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#3700B3"
    },

    text :{
      flex: 1,
        marginTop: 10,
        alignSelf: 'center',
        color: "#3700B3",      
        fontWeight:"700",
        fontFamily:"Inter-Regular",
        marginTop:"20%",
        fontSize:14,
        lineHeight:28,
        textTransform: 'capitalize'
    }    
});



export default FingerButton