import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, Image } from 'react-native'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'

//  header & message = onboarding_pagenotfound_header | onboarding_pagenotfound_message
const PageNotFoundComponent = ({ header, message }) => {
  const { Colors, Images } = useTheme()
  const { t } = useTranslation() 

  return (
      <View style={  [styles.container, { backgroundColor : Colors.backgroundColor }] }>
        
            <View style={{flex:1}} >     
                <Image style={ styles.image }  source={Images.notFound} />
            </View>

            <View>     
                <Text style={[styles.text, { color: Colors.text }]}>{t(header)}</Text>
            </View>

            <View style={ [styles.innertextView] }>     
                <Text style={[styles.innertext]}>{t(message)}</Text>
            </View>

      </View>   
  )
} 

PageNotFoundComponent.propTypes = {
    header: PropTypes.string,
    message: PropTypes.string,
}
  
PageNotFoundComponent.defaultProps = {
    header: "",
    message: ""
}

const styles = StyleSheet.create({
    container: {  
      flexDirection: "column",
      alignItems: 'center',
      padding:10,
      flex:1,     
    },
    image:{
        marginBottom: 57,
        alignSelf:"center",
        borderRadius: 5,     
    },
    text:{   
        fontFamily:"Inter-Regular",
        fontWeight:"bold",
        fontSize:19,
        lineHeight:29,
        textTransform:"capitalize"
    },
    innertextView:{
        width:279,
        height:52,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:48
    },
    innertext:{
        fontFamily:"Inter-Regular",
        fontWeight:"700",
        fontSize:18,
        lineHeight:28,
        textTransform:"capitalize",
        color: "#292929"
    }
});
/**  paddingTop:"103px",  */
export default PageNotFoundComponent