import React from 'react'
import { View } from 'react-native'
import { useTheme } from '@/Hooks'
import { GeneralNotification, ModalNotification } from '@/Components'
import { SafeAreaView } from 'react-native-safe-area-context';

const confirmAndFinish = () => {
     
}

const ModalConfirmation = () => {
  const { Layout, Gutters, Colors } = useTheme()

  const { t } = useTranslation()

  return (   
      <SafeAreaView style={{ paddingTop: 5, backgroundColor: Colors.backgroundColor }}>   
        <View style={[Layout.colCenter, Gutters.smallHPadding, { justifyContent: "space-around" }]}>
            
            <View>
                <GeneralNotification header={t('onboarding_account_modal_header')} body={t('onboarding_account_modal_body')} />
            </View>

            <View >
                <ModalNotification text={ t('onboarding_account_modal_yellow') } showIcon={true} />
            </View>

            <View style={{ paddingVertical:5 , alignSelf: 'flex-end' }}>
                <generalButton onPress={confirmAndFinish} title={t('onboarding_final_confirm')} />    
            </View>

        </View>
      </SafeAreaView>     
  ) 
}


export default ModalConfirmation
