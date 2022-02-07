import React, { useState, useEffect } from 'react'
import {
  View, StyleSheet
} from 'react-native'
import { useTheme } from '@/Hooks'
import { FingerButton , ProgressBar, SmallContainerForKeys, SmallContainerForDetails, GeneralButton } from '@/Components'
import { SafeAreaView } from 'react-native-safe-area-context';

const GenerateWalletScreen = () => {
  const { Layout, Gutters, Colors } = useTheme()
  // const dispatch = useDispatch()
  const [steps, setSteps] = useState(0);
  const [progressBar, setProgressBar] = useState(0.1);
  const [progressBar2, setProgressBarTwo] = useState(0.1);
  const [progressBar3, setProgressBarThree] = useState(0.1);
  const [publicAddress, setPublicAddress] = useState("");
  const [privateAddress, setPrivateAddress] = useState("");
  const [seedPhrase, setSeedPhrase] = useState("");
  const [isFaded, setFaded] = useState(true);
  const { t } = useTranslation()

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

  useEffect(() => {
      
      if (steps === 1){
        for (var i= 0.1; i <= 1; i ++ ){
            wait( randomSeconds(1, 4) )
            setProgressBar(i)
        }
      }

      if (steps === 4){
        for (var i= 0.1; i <= 1; i ++ ){
            wait( randomSeconds(1, 4) )
            setProgressBarTwo(i)
        }
      }

      if (steps === 7){
        for (var i= 0.1; i <= 1; i ++ ){
            wait( randomSeconds(1, 4) )
            setProgressBarThree(i)
        }
      }

      if (steps === 5){
        wait( randomSeconds(3, 6) );
        setSteps(6);
      }
      
      if (progressBar === 1){
        setSteps(2);
      }

      if (progressBar2 === 1){
        setSteps(5);
      }

      if (progressBar3 === 1){
        setFaded(false)
      }

  }, [steps, progressBar, progressBar2, progressBar3]);

  const generateWallet = () => {
    //Generate a Wallet using Ethers.js
    //Save the Public address
    //Save the Private address
    //Get the Seed phrase and save for Navigation
    setSteps(1);
  }

  const copySeedPhrase = () => {
    //Copy seed hrase
   
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
     }
  }

  return (      
      <SafeAreaView style={[Layout.colCenter, Gutters.smallHPadding, { backgroundColor: Colors.backgroundColor } ]}>
        { steps === 0 && (
            <View style={ { marginTop: -40 } }> 
                <FingerButton onPress={generateWallet} /> 
            </View>
        )} 

        { steps === 1 && (
            <View style={ [styles.progressContainer, { marginTop: -100, backgroundColor: Colors.langButton } ]}> 
                <Text style={[ styles.progressText, { color: Colors.skip} ]}> Public Key: </Text>
                <ProgressBar progress={progressBar} />                             
            </View>
        )}

        { steps === 2 && (
            <View style={styles.publicKeyContainer}>
                <View style={ [ styles.progressContainer, { marginTop:-100, backgroundColor: Colors.langButton } ] }> 
                    <SmallContainerForKeys header={"Public Key"} address={publicAddress} showCopyIcon={false} />                                 
                </View>
                <SmallContainerForDetails onInformation={true} text={t('onboarding_helper_info_public')} showInfoIcon={true} showTickIcon={true} />
            </View>
        )}

        { steps === 3 && (
            <View style={ [styles.publicKeyContainer, {flex : 1} ]}> 
                 <View style={ [ styles.progressContainer, { marginTop:-100, backgroundColor: Colors.langButton } ] }> 
                    <SmallContainerForKeys header={"Public Key"} address={publicAddress} showCopyIcon={false} />                                 
                </View> 
                <View style={ { marginTop:"30%" } }> 
                    <FingerButton onPress={simulatePrivateKeys} /> 
                </View>                             
            </View>
        )}

        { steps === 4 && (
            <View style={ [styles.progressContainer, { marginTop:-100, backgroundColor: Colors.langButton } ]}> 
                <Text style={[ styles.progressText, { color: Colors.skip} ]}> Private Key: </Text>
                <ProgressBar progress={progressBar2} />                             
            </View>
        )}

        { steps === 5 && (
            <View style={styles.publicKeyContainer}>
                <View style={ [ styles.progressContainer, { marginTop:-100, backgroundColor: Colors.langButton } ] }> 
                    <SmallContainerForKeys header={"Public Key"} address={publicAddress} showCopyIcon={false} />                                 
                </View>
                <View style={ [ styles.progressContainer, { marginTop:-40, backgroundColor: Colors.langButton } ] }> 
                    <SmallContainerForKeys onCopy={copySeedPhrase} header={"Private Key"} address={privateAddress} showCopyIcon={true} />                                 
                </View>

                <SmallContainerForDetails onInformation={true} text={t('onboarding_helper_info')} showInfoIcon={true} showTickIcon={true} />
            </View>
        )}

        { steps === 6 && (
            <View style={styles.publicKeyContainer}>
                <View style={ [ styles.progressContainer, { marginTop:-100, backgroundColor: Colors.langButton } ] }> 
                    <SmallContainerForKeys header={"Public Key"} address={publicAddress} showCopyIcon={false} />                                 
                </View>
                <View style={ [ styles.progressContainer, { marginTop:-40, backgroundColor: Colors.langButton } ] }> 
                    <SmallContainerForKeys onCopy={copySeedPhrase} header={"Private Key"} address={privateAddress} showCopyIcon={true} />                                 
                </View>

                <View style={ { marginTop:"30%" } }> 
                    <FingerButton onPress={simulateSeedPhrases} /> 
                </View>  
            </View>
        )}

        { steps === 7 && (
            <View style={ [styles.publicKeyContainer , { flex: 1 } ]}>
                <View style={ [ styles.progressContainer, { marginTop:-100, backgroundColor: Colors.langButton } ] }> 
                    <SmallContainerForKeys header={"Public Key"} address={publicAddress} showCopyIcon={false} />                                 
                </View>
                <View style={ [ styles.progressContainer, { marginTop:-40, backgroundColor: Colors.langButton } ] }> 
                    <SmallContainerForKeys onCopy={copySeedPhrase} header={"Private Key"} address={privateAddress} showCopyIcon={true} />                                 
                </View>

                <Text style={[ styles.mediumText, { color: Colors.bodyText} ]}> Seed Phrase </Text>
                <ProgressBar progress={progressBar3} /> 
                
                <View style={{ alignSelf: "center", justifyContent: "flex-end" }}>
                    <Text> { t('onboarding_what_is_a_seed') } </Text>              
                    <GeneralButton onPress={goToSeedPhrase} title={ t('onboarding_continue') }  faded={isFaded} />
                </View>
            </View>
        )}

      </SafeAreaView>     
  )
}

const styles = StyleSheet.create({
    progressContainer: {
      flex: 1,
      flexDirection: "row",
      padding: 20 ,
      backgroundColor: "#ffffff",
      width: "100%",
      height: 153,
      borderRadius: 10,
      shadowColor: "rgba(0, 0, 0, 0.05)",
      shadowOffset: {
        width: 5,
        height: 2
      }
    },
    publicKeyContainer: {
        flexDirection: "column",
        padding: 10,
        backgroundColor: "#ffffff",
        width: "100%",
        justifyContent: "space-around"      
    },
    progressText: {       
        alignSelf:"flex-start",
        fontWeight:400,      
        fontFamily:"Inter-Regular",
        fontSize:14,
        lineHeight:16,
        width:70
    },
    mediumText: {       
        alignSelf:"flex-start",
        fontWeight:600,      
        fontFamily:"Inter-Regular",
        fontSize:14,
        lineHeight:18,
        width:92
    },
})

export default GenerateWalletScreen
