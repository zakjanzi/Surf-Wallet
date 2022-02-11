import React, { useState , useLayoutEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useTheme } from '@/Hooks'
import { TextField, GeneralButton , TextPassword } from '@/Components'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next'
import Icon from 'react-native-vector-icons/Ionicons';

const CreateProfileScreen = ({ navigation }) => {
  const { Colors } = useTheme()
  const { t } = useTranslation()

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setConfirmPassword] = useState("");
  const [isFaded, setFaded] = useState(true);

  const createAccount = () => {
    // Verify the email and Password
    // Send data to Moralis and Register this User
    if(isFaded === false){

    }
  }

  const onBack = () => {
    navigation.goBack()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
      headerLeft: () => (
        <TouchableOpacity onPress={onBack} >
            <Icon name="chevron-back" size={30} color={Colors.text} />            
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (   
      <SafeAreaView style={ [ styles.fill ,  { paddingHorizontal: 15, backgroundColor: Colors.backgroundColor } ]}>   
        
        <View style={[ styles.space ]}>
            <TextField onChange={setEmailAddress} name={t('onboarding_textfield_email')} value={emailAddress}  />
        </View>       
        <View style={[ styles.space ]}> 
            <TextPassword onChange={setPassword} name={t('onboarding_textfield_password')} password={password} />
        </View>
        <View style={[ styles.space ]}> 
            <TextPassword onChange={setConfirmPassword} name={t('onboarding_textfield_confirmpassword')} cpassword={cpassword} />
        </View>

        <View style={{ flexDirection: 'row' , marginTop: 15, marginHorizontal: 10  }}> 
                          
            <Icon name="information-circle-sharp" size={30} color={Colors.someText} />
                         
            <Text style={{  color: Colors.text, fontSize: 18 }}> { t('onboarding_textfield_warning') } </Text>
        
        </View>    

        <View style={{ alignSelf: "center", width: "90%", position: "absolute", bottom: 10 }}>
            <GeneralButton onPress={createAccount} title={t('onboarding_continue')} faded={isFaded}  />    
        </View>
        
      </SafeAreaView>     
  )

}

const styles = StyleSheet.create({
    fill:{
        flex: 1, 
        flexDirection: "column" 
    },
    space:{
        marginVertical:10
    }
});

export default CreateProfileScreen
