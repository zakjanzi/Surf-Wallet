import React, { useState, useLayoutEffect , useEffect} from 'react'
import { View, LayoutAnimation, Platform, StyleSheet, TouchableOpacity, UIManager, Text } from 'react-native'
import { useTheme } from '@/Hooks'
import { GeneralNotification , SmallContainerForKeys, GeneralButton, TextPassword } from '@/Components'
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next'

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

const AccountInformationScreen = ({navigation, route}) => {
  const { mnemonic , privateKey } = route.params;
  const { Colors } = useTheme()
  const { t } = useTranslation()
  
  const [seeds, setSeed] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [password, setPassword] = useState("#SamplePassword200#$");

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  //get seed from Navigator
  const copySeed = () => {
    Clipboard.setString(seeds);
  }

  useEffect(() => {
   setSeed( JSON.parse(mnemonic).phrase )
   
  }, []);

  const confirmAndFinish = () => {
   //Just navigate to the Next screen
    navigation.navigate("FinalComments")
  }

  const onBack = () => {
    navigation.goBack();
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
      <SafeAreaView style={ [ styles.fill ,  { padding: 15, backgroundColor: Colors.backgroundColor } ]}>   
        
        <View style={{ marginTop: 10 }}>
            <GeneralNotification header={t('onboarding_account_info_header')} body={t('onboarding_account_info_body')} />
        </View> 

        <View style={styles.accordion_header}> 
            <Text> { t('onboarding_account_show_info') } </Text>
            <TouchableOpacity
                onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                setExpanded(!expanded);
                }}
            > 
                <Icon name={ expanded === true ? "caret-up" : "caret-down" } size={20} color={Colors.text} />
            </TouchableOpacity>
        </View> 

        { expanded && (
            <View style={{ backgroundColor: Colors.langButton , borderRadius: 7, height: "25%", padding: 20 }}>
               <SmallContainerForKeys onCopy={copySeed} header={ t('onboarding_account_modal_header') } address={seeds} showCopyIcon={true} showBorderBottom={true} />
               
               <View style={{ flexDirection: 'row', justifyContent:'center', alignItems:'center' }}> 
                    <Text style={{ width: '20%', alignSelf:'flex-end', fontWeight:'600' }}> Password: </Text>
                    <View style={{ width: '80%' }}> 
                         <TextPassword  password={password} />
                    </View>
                  
               </View>

            </View>
        )}  

        <View  style={{ alignSelf: "center", width: "90%", position: "absolute", bottom: 10 }}>
            <View style={{ flexDirection:'row', paddingVertical:5 , marginBottom:20, width: '100%' }}>
                    <CheckBox
                            style={{ width: "10%"  }}
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                            tintColors={ { true: Colors.someText, false: Colors.skip }}
                            onCheckColor={ Colors.langButton }
                            onFillColor={ Colors.someText }
                        />
                    <Text style={{ width: "90%" , color: Colors.text }}> { t('onboarding_account_accept_responsibility') } </Text>
            </View>
            <GeneralButton onPress={confirmAndFinish} title={t('onboarding_confirm_and_finish')} />    
        </View>

      </SafeAreaView>     
  )

}

const styles = StyleSheet.create({
    fill:{
        flex: 1, 
        flexDirection: "column" , 
        
    },
    accordion_header:{
        width: 270,
        height:28,
        flexDirection: "row",
        padding:2,
        alignItems: "center",
        marginTop: "20%" ,
        justifyContent:"center"
    },

    inputContainer: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth:1,
        borderStyle:"solid",
        borderColor: "#CCCCCC",
    },
    inputField: {
        padding: 14,
        fontSize: 22,
        width: '90%'
    },
});

export default AccountInformationScreen
