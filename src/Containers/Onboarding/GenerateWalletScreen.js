import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { 
  View, StyleSheet, Text, TouchableOpacity, useWindowDimensions, ScrollView, Alert
} from 'react-native'
import { useTheme } from '@/Hooks'
import useIsMounted from 'ismounted';
import { FingerButton , ProgressBar, SmallContainerForKeys, SmallContainerForDetails, GeneralButton } from '@/Components'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigate } from '@/Navigators/utils'

//Ethers js
import "react-native-get-random-values"
import "@ethersproject/shims"
import { ethers } from "ethers";


const GenerateWalletScreen = ({ navigation, route }) => {
 
  const { Layout, Colors } = useTheme()
  const SCREEN_WIDTH = useWindowDimensions().width;
  const SCREEN_HEIGHT = useWindowDimensions().height;
 
  const isMounted = useIsMounted();
  const [steps, setSteps] = useState(0); 
  const [waitingForAccount, setwaitingForAccount] = useState(false);
  const [account, setAccount] = useState({});
  const [progressBar, setProgressBar] = useState(0.1);
  const [progressBar2, setProgressBarTwo] = useState(0.1);
  const [progressBar3, setProgressBarThree] = useState(0.1);
  const [publicAddress, setPublicAddress] = useState("");
  const [privateAddress, setPrivateAddress] = useState("");
  const [isFaded, setFaded] = useState(true);
  const { t } = useTranslation()

  const isPortrait = () => {
    return SCREEN_HEIGHT >= SCREEN_WIDTH
  }
  
  function isLandscape() {    
    return SCREEN_WIDTH >= SCREEN_HEIGHT
  } 

  const CopiedPrivateKeyALert = () => {
    Alert.alert(
      "Success",
      "Copied Private Key!",
      [
        { text: "OK", onPress: () => "" }
      ]
    );
  }
  const wait = async (seconds) => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, seconds),
    )
  }

  const randomSeconds = (min, max) => {
    return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
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

  

  useEffect(() => {      
    
    if (isMounted.current) {
      const waitForStep = async (step) => {
          await wait( randomSeconds (2,5) );
          setProgressBar((prev) => {
          if (prev >= step) {
            setSteps(step+1);
            return 1;
          } else {
            return prev + 0.1;
          }
        });
      }

      const waitForStep2 = async (step) => {
          await wait( randomSeconds (2,5) );
          setProgressBarTwo((prev) => {
          if (prev >= step) {
            setSteps(step+1);
            return 1;
          } else {
            return prev + 0.1;
          }
        });
      }

    const waitForStep3 = async (step) => {
        await wait( randomSeconds (2,5) );
        setProgressBarThree((prev) => {
        if (prev >= step) {
          setSteps(step+1);
          return 1;
        } else {
          return prev + 0.1;
        }
      });
    }    

    if(account.mnemonic && steps === 0){
      setwaitingForAccount(false)
      setPublicAddress(account.address);
      setPrivateAddress(account.privateKey)

      setSteps(1);
    } 

      if (steps === 1){         
        waitForStep(steps)     
      }

      if (steps === 4){
        waitForStep2(steps)
      }

      if (steps === 7 ){
        waitForStep3(steps)
      }
      
      if(progressBar2 >= 1){
        setSteps(5)
        setProgressBarTwo(0.1)
      }

      if (progressBar3 >= 1){
        setFaded(false)      
      }


    }
      return () => {
         
      };
  }, [steps, progressBar, progressBar2, progressBar3, account]);


  const generateWallet = () => {
    //Generate a Wallet using Ethers.js
    setwaitingForAccount(true)
    setAccount((prev) => {              
      return ethers.Wallet.createRandom()
    })
  } 

  const onBack = () => {
         
         if (steps === 0){
          navigation.goBack()
         }
         else{
          setSteps((prev) => {
              
            return prev - 1
          })
         }                
  }

  const copyPrivateAddress = () => {
    //Copy seed hrase
    Clipboard.setString(privateAddress);
    CopiedPrivateKeyALert()
  }

  const simulatePrivateKeys = () => {
      //Simulate as if you making the Private key for the User
      setSteps(4);
  }

  const simulateSeedPhrases = () => {
      setSteps(7);
  }

  const goToSeedPhrase = () => {
     if(isFaded === false){
         //Go to Seed Phrase Screen here with seed phrase in Navigation
         navigation.navigate("SeedPhraseScreen",{ mnemonic: JSON.stringify(account.mnemonic), address: account.address, privateKey: account.privateKey })
     }
  }

  return (      
      <SafeAreaView style={[Layout.fill,  { backgroundColor: Colors.backgroundColor,  flexDirection:  "column" } ]}>
        { steps === 0 && (
            <View style={{ alignSelf: "center", width: "90%", position: isPortrait ? "absolute" : "relative", bottom: isPortrait ? "20%" : 100, padding:-10, justifyContent: "center", alignItems: "center" } }>               
                <FingerButton onPress={generateWallet} title={t('onboarding_create_address')} waiting={waitingForAccount} /> 
            </View>
        )} 

        { steps === 1 && (
         
                <View style={ [styles.progressContainer, { marginTop: 10, marginHorizontal:20, backgroundColor: Colors.langButton } ]}> 
                    <Text style={[ styles.progressText, { color: Colors.text, alignSelf: 'center', width: "30%"} ]}> Public Key: </Text> 
                    <ProgressBar progress={progressBar} width={ isPortrait() ? 250 : 550} />           
                </View>
         
        )}

        { steps === 2 && (
                    <>  
                    <View style={ [ styles.progressContainer, { marginTop:10, marginHorizontal:20, backgroundColor: Colors.langButton, height: isPortrait() ? "10%" : "20%"  } ] }> 
                        <SmallContainerForKeys header={"Public Key:"} address={publicAddress} showCopyIcon={false} />                                 
                    </View>
                    <View style={ { marginTop:24, marginHorizontal:20 }  }> 
                        <SmallContainerForDetails onInformation={()=>{}} text={t('onboarding_helper_info_public')} showInfoIcon={true} showTickIcon={true} onPress={() => { setSteps(3) } } />
                    </View>
                    </> 
        )}

        { steps === 3 && (
            <> 
               
                    <View style={ [ styles.progressContainer, { marginTop:10, marginHorizontal:20, backgroundColor: Colors.langButton, height: isPortrait() ? "10%" : "20%"  } ] }> 
                        <SmallContainerForKeys header={"Public Key:"} address={publicAddress} showCopyIcon={false} />                                 
                    </View> 
              
                    <View style={ [ styles.fillAColumn, { marginTop: isPortrait() ? "80%" : "15%"  } ] }> 
                        <FingerButton onPress={simulatePrivateKeys} title={ t('onboarding_create_address_two') } /> 
                    </View>                             
            </>
        )}

        { steps === 4 && (
            <>
                <View style={ [ styles.progressContainer, { marginTop:10, marginHorizontal:20, backgroundColor: Colors.langButton, height: isPortrait() ? "10%" : "20%"  } ] }> 
                    <SmallContainerForKeys header={"Public Key:"} address={publicAddress} showCopyIcon={false} />                                 
                </View>

                <View style={ [styles.progressContainer, { marginTop:10, marginHorizontal:20, backgroundColor: Colors.langButton } ]}> 
                    <Text style={[ styles.progressText,  { color: Colors.text, alignSelf: 'center', width: "30%"} ]}> Private Key: </Text>
                    <ProgressBar progress={progressBar2} width={ isPortrait() ? 250 : 550} />                             
                </View>
            </>
        )}

        { steps === 5 && (
            <>
              <ScrollView contentContainerStyle={{ paddingBottom: 40, justifyContent: "space-evenly" }}>
                    <View style={ [ styles.progressContainer, { marginTop:10, marginHorizontal:20, backgroundColor: Colors.langButton, height: isPortrait() ? "25%" : "20%" } ] }> 
                        <SmallContainerForKeys header={"Public Key:"} address={publicAddress} showCopyIcon={false} />                                 
                    </View>
              
                    <View style={ [ styles.progressContainer, { marginTop:10,marginHorizontal:20, backgroundColor: Colors.langButton, height: isPortrait() ? "25%" : "20%" } ] }> 
                        <SmallContainerForKeys onCopy={copyPrivateAddress} header={"Private Key:"} address={privateAddress} showCopyIcon={true} />                                 
                    </View>             
                    <View style={ { marginTop:24, marginHorizontal:20 }  }> 
                        <SmallContainerForDetails onInformation={()=>{}} text={t('onboarding_helper_info')} showInfoIcon={true} showTickIcon={true} onPress={() => { setSteps(6) }} />
                    </View>
              </ScrollView>
            </>
        )}

        { steps === 6 && (
            <>
               
                    <View style={ [ styles.progressContainer, { marginTop:10, marginHorizontal:20, backgroundColor: Colors.langButton, height: isPortrait() ? "10%" : "20%" } ] }> 
                        <SmallContainerForKeys header={"Public Key:"} address={publicAddress} showCopyIcon={false} />                                 
                    </View>
               
                    <View style={ [ styles.progressContainer, { marginTop:10,  marginHorizontal:20, backgroundColor: Colors.langButton, height: isPortrait() ? "10%" : "20%" } ] }> 
                        <SmallContainerForKeys onCopy={copyPrivateAddress} header={"Private Key:"} address={privateAddress} showCopyIcon={true} />                                 
                    </View>              

                    <View style={  [ styles.fillAColumn, { marginTop: isPortrait() ? "80%" : "15%"  } ]  }> 
                        <FingerButton onPress={simulateSeedPhrases} title={ t('onboarding_create_seed_phrase') }  /> 
                    </View>  
            </>
        )}

        { steps === 7 && (
            <View style={ [styles.publicKeyContainer , { flex: 1 } ]}>
                 
                    <View style={ [ styles.progressContainer, { marginTop:10,marginHorizontal:20, backgroundColor: Colors.langButton, height: isPortrait() ? "12%" : "20%" } ] }> 
                        <SmallContainerForKeys header={"Public Key:"} address={publicAddress} showCopyIcon={false} />                                 
                    </View>
               
                    <View style={ [ styles.progressContainer, { marginTop:10,marginHorizontal:20, backgroundColor: Colors.langButton, height: isPortrait() ? "12%" : "20%" } ] }> 
                        <SmallContainerForKeys onCopy={copyPrivateAddress} header={"Private Key:"} address={privateAddress} showCopyIcon={true} />                                 
                    </View>
               
                    <View style={{ width: "90%", height: '20%',marginTop: isPortrait() ? 62 : 20, marginHorizontal:20 }} >
                        <Text style={[ styles.mediumText, { color: Colors.bodyText} ]}> Seed Phrase :</Text>
                        <ProgressBar progress={progressBar3} width={ isPortrait() ? 340 : 700} /> 
                    </View>
                
                    <View style={{ alignSelf: "center", width: "90%", position: "absolute", bottom: 10 }}>
                       
                        <View style={{ flexDirection: 'row' , marginBottom: isPortrait() ? 15 : 5 }}> 
                            <TouchableOpacity >
                                <Icon name="information-circle-sharp" size={20} color={Colors.someText} />
                            </TouchableOpacity>

                            <Text style={{ justifyContent: "flex-end", width:"100%", color: Colors.text }}> { t('onboarding_what_is_a_seed') } </Text>
                        </View>
                                      
                        <GeneralButton onPress={goToSeedPhrase} title={ t('onboarding_continue') }  faded={isFaded} />
                    </View>                

            </View>
        )}

      </SafeAreaView>     
  ) 
}

const styles = StyleSheet.create({
    progressContainer: {       
      flexDirection: "row",
      padding: 5 ,      
      height: "12%",
      borderRadius: 20
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.8,
        shadowRadius: 4,
    },
    fillAColumn:{
        flexDirection: 'column',  height: "16%",  paddingTop: 10,
        alignItems:"center", justifyContent:"center",  marginHorizontal:20
    },
    publicKeyContainer: {
        flexDirection: "column",
        padding: 10,       
        width: "100%"             
    },
    progressText: {    
        fontWeight:"500",      
        fontFamily:"Inter-Regular",
        fontSize:14,
        lineHeight:28,
        width:150
    },
    mediumText: {       
        alignSelf:"flex-start",
        fontWeight:"600",      
        fontFamily:"Inter-Regular",
        fontSize:14,
        lineHeight:18,
        width:150
    },
})

export default GenerateWalletScreen
