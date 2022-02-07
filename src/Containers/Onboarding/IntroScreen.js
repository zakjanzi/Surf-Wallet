import React, { useRef } from 'react'
import { View,TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useTheme } from '@/Hooks'
import { TextScreen, FloatButton, GeneralButton  } from '@/Components'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { SafeAreaView } from 'react-native-safe-area-context';

const IntroScreen = () => {
  const { Layout, Gutters, Colors } = useTheme()
  const flatlistRef = useRef(null);
  const { t } = useTranslation()

  const createWallet = () => {
     
  }
  const nextScreen = () => {
     
  }

  return (   
      <SafeAreaView style={{ paddingTop: "5px", backgroundColor: Colors.backgroundColor }}>   
        
        <View style={[Layout.colCenter, Gutters.smallHPadding]}>
            <View style={{marginTop:"10%" }}>            
                <SwiperFlatList ref={flatlistRef} autoplayDelay={20} showPagination paginationDefaultColor={Colors.normalButton}>
                   
                    <View style={{ justifyContent: "space-around"}}>
                        <TextScreen title_header={t('onboarding_textheader')}  title_body={t('onboarding_textbody')} />
                        <View style={ styles.fill }>
                            <View style={ styles.startView }>
                                <TouchableOpacity onPress={setSkip} >
                                    <Text style={ [styles.smallFont, { color: Colors.skip }] }>{ "Skip" }</Text>
                                </TouchableOpacity>   
                            </View>

                            <View style={ styles.endView }>
                                <FloatButton onPress={nextScreen}/>    
                            </View>            
                        </View>
                    </View>

                    <View style={{ justifyContent: "space-around"}}>
                        <TextScreen title_header={t('onboarding_textheader_two')} title_body={t('onboarding_textbody_two')}  />
                        <View style={  styles.fill  }>
                            <View style={styles.startView}>
                                <TouchableOpacity onPress={setSkip} >
                                    <Text style={  [styles.smallFont, { color: Colors.skip }] }>{ "Skip" }</Text>
                                </TouchableOpacity>   
                            </View>

                            <View style={ styles.endView }>
                                <FloatButton onPress={nextScreen}/>    
                            </View>            
                        </View>
                    </View>

                    <View style={{ justifyContent: "space-around"}}>
                        <TextScreen title_header={t('onboarding_textheader_three')} title_body={t('onboarding_textbody_three')} />
                        <View style={{ paddingVertical:"5px" , flex: 1 }}>
                             <GeneralButton onPress={createWallet} title={t('onboarding_create_wallet')} />    
                        </View>
                        <View style={{ paddingVertical:5, flex: 1 }}>
                            <Text style={{ fontWeight: 600, fontSize: 14, lineHeight: 20, color: Colors.skip  }}> </Text>
                        </View>                        
                    </View>

                </SwiperFlatList>
            </View>
        </View>     

      </SafeAreaView>     
  ) 
}

const styles = StyleSheet.create({
    fill:{
        flex: 1, flexDirection: "row" 
    },
    startView:{
        justifyContent: "flex-start", marginHorizontal: 5
    },
    endView:{
        justifyContent: "flex-end", marginHorizontal: 5
    },
    smallFont:{
       fontSize: 12, lineHeight:16
    }
  })

export default IntroScreen
