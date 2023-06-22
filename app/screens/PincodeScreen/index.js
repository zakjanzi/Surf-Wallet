import React, {useState} from 'react';
import CHeader from '../../components/CHeader';
import {View, ScrollView, Image, TouchableOpacity, Text} from 'react-native';
import {t} from 'i18next';
import styles from './styles';
import {useSelector} from 'react-redux';
import {DarkColor, LightColor} from '../../config/colors';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import CButton from '../../components/CButton';
import {isEmpty} from 'lodash';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';



export default function PincodeScreen({navigation}) {
  const route = useRoute();
  const username = route.params?.username;
  const email = route.params?.email;  
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const [pincode, setpincode] = useState('');
  const ref = useBlurOnFulfill({pincode, cellCount: 6});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    pincode,
    setpincode,
  });

  // Button hook (for email and username validation)
  const [isLoading, setIsLoading] = useState(false);
  console.log('Username:', username);
  console.log('Email:', email);



  ///////////////////////////////// API CALLS //////////////////////////////////////
  const handleSubmit = async () => {
    setIsLoading(true); // Set loading state to true

    try {
      const response = await axios.post('http://3.250.35.169/api/auth/register', {
        username,
        email,
        password: pincode,
      });
       // If request successful: navigate to next screen
       navigation.navigate('GenerateWallet');
      console.log(response.data.message);

      // A function below to display a notification or perform any other action to show the success message to the user.
      // const successMessage = response.data.message;
      // showSuccessMessage(successMessage); 

      console.log(response.data);

    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
        // Show the error message to the user or handle it as needed
        console.log(errorMessage);
        // showErrorMessage(errorMessage)
      }

      // Additional error handling code if required
    
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  return (
    <>
      <CHeader
        title={t('createPin')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 128,
            alignItems: 'center',
          }}>
          <SmoothPinCodeInput
            mask={
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 25,
                  backgroundColor: BaseColor.inputBottomLine,
                }}></View>
            }
            cellSpacing={8}
            codeLength={6}
            cellSize={44}
            maskDelay={0}
            password={true}
            cellStyle={{
              borderRadius: 8,
              backgroundColor: BaseColor.langUNSBtnBack,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              elevation: 2,
              margin: 12,
            }}
            // cellStyleFocused={null}
            value={pincode}
            onTextChange={code => setpincode(code)}
            restrictToNumbers
            autoFocus
            cellStyleFocused={{
              borderWidth: 1,
              borderColor: BaseColor.inputBottomLine,
            }}
          />
        </ScrollView>
        <CButton
          value={t('next')}
          disable={pincode.length == 6 ? false : true}
          onPress={async () => {
            await handleSubmit();
          }}
        />
      </View>
    </>
  );
}
