import React , { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'
import Icon from 'react-native-vector-icons/FontAwesome';
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
const FingerButton = ({ onPress }) => {
  const [pulse, setPulse] = useState([1]);

  const { Colors } = useTheme()
  const { t } = useTranslation() 

  return (
    <>
        
            <View style={ [styles.container] }>
                <View  style={ [styles.innerCircle] }>
                    <TouchableOpacity onPress={onPress} >
                        <Icon name="fingerprint" size={23} color={Colors.someText} />            
                    </TouchableOpacity>            
                </View>
                {pulse.map((item, index) => (
                    <Pulse repeat={index === 0} />
                ))}
            </View>  
            <Text style={[ styles.text, {color: Colors.text} ]}>{t(title)}</Text>
      
     </>  
  )
} 

FingerButton.propTypes = {
    onPress: PropTypes.func 
}
  
FingerButton.defaultProps = {
    onPress: ()=>{}
}

const styles = StyleSheet.create({
    container: {   
      flex: 1,   
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: 'transparent',
      width: 146,
      height: 146     
    },

    circle: {
        backgroundColor: 'transparent',
        width: 107,
        height: 107,
        borderRadius: 150,
        position: 'absolute',
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "rgba(58, 12, 163, 0.12)",
        alignContent: 'center'   
    },

    innerCircle: {
        width: 30,
        borderRadius: 40,
        height: 30,
        zIndex: 100,
        position: 'absolute',
        backgroundColor: 'white',
    },

    text :{
        marginTop: 10,
        alignSelf: 'center',
        color: "#3700B3",
        width: 228,
        height: 28,
        fontWeight:500,
        fontFamily:"Inter-Regular",
        fontSize:15,
        lineHeight:28,
        textTransform: 'capitalize'
    }    
});



export default FingerButton