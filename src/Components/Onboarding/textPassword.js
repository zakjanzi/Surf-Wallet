import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, Pressable, TextInput, View, Text,  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@/Hooks'

// name = onboarding_textfield_password | onboarding_textfield_confirmpassword
const TextPassword = ({ onChange, name, password }) => {
  const { Colors } = useTheme()
 // const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor:  Colors.langButton  }]}>
      
      <Text style={[ styles.text, {color: Colors.skip} ]} > { (name) } </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          name="password"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="newPassword"
          secureTextEntry={passwordVisibility}
          value={password}
          enablesReturnKeyAutomatically
          onChangeText={onChange}
        />
        <Pressable onPress={handlePasswordVisibility}>
          <Icon name={rightIcon} size={23} color={Colors.someText} />   
        </Pressable>
      </View>
    </View>
  );
}

TextPassword.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string
}
  
TextPassword.defaultProps = {
    onChange: () => {},
    name: ""
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    height:72
  },
  inputContainer: {
    flex: 1,   
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth:1,
    borderStyle:"solid",
    borderColor: "#CCCCCC",
  },
  inputField: {
    fontSize: 14,
    width: '90%',
    paddingHorizontal: 20
  },
  text: {       
    fontWeight:"600",
    fontStyle:"normal",
    textTransform: "capitalize",
    fontFamily:"Inter-Regular",
    fontSize:14,
    lineHeight:28,   
    height:28,
    marginBottom:5
}
});

export default TextPassword