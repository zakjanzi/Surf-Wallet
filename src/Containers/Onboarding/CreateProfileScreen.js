import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'
import { TextField, GeneralButton , TextPassword } from '@/Components'
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateProfileScreen = () => {
  const { Colors } = useTheme()
  const { t } = useTranslation()

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setConfirmPassword] = useState("");

  const createAccount = () => {
    // Verify the email and Password
    // Send data to Moralis and Register this User
  }

  return (   
      <SafeAreaView style={ [ styles.fill ,  { padding:5, backgroundColor: Colors.backgroundColor } ]}>   
        <View>
            <TextField onChange={(text) => setEmailAddress(text)} name={t('onboarding_textfield_email')} value={emailAddress}  />
        </View>       
        <View> 
            <TextPassword onChange={(text) => setPassword(text)} name={t('onboarding_textfield_password')} password={password} />
        </View>
        <View> 
            <TextPassword onChange={(text) => setConfirmPassword(text)} name={t('onboarding_textfield_confirmpassword')} cpassword={cpassword} />
        </View>
        <View style={{ paddingVertical:5 , flex: 1, justifyContent: 'flex-end', alignSelf: 'center' }}>
            <GeneralButton onPress={createAccount} title={t('onboarding_continue')} />    
        </View>
      </SafeAreaView>     
  )

}

const styles = StyleSheet.create({
    fill:{
        flex: 1, 
        flexDirection: "column" , 
        justifyContent: "space-around"
    }
});

export default CreateProfileScreen
