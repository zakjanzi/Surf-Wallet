import React from 'react'
import { View } from 'react-native'
import { useTheme } from '@/Hooks'
import { PageNotFoundComponent } from '@/Components'
import { SafeAreaView } from 'react-native-safe-area-context';

const PageNotFound = () => {
  const { Layout, Gutters, Colors } = useTheme()

  const { t } = useTranslation()

  return (   
      <SafeAreaView style={{ paddingTop: 5, backgroundColor: Colors.backgroundColor }}>   
        <View style={[Layout.colCenter, Gutters.smallHPadding]}>
           <PageNotFoundComponent header={ t('onboarding_pagenotfound_header') } message={ t('onboarding_pagenotfound_message') } />
        </View>
      </SafeAreaView>     
  ) 
}


export default PageNotFound
