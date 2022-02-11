import React from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { PageNotFoundComponent } from '@/Components'
import { SafeAreaView } from 'react-native-safe-area-context';

const PageNotFound = () => {
  const { Layout, Gutters, Colors } = useTheme()

  const { t } = useTranslation()

  return (   
      <SafeAreaView style={{ padding: 10, backgroundColor: Colors.backgroundColor }}>   
        <View style={[Layout.colCenter, Gutters.smallHPadding]}>
           <PageNotFoundComponent header={ t('onboarding_pagenotfound_header') } message={ t('onboarding_pagenotfound_message') } />
        </View>
      </SafeAreaView>     
  ) 
}


export default PageNotFound
