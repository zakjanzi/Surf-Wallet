import {isEmpty} from 'lodash';
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';
import {DarkColor, LightColor} from '../../config/colors';
import {FontFamily} from '../../config/typography';

const CInput = React.forwardRef((props, ref) => {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const {
    value,
    onChangeText,
    placeholder,
    placeholderTextColor = BaseColor.inputBorder,
    style = {},
    leftIcon,
    inputStyle = {},
    keyboardType,
    secureTextEntry,
    onSubmitEditing = () => {},
    returnKeyType,
    error,
    autoFocus,
  } = props;

  const [focus, setfocus] = useState(false);
  return (
    <>
      <View
        style={[
          {
            flexDirection: 'row',
            borderWidth: 1,
            borderColor:
              error && !isEmpty(value)
                ? BaseColor.notavailableName
                : focus || !isEmpty(value)
                ? BaseColor.inputFocusBorder
                : BaseColor.inputBorder,
            borderRadius: 6,
            alignItems: 'center',
            paddingHorizontal: 16,
          },
          style,
        ]}>
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          style={[
            {
              flex: 1,
              fontFamily: FontFamily.Inter_Medium,
              color: BaseColor.inputText,
            },
            inputStyle,
          ]}
          onFocus={() => setfocus(true)}
          onBlur={() => setfocus(false)}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          autoFocus={autoFocus}
        />
        {leftIcon && (
          <Image
            source={leftIcon}
            style={{height: 16, width: 16}}
            resizeMode="contain"
          />
        )}
      </View>
    </>
  );
});

export default CInput;
