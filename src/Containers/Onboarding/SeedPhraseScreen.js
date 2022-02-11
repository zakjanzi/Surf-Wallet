import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import {  View, StyleSheet, useWindowDimensions, Text, TouchableOpacity, Alert } from 'react-native'
import { useTheme } from '@/Hooks'
import useIsMounted from 'ismounted';
import { SeedPhraseBlock, GeneralButton, CopyButton , TextArea, SmallContainerForKeys } from '@/Components'
import { useTranslation } from 'react-i18next'
import Clipboard from '@react-native-clipboard/clipboard';
import RNAnimated from "react-native-animated-component";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigate } from '@/Navigators/utils'

const SeedPhraseScreen = ({ navigation, route }) => { 
  const { mnemonic , privateKey, address } = route.params;
  const { Layout, Colors } = useTheme()
  const SCREEN_WIDTH = useWindowDimensions().width;
  const SCREEN_HEIGHT = useWindowDimensions().height;

  const isMounted = useIsMounted();
  const [steps, setSteps] = useState(0);
  const [publicAddress, setPublicAddress] = useState("");
  const [privateAddress, setPrivateAddress] = useState("");
  const [pastedSeed, setPastedSeed] = useState("");
  const [isFaded, setFaded] = useState(true);
  const { t } = useTranslation()

  const seeds = JSON.parse(mnemonic).phrase;
  const seed = seeds.split(" ");

  const isPortrait = () => {
    return SCREEN_HEIGHT >= SCREEN_WIDTH
  }
  
  function isLandscape() {    
    return SCREEN_WIDTH >= SCREEN_HEIGHT
  }

  const CopiedSeedsAlert = () => {
    Alert.alert(
      "Success",
      "Copied Seed Phrase!",
      [
        { text: "OK", onPress: () => "" }
      ]
    );
  }

  const CopiedPrivateKeyAlert = () => {
    Alert.alert(
      "Success",
      "Copied Private Key!",
      [
        { text: "OK", onPress: () => "" }
      ]
    );
  }  

  useEffect(() => {
   if( isMounted.current ) {
      if (steps === 0){
        setPublicAddress(address);
        setPrivateAddress(privateKey)
      }
   } 
  }, [steps]);

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

  const copySeedPhrase = () => {
    Clipboard.setString(seeds);
   // copyButtonRef.current.setNativeProps({ title: "Copied!" });
    CopiedSeedsAlert();
    setFaded(false);
  };

  const copyPrivateAddress = () => {
    Clipboard.setString(privateAddress);
    CopiedPrivateKeyAlert();
  }

  const getPastedSeed = async () => { 
   setPastedSeed( await Clipboard.getString() )
  }

   const onBack = () => {
        if (steps != 0){
            setSteps((prev) => {
              
                return prev - 1
            })
        }
        if (steps == 0){
            navigation.goBack()
        }
   }


  const goToNextPage = () => {
      if (isFaded === false){
        navigation.navigate("AccountInformationScreen",{ mnemonic: mnemonic, privateKey: privateKey });
      }
  }


  return (      
      <SafeAreaView style={[Layout.fill, { backgroundColor: Colors.backgroundColor } ]}>
       { steps === 0 && ( 
         <>           
            <RNAnimated
                    appearFrom="left"
                    animationDuration={800}
                    style={{ alignItems: "center" }}
            >       
    
                <View style={[ styles.publicKeyContainer, { flex: 1 } ]}>
                    
                    <View style={ [ styles.progressContainer, { marginTop:10,marginHorizontal:20, backgroundColor: Colors.langButton, height: isPortrait() ? "12%" : "20%" } ] }> 
                        <SmallContainerForKeys header={"Public Key:"} address={publicAddress} showCopyIcon={false} />                                 
                    </View>
               
                    <View style={ [ styles.progressContainer, { marginTop:10,marginHorizontal:20, backgroundColor: Colors.langButton, height: isPortrait() ? "12%" : "20%" } ] }> 
                        <SmallContainerForKeys onCopy={copyPrivateAddress} header={"Private Key:"} address={privateAddress} showCopyIcon={true} />                                 
                    </View>

                    <View style={{ width: 350, height: '60%',marginTop: isPortrait() ? 62 : 20, marginHorizontal:20 }} >
                        <Text style={[ styles.mediumText, { color: Colors.bodyText} ]}> Seed Phrase :</Text>
                        <View style={{ flexDirection: 'column', justifyContent:"space-evenly",  maxWidth:340, 
                         }} >
                    
                            <View style={{ flexDirection: 'row', width:'100%', justifyContent:"space-around", padding: 10}}> 
                                <SeedPhraseBlock text={seed[0]} /> 
                                <SeedPhraseBlock text={seed[1]} />
                                <SeedPhraseBlock text={seed[2]} />
                                <SeedPhraseBlock text={seed[3]} /> 
                            </View>

                            <View style={{ flexDirection: 'row', width:'100%', justifyContent:"space-around", padding: 10}}> 
                                <SeedPhraseBlock text={seed[4]} /> 
                                <SeedPhraseBlock text={seed[5]} />
                                <SeedPhraseBlock text={seed[6]} />
                                <SeedPhraseBlock text={seed[7]} /> 
                            </View>

                            <View style={{ flexDirection: 'row', width:'100%', justifyContent:"space-around", padding: 10}}> 
                                <SeedPhraseBlock text={seed[8]} /> 
                                <SeedPhraseBlock text={seed[9]} />
                                <SeedPhraseBlock text={seed[10]} />
                                <SeedPhraseBlock text={seed[11]} /> 
                            </View>                        

                        </View>

                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: "center" }} >
                            <CopyButton  onPress={copySeedPhrase} title={ t('copy') } />
                        </View>

                    </View>

                    <View style={{ alignSelf: "center", width: "90%", position: "absolute", bottom: 10 }}>                       
                        <View style={{ flexDirection: 'row' , marginBottom: isPortrait() ? 15 : 5 }}> 
                            <TouchableOpacity >
                                <Icon name="information-circle-sharp" size={20} color={Colors.someText} />
                            </TouchableOpacity>

                            <Text style={{ justifyContent: "flex-end", width:"100%", color: Colors.text }}> { t('onboarding_what_is_a_seed') } </Text>
                        </View>                                      
                        <GeneralButton onPress={() => { setSteps(1) }} title={ t('onboarding_continue') }  faded={isFaded} />
                    </View> 

                </View>

            </RNAnimated>
        </>
       )}

        { steps === 1 && ( 
            <> 
                <View style={{ flexDirection: 'column', flex:1,  marginTop: 10, marginHorizontal: 20, backgroundColor: Colors.backgroundColor }}> 
                    <TextArea onPress={ getPastedSeed } pastedText={ pastedSeed } />
                    
                    <View style={{ alignSelf: "center", width: "90%", position: "absolute", bottom: 10 }}>
                        <GeneralButton onPress={goToNextPage} title={ t('onboarding_continue') }  faded={isFaded} />
                    </View>                   
                </View>
            </>
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
    publicKeyContainer: {
        flexDirection: "column",
        padding: 10,
        width: "100%"
    },
    progressText: {       
        alignSelf:"flex-start",
        fontWeight:"400",      
        fontFamily:"Inter-Regular",
        fontSize:14,
        lineHeight:16,
        width:150
    },
    mediumText: {       
        alignSelf:"flex-start",
        fontWeight:"600",      
        fontFamily:"Inter-Regular",
        fontSize:14,
        lineHeight:18,
        
    },
})

export default SeedPhraseScreen
