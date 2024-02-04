import Clipboard from '@react-native-clipboard/clipboard';
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
import {useSelector} from 'react-redux';
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import {FontFamily} from '../../config/typography';
import styles from './styles';

export default function SendTo({navigation, route}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);
  const transactionsDetails = route?.params?.transactionsDetails;
  const [searchTxt, setsearchTxt] = useState('');
  const [walletAddress, setwalletAddress] = useState('');
  const [note, setnote] = useState('');
  const [selectedUserDetail, setSelectedUserDetail] = useState({})

  // console.log('==transactionsDetail==',transactionsDetail)

  const contactData = [
    {
      image: Images.avatar2,
      name: 'Ahmad',
    },
    {
      image: Images.avatar3,
      name: 'Vanessa',
    },
    {
      image: Images.avatar4,
      name: 'Hussein',
    },
    {
      image: Images.avatar5,
      name: 'Joe',
    },
    {
      image: Images.avatar6,
      name: 'Joey',
    },
  ];

  const pastePhrase = async () => {
    const text = await Clipboard.getString();
    setwalletAddress(text);
    Toast.show(t('pasted'));
  };

  return (
    <>
      <CHeader
        title={t('sendTo')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <View
          style={[
            styles.inputCont,
            {
              backgroundColor: BaseColor.selectedBack,
              borderColor: BaseColor.strokeGrey,
            },
          ]}>
          <TextInput
            value={searchTxt}
            onChangeText={setsearchTxt}
            style={{
              flex: 1,
              color: BaseColor.text2,
              marginEnd: 16,
              fontSize: 12,
              height: 40,
              fontFamily: FontFamily.Inter_Medium,
            }}
            placeholder={t('searchRecipentPH')}
            placeholderTextColor={BaseColor.placeholderInput}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('QRScanner');
            }}>
            <Image
              source={
                dark ? Images.barcode_icon_dark : Images.barcode_icon_light
              }
              style={{
                height: 16,
                width: 16,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {!searchTxt ? (
          <View style={[styles.mainCont]}>
            <CText
              value={t('recent')}
              medium
              style={{
                fontSize: 12,
                color: BaseColor.inputBottomLine,
              }}
            />
            <View>
              <FlatList
                data={contactData}
                keyExtractor={(item, index) => index}
                scrollEnabled={false}
                style={{marginTop: 16}}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                    onPress={()=> setSelectedUserDetail(item)}
                      style={{
                        width: (Dimensions.get('window').width - 32) / 5,
                        alignItems: 'center',
                      }}>
                      <Image
                        source={item?.image}
                        style={{
                          width: (Dimensions.get('window').width - 32) / 5,
                          height: 50,
                        }}
                        resizeMode="center"
                      />
                      <CText
                        value={item?.name}
                        medium
                        style={{
                          fontSize: 10,
                          color: BaseColor.text1,
                        }}
                      />
                    </TouchableOpacity>
                  );
                }}
                horizontal
              />
            </View>

            <View
              style={[styles.divider, {backgroundColor: BaseColor.divider1}]}
            />

            <View
              style={[
                styles.inputCont,
                {
                  backgroundColor: BaseColor.selectedBack,
                  borderColor: BaseColor.strokeGrey,
                  alignItems: 'flex-start',
                },
              ]}>
              <TextInput
                value={walletAddress}
                onChangeText={setwalletAddress}
                style={{
                  flex: 1,
                  color: BaseColor.text2,
                  marginEnd: 16,
                  fontSize: 12,
                  height: 80,
                  fontFamily: FontFamily.Inter_Medium,
                }}
                textAlignVertical="top"
                multiline
                placeholder={t('walletAddressPH')}
                placeholderTextColor={BaseColor.placeholderInput}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  pastePhrase();
                }}>
                <CText
                  value={t('paste')}
                  medium
                  style={{
                    fontSize: 12,
                    color: BaseColor.inputBottomLine,
                    marginTop: 16,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.inputCont,
                {
                  backgroundColor: BaseColor.selectedBack,
                  borderColor: BaseColor.strokeGrey,
                  alignItems: 'flex-start',
                  marginTop: 16,
                },
              ]}>
              <TextInput
                value={note}
                onChangeText={setnote}
                style={{
                  flex: 1,
                  color: BaseColor.text2,
                  marginEnd: 16,
                  fontSize: 12,
                  height: 40,
                  fontFamily: FontFamily.Inter_Medium,
                }}
                multiline
                placeholder={t('addNotePH')}
                placeholderTextColor={BaseColor.placeholderInput}
              />
            </View>

            <TouchableOpacity
              style={[styles.gifCont, {borderColor: BaseColor.inputBottomLine}]}
              activeOpacity={0.7}>
              <CText
                value={t('gif')}
                medium
                style={{
                  fontSize: 10,
                  color: BaseColor.inputBottomLine,
                }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={contactData}
            keyExtractor={(item, index) => index}
            scrollEnabled={false}
            style={{marginTop: 16}}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: 12,
                  }}>
                  <Image
                    source={item?.image}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                    resizeMode="center"
                  />
                  <CText
                    value={item?.name}
                    medium
                    style={{
                      fontSize: 10,
                      color: BaseColor.text1,
                      marginStart: 16,
                    }}
                  />
                </View>
              );
            }}
          />
        )}
        <CButton
          value={t('continue')}
          onPress={() => {
            navigation.navigate('ConfirmAmount',{transactionDetails:transactionsDetails, receiverDetails: selectedUserDetail});
          }}
        />
      </View>
    </>
  );
}
