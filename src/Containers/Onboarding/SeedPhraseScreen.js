import React, { useState, useEffect, useRef } from 'react'
import {
  View, StyleSheet
} from 'react-native'
import { useTheme } from '@/Hooks'
import { SeedPhraseBlock, GeneralButton, CopyButton , TextArea } from '@/Components'
import Clipboard from '@react-native-clipboard/clipboard';
import RNAnimated from "react-native-animated-component";
import { SafeAreaView } from 'react-native-safe-area-context';

const SeedPhraseScreen = () => {
  const { Layout, Gutters, Colors } = useTheme()
  // const dispatch = useDispatch()
  const [steps, setSteps] = useState(0);
  const [publicAddress, setPublicAddress] = useState("");
  const [privateAddress, setPrivateAddress] = useState("");
  const [pastedSeed, setPastedSeed] = useState("");
  const [isFaded, setFaded] = useState(true);
  const { t } = useTranslation()
  const copyButtonRef = useRef();
  const seeds = "cat baby hat gory babie dog marry let church sample state play";


  useEffect(() => {
      
      if (steps === 1){
      
      }
    

  }, [steps]);

  const copySeedPhrase = () => {
    Clipboard.setString(seeds);
    copyButtonRef.current.setNativeProps({ title: "Copied!" });
    setFaded(false);
  };

  const copyPrivateAddress = () => {
    Clipboard.setString(privateAddress);
  }

  const getPastedSeed = async () => {
   setPastedSeed( await Clipboard.getString() )
  }

  const goToNextPage = () => {
      if (isFaded === false){
          setSteps(1)
      }
  }


  return (      
      <SafeAreaView style={[Layout.colCenter, Gutters.smallHPadding, { backgroundColor: Colors.backgroundColor } ]}>
       { steps === 0 && ( 
         <>           
            <RNAnimated
                    appearFrom="left"
                    animationDuration={800}
                    style={{ alignItems: "center" }}
            >       
    
                <View style={styles.publicKeyContainer}>
                        <View style={ [ styles.progressContainer, { marginTop:"-100px", backgroundColor: Colors.langButton } ] }> 
                            <smallContainerForKeys header={"Public Key"} address={publicAddress} showCopyIcon={false} />                                 
                        </View>
                        <View style={ [ styles.progressContainer, { marginTop:"-40px", backgroundColor: Colors.langButton } ] }> 
                            <smallContainerForKeys onCopy={copyPrivateAddress} header={"Private Key"} address={privateAddress} showCopyIcon={true} />                                 
                        </View>               
                </View>

                <View style={{ flexDirection: 'column', justifyContent: "space-around" }}> 
                    
                    <Text style={ styles.mediumText }> { t('onboarding_seed_phrase') } </Text>

                    <View style={{ flexDirection: 'row', flex: 1, alignItems: "center" , flexBasis: 100 }} >
                        {   seeds.split(" ").map( (seed) => {
                                return ( <SeedPhraseBlock text={seed} />);
                            }) 
                        }                 
                    </View>

                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: "center" }} >
                        <CopyButton ref={copyButtonRef} onPress={copySeedPhrase} title={ t('copy') } />
                    </View>

                    <View style={{ alignSelf: "center", justifyContent: "flex-end" }}>
                            <Text> { t('onboarding_what_is_a_seed') } </Text>              
                            <GeneralButton onPress={goToNextPage} title={ t('onboarding_continue') }  faded={isFaded} />
                    </View>

                </View>

            </RNAnimated>
        </>
       )}

        { steps === 1 && ( 
            <> 
                <View style={{ flexDirection: 'column', justifyContent: "space-around" }}> 
                    <TextArea onPress={ getPastedSeed } pastedText={ pastedSeed } />
                </View>
            </>
        )}

      </SafeAreaView>     
  )
}

const styles = StyleSheet.create({
    progressContainer: {
      flex: 1,
      flexDirection: "row",
      padding: 20,
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

export default SeedPhraseScreen
