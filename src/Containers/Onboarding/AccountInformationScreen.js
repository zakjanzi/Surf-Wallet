import React, { useState } from 'react'
import { View, LayoutAnimation, Platform, StyleSheet, TouchableOpacity, UIManager } from 'react-native'
import { useTheme, useTogglePasswordVisibility } from '@/Hooks'
import { GeneralNotification , SmallContainerForKeys} from '@/Components'
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

const AccountInformationScreen = () => {
  const { Colors } = useTheme()
  const { t } = useTranslation()
  
  const [seeds, setSeed] = useState("");
  const [password, setPassword] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [pastedSeed, setPastedSeed] = useState(""); //  get this from Navigation
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const { passwordVisibility, handlePasswordVisibility } = useTogglePasswordVisibility();


  //get seed from Navigator
  const copySeed = () => {
    Clipboard.setString(seeds);
  }

  const confirmAndFinish = () => {
   //Just navigate to the Next screen
  }

  return (   
      <SafeAreaView style={ [ styles.fill ,  { padding: 10, backgroundColor: Colors.backgroundColor } ]}>   
        
        <View>
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
                <Icon name={ expanded === true ? "caret-up" : "caret-down" } size={27} color={Colors.text} />
            </TouchableOpacity>
        </View> 

        { expanded && (
            <View style={{ marginTop: 10 }}>
               <SmallContainerForKeys onCopy={copySeed} header={ t('onboarding_account_modal_header') } address={seeds} showCopyIcon={true} showBorderBottom={true} />
               <View style={styles.inputContainer}>
                    <TextInput
                    style={styles.inputField}
                    name="password"
                    textContentType="newPassword"
                    secureTextEntry={passwordVisibility}
                    value={password}
                    enablesReturnKeyAutomatically
                    editable={false}
                    />
                        <Pressable onPress={handlePasswordVisibility}>
                            <Icon name={'eye'} size={23} color={Colors.normalButton} />   
                        </Pressable>
                </View>
            </View>
        )}    

        <View style={{ paddingVertical:5 , alignSelf: 'flex-end', width: '100%' }}>
            <View style={{ flexDirection:'row', flex: 1 }}> 
                <CheckBox
                        style={{ flex: 1}}
                        disabled={false}
                        value={toggleCheckBox}
                        tintColors={ { true: Colors.someText, false: Colors.skip }}
                        onCheckColor={ Colors.langButton }
                        onFillColor={ Colors.someText }
                    />
                <Text style={{ flex: 5 }}> { t('onboarding_account_accept_responsibility') } </Text>    
            </View>
        </View>
      
        <View style={{ paddingVertical:5, alignSelf: 'flex-end' }}>
            <generalButton onPress={confirmAndFinish} title={t('onboarding_confirm_and_finish')} />    
        </View>

      </SafeAreaView>     
  )

}

const styles = StyleSheet.create({
    fill:{
        flex: 1, 
        flexDirection: "column" , 
        justifyContent: "space-around"
    },

    accordion_header:{
        width: 270,
        height:28,
        flexDirection: "row",
        padding:2,
        alignItems: "center",
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
