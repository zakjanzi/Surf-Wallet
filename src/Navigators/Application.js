import React from 'react'
import { View, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { StartupContainer, LanguageScreen, PageNotFound } from '@/Containers'
import { useTheme } from '@/Hooks'
//import MainNavigator from './Main'
import { navigationRef } from './utils'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, Colors, NavigationTheme } = useTheme()
 // const { colors } = NavigationTheme

  return (
    <View style={[Layout.fill, { backgroundColor: Colors.backgroundColor }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Startup">
          <Stack.Screen name="Startup" component={StartupContainer} />
          <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
          <Stack.Screen name="PageNotFound" component={PageNotFound} />
        </Stack.Navigator>
        
      </NavigationContainer>
    </View>
  )
}

export default ApplicationNavigator
