import React, { useState, useEffect } from 'react';
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
import { useDispatch } from 'react-redux';

import WalletAction from '../../redux/walletReducer/actions';
import AccessTokenAction from '../../redux/walletReducer/actions';
import RefreshTokenAction from '../../redux/walletReducer/actions';

import { apiHandler } from '../../utils/APIHandler';
import { setLoggedInSessionData } from '../../utils/localStorage';


export default function PincodeScreen({navigation}) {
  const { storePincode } = WalletAction;
  const { storeAccessToken } = AccessTokenAction;
  const { storeRefreshToken } = RefreshTokenAction;
  const dispatch = useDispatch();
  const route = useRoute();
  const username = route.params?.username;
  const email = route.params?.email;  
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const [pincode, setpincode] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const ref = useBlurOnFulfill({pincode, cellCount: 6});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    pincode,
    setpincode,
  });

  useEffect(() => {
    console.log('Pincode:', pincode);
    console.log('AccessToken:', accessToken);
    console.log('RefreshToken:', refreshToken);
  }, [pincode, accessToken, refreshToken]);

  // Button hook (for email and username validation)
  const [isLoading, setIsLoading] = useState(false);
  console.log('Username:', username);
  console.log('Email:', email);



  ///////////////////////////////// API CALLS //////////////////////////////////////
  const handleSubmit = async () => {
    setIsLoading(true); // Set loading state to true

    try {
      
      const response = await apiHandler.post('/api/auth/register', {
        username,
        email,
        password: pincode,
      });

      dispatch(storePincode(pincode))
       // Extract tokens from the API response
       const { access_token: accessToken, refresh_token: refreshToken } = response.data;

       // Dispatch actions to save tokens in Redux store
       
      // Store Token in locaxl storage
      setLoggedInSessionData(accessToken)
      dispatch(storeAccessToken(accessToken));
      setAccessToken(accessToken)
      dispatch(storeRefreshToken(refreshToken));
      setRefreshToken(refreshToken)

       // If request successful: navigate to next screen
      navigation.navigate('GenerateWallet');
      
      // console.log(response.data.message);
      // console.log(response.data);

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

