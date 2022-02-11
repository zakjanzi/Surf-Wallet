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
import { useTranslation } from 'react-i18next'

const LanguageScreen = () => {
  const { Layout, Gutters, Colors } = useTheme()
  const dispatch = useDispatch()
  const [themeText, setThemeText] = useState('Dark mode')
  const [defaultIcon, setDefaultIcon] = useState('moon')
  const [fontSizeOfIcon, setfontSizeOfIcon] = useState(12)
  const isDarkTheme = useSelector(state => state.theme.darkMode )

  const setLanguageToEnglish = () => {
    dispatch( changeLanguage( {lang : "en"} ) );
    navigateAndSimpleReset("IntroScreen")
  }

  const setLanguageToArabic = () => {
    dispatch( changeLanguage( {lang : "ar"} ) );
    navigateAndSimpleReset("IntroScreen");
  }

  const setTheme = () => {
   
    if (isDarkTheme === null || isDarkTheme === false){
        setThemeText('Light mode');
        setDefaultIcon('light-up');
        setfontSizeOfIcon(10)
        dispatch( changeTheme( {darkMode : true} ) );
    }
    else if(isDarkTheme === true){
        setThemeText('Dark mode');
        setDefaultIcon('moon');
        setfontSizeOfIcon(12)
        dispatch( changeTheme( {darkMode : false} ) );
    }   
  }

  return (      
      <SafeAreaView style={[Layout.colCenter, Gutters.smallHPadding, { backgroundColor: Colors.backgroundColor, flex: 1 } ]}>
          
          <View style={ { flexDirection:"row", justifyContent:"space-between" } }> 
            <LangButton onPress={setLanguageToEnglish} title="English"/> 
            <LangButton onPress={setLanguageToArabic} title="إنجليزي"/> 
          </View>

          <View style={ { flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop: 50 } }> 
            <ThemeButton onPress={setTheme} iconName={defaultIcon} iconFontSize={fontSizeOfIcon} title={themeText} />           
          </View>         

      </SafeAreaView>     
  )
}

export default LanguageScreen
