import React from 'react'
import { View, StatusBar } from 'react-native'
import { createNativeStackNavigator  } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { StartupContainer, FinalComments, LanguageScreen, PageNotFound, IntroScreen, GenerateWalletScreen, SeedPhraseScreen, CreateProfileScreen, AccountInformationScreen } from '@/Containers'
import { useTheme } from '@/Hooks'
import { navigationRef } from './utils'
import { useTranslation } from 'react-i18next'

const Stack = createNativeStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Colors, NavigationTheme } = useTheme()
  const { t } = useTranslation()

  return (
    
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
      {/*  <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} /> */}
        
        <Stack.Navigator  initialRouteName="Startup">
          <Stack.Screen name="Startup" options={{ headerShown: false }} component={StartupContainer} />
          <Stack.Screen name="LanguageScreen" options={{ headerShown: false }} component={LanguageScreen}  />
          <Stack.Screen name="PageNotFound" options={{ headerShown: false }} component={PageNotFound} />
          <Stack.Screen name="IntroScreen" options={{ headerShown: false }} component={IntroScreen} />
        
          <Stack.Screen
            name="GenerateWalletScreen"
            component={GenerateWalletScreen}          
            options={{
              title: 'Generate A Wallet',
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: Colors.backgroundColor,
              },
              headerTintColor: Colors.text,
              headerTitleStyle: {
                fontWeight: 'bold',
              }  
            }}
          />
         
          <Stack.Screen name="SeedPhraseScreen" component={SeedPhraseScreen} 
          options={{
              title: 'Seed Phrase',
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: Colors.backgroundColor,
              },
              headerTintColor: Colors.text,
              headerTitleStyle: {
                fontWeight: 'bold',
              }  
            }} />

          <Stack.Screen name="CreateProfileScreen" component={CreateProfileScreen} 
            options={{
              title: 'Create A Profile',
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: Colors.backgroundColor,
              },
              headerTintColor: Colors.text,
              headerTitleStyle: {
                fontWeight: 'bold',
              }  
            }}
          />

          <Stack.Screen name="AccountInformationScreen" component={AccountInformationScreen} 
            options={{
              title: 'Account Information',
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: Colors.backgroundColor,
              },
              headerTintColor: Colors.text,
              headerTitleStyle: {
                fontWeight: 'bold',
              }  
            }}
          />

          <Stack.Screen name="FinalComments" component={FinalComments} options={{ 
              presentation: 'modal',  
              headerShown: false,
              cardStyle: { backgroundColor: "transparent" },
              cardOverlayEnabled: true
            }} />
              


        </Stack.Navigator>
        
      </NavigationContainer>

  )
}

export default ApplicationNavigator
