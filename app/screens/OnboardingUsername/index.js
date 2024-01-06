//Notes:
// Modified the code to remove the privacy option (public/private usernames)
// Merged the Email and username screens to one (OnboardingUsername + RecoveryOption)

import {t} from 'i18next';
import {isEmpty} from 'lodash';
import React, {useRef, useState} from 'react';
import {View, TextInput, Text, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {enableAnimateInEaseOut} from '../../config/commonFunctions';
import styles from './styles';
import CButton from '../../components/CButton';
import CInput from '../../components/CInput';
import {Images} from '../../config/images';

import { apiHandler } from '../../utils/APIHandler';

import axios from 'axios';

export default function OnboardingUsername({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  //username hooks
  const [username, setusername] = useState('');
  const [available, setavailable] = useState(false);
  const usernameRef = useRef();

  // email hooks + validation
  const emailRef = useRef();
  const [email, setemail] = useState('');
  const [isEmailValid, setisEmailValid] = useState(false);

  // Button hook (for email and username validation)
  const [isLoading, setIsLoading] = useState(false);

  const ValidateEmail = val => {
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (isEmpty(val) || !emailReg.test(val)) {
      setisEmailValid(false);
    } else {
      setisEmailValid(true);
    }
  };

  // privacy tips text
  const pTips = [t('pTip1'), t('pTip2'), t('pTip3')];


  enableAnimateInEaseOut();

  ///////////////////////////////// API CALLS //////////////////////////////////////

  const validateInputs = async () => {
    setIsLoading(true); // Set loading state to true

    try {
      
      const response = await apiHandler.post('/api/auth/register/validate', {
        username,
        email
      });
      // If request successful: navigate to next screen
      navigation.navigate('SecurityScreen', { username, email });
      // Log the success message from the response
      console.log(response.data.message); 
  
      // To display a notification, update a success message component, or perform any other action to show the success message to the user.
  
      // const successMessage = response.data.message;
      // Function to show success message to the user
      // showSuccessMessage(successMessage);    
    
    } catch (error) {
      // If there's an error: show error message (from the "message" key in the response")
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

  ///////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <CHeader
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <CText
            value={t('pickUsername')}
            semiBold
            style={{
              color: BaseColor.text1,
              fontSize: 16,
              marginBottom: 15,
            }}
          />
          <CText
            value={t('userThisIsHow')}
            style={{
              color: BaseColor.text2,
              fontSize: 12,
              marginTop: 5,
            }}
          />
          <View
            style={[
              styles.inputCont,
              {
                borderBottomColor: !isEmpty(username)
                  ? !available
                    ? BaseColor.notavailableName
                    : usernameRef?.current?.isFocused()
                    ? BaseColor.inputBottomLine
                    : BaseColor.placeholderInput
                  : BaseColor.placeholderInput,
              },
            ]}>
            {!isEmpty(username) && (
              <Text style={[styles.leftIcon, {color: BaseColor.inputColor}]}>
                @
              </Text>
            )}
            <TextInput
              ref={usernameRef}
              value={username}
              autoFocus={true}
              onChangeText={val => {
                setusername(val.trim());

                //check if username Available or not
                if (val.trim().length >= 4) {
                  if (val.trim() === 'username' || isEmpty(val)) {
                    setavailable(false);
                  } else {
                    setavailable(true);
                  }
                } else {
                  setavailable(false);
                }
              }}
              placeholder={t('usernamePL')}
              placeholderTextColor={BaseColor.placeholderInput}
              style={[
                styles.txtInput,
                {
                  color: BaseColor.inputColor,
                },
              ]}
            />

            <CText
              value={
                !isEmpty(username)
                  ? available
                    ? t('available')
                    : t('notAvailable')
                  : ''
              }
              style={[
                styles.righttxt,
                {
                  color:
                    username !== 'username' && available
                      ? BaseColor.availableName
                      : BaseColor.notavailableName,
                },
              ]}
            />
          </View>
          {!isEmpty(username) && username.length < 4 && (
            <CText
              value={t('usernameError')}
              style={[
                styles.errorTxt,
                {
                  color: BaseColor.notavailableName,
                },
              ]}
            />
          )}
        </ScrollView>

      <View>


        <CText
            value={t('recoveryOption')}
            semiBold
            style={{
              color: BaseColor.text1,
              fontSize: 16,
              marginBottom: 2,
          }}
        />
        <View
          style={{ marginTop: 16}}
          showsVerticalScrollIndicator={false}>
          <CText
            value={t('enterEmail')}
            semiBold
            style={{
              color: BaseColor.text1,
              fontSize: 16,
            }}
          />
          <CText
            value={t('recoverForgotPin')}
            style={{
              color: BaseColor.text2,
              fontSize: 12,
            }}
          />

          <CInput
            ref={emailRef}
            value={email}
            onChangeText={val => {
              setemail(val.trim());

              //Validate Email
              ValidateEmail(val);
            }}
            placeholder={t('emailPH')}
            leftIcon={
              !isEmpty(email)
                ? isEmailValid
                  ? dark
                    ? Images.valid_tick_dark
                    : Images.valid_tick_light
                  : Images.invalid_tick_light
                : false
            }
            keyboardType="email-address"
            style={{marginTop: 22}}
            error={!isEmailValid}
          />
          </View>

          {emailRef?.current?.isFocused() && (
            <View>
              <CText
                value={t('privacyTips')}
                medium
                style={{
                  color: BaseColor.text2,
                  fontSize: 12,
                  marginTop: 20,
                }}
              />
              <View style={{marginTop: 12}}>
                <Text style={{color: BaseColor.text2, fontSize: 12, marginLeft: 16, marginBottom: 12}}>
                  • {pTips[0]}
                </Text>
                <Text style={{color: BaseColor.text2, fontSize: 12, marginLeft: 16, marginBottom: 12}}>
                  • {pTips[1]}
                </Text>
                <Text style={{color: BaseColor.text2, fontSize: 12, marginLeft: 16, marginBottom: 12}}>
                  • {pTips[2]}
                </Text>
              </View>
            </View>
          )}
        </View>
        <CButton
          value={t('continue')}
          disable={!isEmailValid || !available || isLoading}
          onPress={async () => {
            await validateInputs();
          }}
        />
      </View>
    </>
  );
}