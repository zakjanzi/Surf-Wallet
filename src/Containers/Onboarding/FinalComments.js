import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ModalNotification, GeneralNotification, GeneralButton } from '@/Components'
import { useTheme } from '@/Hooks'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next'

const FinalComments = ({navigation, route}) => {
  const { Colors } = useTheme()
  const { t } = useTranslation()

  const OnConclude = () => {
    navigation.navigate("IntroScreen")
  }

  return (   
      <SafeAreaView style={ [ styles.fill , { padding: 10, backgroundColor: Colors.backgroundColor } ]}>   
           
            <View style={{ marginTop: 10 }}>
                <GeneralNotification header={t('onboarding_account_modal_header')} body={t('onboarding_account_modal_body')} />
            </View> 
         
           

            <View style={{ alignSelf: "center", width: "90%", justifyContent:"space-around", position: "absolute", bottom: 10 }}>  
                <ModalNotification text={t('onboarding_account_modal_yellow')} showIcon={true} /> 

                <GeneralButton onPress={OnConclude} title={t('onboarding_final_confirm')} />    
            </View>

      </SafeAreaView>     
  ) 
}

const styles = StyleSheet.create({
    fill:{
        flex: 1, 
        flexDirection: "column"         
    }
});

export default FinalComments
 