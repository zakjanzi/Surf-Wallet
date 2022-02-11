import React, { useState } from 'react'
import { View,Dimensions,StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useTheme } from '@/Hooks'
import { useSelector } from 'react-redux'
import { GeneralButton } from '@/Components'
import NextButton from '@/Assets/Images/Nextone_Light.svg'
import OnBoardOneDark from '@/Assets/Images/onBoardone_dark.svg'
import OnBoardTwoDark from '@/Assets/Images/onBoardtwo_dark.svg'
import OnBoardThreeDark from '@/Assets/Images/onBoardthree_dark.svg'
import OnBoardOneLight from '@/Assets/Images/onBoardone.svg'
import OnBoardTwoLight from '@/Assets/Images/onBoardtwo.svg'
import OnBoardThreeLight from '@/Assets/Images/onBoardthree.svg'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next'
//import { navigate } from '@/Navigators/utils'

const IntroScreen = ({ navigation }) => {
  const { Layout, Colors } = useTheme()
  const [steps, setSteps] = useState(0);
  const isDarkTheme = useSelector(state => state.theme.darkMode )
  const { t } = useTranslation()

  const createWallet = () => {
      //navigate to GenerateWalletScreen
      navigation.navigate("GenerateWalletScreen")
  }

  const onSkip = () => {
    setSteps(2)
  }

  const onNext = () => {
    setSteps(steps + 1)
  }

  const onAlreadyHaveWallet = () => {
    //navigate to Login Screen
    navigation.navigate("CreateProfileScreen",{})
  }

  return (   
      <SafeAreaView style={[Layout.fill, { flexDirection: "column-reverse"} ]}>   
          
          { (steps === 0 || steps === 1) && ( 
          <View style={ styles.fillRow }> 
                <View style={ styles.startView }>                    
                        <TouchableOpacity  onPress={onSkip} >
                            <Text style={ [styles.smallFont, { color: Colors.skip }] }>{ "Skip" }</Text>
                        </TouchableOpacity>
                </View> 
                <View style={ styles.endView }>  
                        <TouchableOpacity  onPress={onNext} >                  
                            <NextButton/>
                        </TouchableOpacity>
                </View>  
          </View> )}

          { (steps === 2) && ( 
          <View style={styles.fillAColumn}>  
                <GeneralButton onPress={createWallet} title={ t('onboarding_create_wallet') } />
                <TouchableOpacity  onPress={onAlreadyHaveWallet} style={{ alignSelf: "center" }} >  
                    <Text style={ [styles.mediumFont, { color: Colors.skip }] }>{ t('onboarding_create_wallet_already_have') }</Text>
                </TouchableOpacity>    
          </View> )}

          <View style={styles.slide}>
                { (steps === 0 && isDarkTheme === true) && ( 
                        <OnBoardOneDark/>
                )}
                { (steps === 1 && isDarkTheme === true) && ( 
                        <OnBoardTwoDark/>
                )}
                { (steps === 2 && isDarkTheme === true) && ( 
                        <OnBoardThreeDark/>
                )}

                {(steps === 0 && !isDarkTheme) && ( 
                        <OnBoardOneLight/>
                )}
                {(steps === 1 && !isDarkTheme) && ( 
                        <OnBoardTwoLight/>
                )}
                {(steps === 2 && !isDarkTheme) && ( 
                        <OnBoardThreeLight/>
                )}
          </View>

           
      </SafeAreaView>     
  ) 
}

const styles = StyleSheet.create({
    fill:{
        flex: 1, flexDirection: "column" 
    },
    fillRow:{
         flexDirection: 'row',  height: "10%", marginVertical: 10, marginHorizontal:20,  justifyContent: "space-between",
    },
    fillAColumn:{
        flexDirection: 'column',  height: "16%", marginVertical: 15, paddingTop: 10,
        alignItems:"stretch", justifyContent:"space-between",  marginHorizontal:20
    },
    slide:{
       justifyContent: "center", alignItems:"center", marginBottom: 66
    },
    startView:{
        width: 50, marginLeft: 30, justifyContent: 'center'
    },
    endView:{
         width: 50,  marginRight: 30, justifyContent: 'center'
      },
    smallFont:{
        fontSize: 12, lineHeight:16
    },
    mediumFont:{
        fontSize: 16, lineHeight:20
    }
  })


  //borderWidth: 1, borderColor: "#ffffff", borderStyle: "dashed",
  /***
   * 
   *   <Onboarding
                pages={[
                    {
                        backgroundColor: Colors.someText ,
                        image: <></>,
                        title: t('onboarding_textheader'),
                        subtitle: t('onboarding_textbody') ,
                        nextLabel: <FloatButton/>
                    },
                    {
                        backgroundColor: Colors.someText ,
                        image: <></>,
                        title: t('onboarding_textheader_two'),
                        subtitle: t('onboarding_textbody_two'),
                        nextLabel: <FloatButton/>
                    },
                    {
                        backgroundColor: Colors.someText ,
                        image:  <></>,
                        title: t('onboarding_textheader_three'),
                        subtitle: t('onboarding_textheader_three'),
                        onDone:{onDoneFunc}
                    }
                ]}
            />
   */
export default IntroScreen
