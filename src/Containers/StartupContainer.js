import React, { useEffect } from 'react'
import { Text, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'
import { setDefaultTheme } from '@/Store/Theme'
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigateAndSimpleReset } from '@/Navigators/utils'

const StartupContainer = () => {
  const { Layout, Colors } = useTheme()
  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 5000),
    )
    await setDefaultTheme({ theme: 'default', darkMode: null })
    navigateAndSimpleReset('LanguageScreen')
  }

  useEffect(() => {
    init()
  }) 

  return (
    <SafeAreaView style={[Layout.fill, Layout.colCenter, Colors.backgroundColor ]}>
      <Text style={styles.text}> Surf Wallet </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text:{
    fontSize: 34,
    lineHeight: 40,
    fontFamily:"Inter-Regular",
    fontWeight:"bold",
    fontStyle:"normal",
    color:"#FFFFFF"
  }
})

export default StartupContainer
