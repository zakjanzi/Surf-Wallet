import {t} from 'i18next';
import React, {useState} from 'react';
import {
  Image,
  TextInput,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import PortListItem from '../../components/PortListItem';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import styles from './styles';

export default function ConfirmAmount({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const balance = '1170';
  const amount = '35.00';
  const username = 'Joe';

  return (
    <>
      <CHeader
        title={t('confirm')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <CText
            value={`${t('balance')}: $${balance}`}
            semiBold
            style={{
              fontSize: 16,
              color: BaseColor.text1,
              textAlign: 'center',
            }}
          />
          <CText
            value={`${t('receiverUsername')}`}
            medium
            style={{
              fontSize: 14,
              color: BaseColor.text2,
              textAlign: 'center',
              marginTop: 16,
            }}
          />
          <CText
            value={`@${username}`}
            medium
            style={{
              fontSize: 14,
              color: BaseColor.text1,
              textAlign: 'center',
              marginTop: 4,
            }}
          />

          <CText
            value={`$${amount}`}
            semiBold
            style={{
              fontSize: 48,
              color: BaseColor.inputBottomLine,
              textAlign: 'center',
              marginTop: 16,
            }}
          />
          <View
            style={{
              paddingHorizontal: '10%',
              marginTop: 16,
            }}>
            <View
              style={{
                backgroundColor: BaseColor.langUNSBtnBack,
                padding: 16,
                borderRadius: 16,
              }}>
              <PortListItem
                icon={Images.ethereum}
                topLeftTxt="assadsad"
                bottomLeftTxt="asdasdds"
                topRightTxt="asdsadas"
                bottomRightTxt="asdasdad"
              />
            </View>

            <View
              style={{
                alignItems: 'center',
                marginTop: 24,
              }}>
              <Image
                source={Images.confirm_image}
                style={{
                  height: 150,
                  width: 150,
                }}
                resizeMode="contain"
              />
              <CText
                value={t('noteThanks')}
                medium
                style={{
                  fontSize: 12,
                  color: BaseColor.text2,
                }}
              />
            </View>
          </View>
        </ScrollView>

        <CButton
          value={t('save')}
          onPress={() => {
            navigation.navigate('PaymentSuccess');
          }}
        />
      </View>
    </>
  );
}
