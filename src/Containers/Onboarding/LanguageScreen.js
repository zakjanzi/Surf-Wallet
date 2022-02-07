import React, { useState, useEffect } from 'react'
import {
  View
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTheme } from '@/Hooks'
import { LangButton, ThemeButton  } from '@/Components'
import { changeLanguage } from '@/Store/Language'
import { changeTheme } from '@/Store/Theme'
import { useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigateAndSimpleReset } from '@/Navigators/utils'

const LanguageScreen = () => {
  const { Layout, Gutters, Colors } = useTheme()
  const dispatch = useDispatch()
  const [themeText, setThemeText] = useState('')

  const setLanguageToEnglish = () => {
    dispatch( changeLanguage( {lang : "en"} ) );
    navigateAndSimpleReset("PageNotFound")
  }

  const setLanguageToArabic = () => {
    dispatch( changeLanguage( {lang : "ar"} ) );
    navigateAndSimpleReset("PageNotFound");
  }

  const setTheme = () => {
    const isDarkTheme = useSelector(state => state.theme.darkMode )
    if (isDarkTheme === null || isDarkTheme === false){
        setThemeText('Light mode');
        dispatch( changeTheme( {darkMode : true} ) );
    }
    else if(isDarkTheme === true){
        setThemeText('Dark mode');
        dispatch( changeTheme( {darkMode : false} ) );
    }   
  }

  return (      
      <SafeAreaView style={[Layout.colCenter, Gutters.smallHPadding, { backgroundColor: Colors.backgroundColor } ]}>
          
          <View style={ { marginTop:-20 } }> 
            <LangButton onPress={setLanguageToEnglish} title="English"/> 
            <LangButton onPress={setLanguageToArabic} title="إنجليزي"/> 
          </View>

          <View> 
            <ThemeButton onPress={setTheme} title={themeText} />           
          </View>         

      </SafeAreaView>     
  )
}

export default LanguageScreen
