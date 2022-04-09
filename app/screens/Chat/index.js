import {t} from 'i18next';
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
  Modal,
} from 'react-native';
import {useSelector} from 'react-redux';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import styles from './styles';

export default function Chat({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const chatArr = [
    {
      user: 0,
      msg: 'Hi!',
      time: 'October 13, 2021, 4:33PM',
    },
    {
      user: 1,
      msg: 'Hi! Where can we meet up?',
      time: 'October 13, 2021, 4:33PM',
    },
    {
      user: 0,
      msg: 'Anywhere in Beirut. Please share your location.',
      time: 'October 13, 2021, 4:33PM',
    },
  ];

  const renderChat = ({item, index}) => {
    return (
      <View
        style={{
          marginVertical: 16,
          alignItems: item?.user == 0 ? 'flex-start' : 'flex-end',
        }}>
        <View style={[styles.rowStyle, {}]}>
          {item?.user == 0 && (
            <Image
              source={Images.avatar2}
              resizeMode="contain"
              style={{
                height: 22,
                width: 22,
                borderRadius: 50,
              }}
            />
          )}
          <View
            style={{
              backgroundColor:
                item?.user == 0
                  ? BaseColor.unselectedPrivacyback
                  : BaseColor.tappedBtn,
              padding: 8,
              paddingHorizontal: 16,
              borderRadius: 10,
              marginStart: item?.user == 0 ? 8 : 0,
              borderBottomStartRadius: item?.user == 0 ? 0 : 10,
              borderBottomEndRadius: item?.user == 0 ? 10 : 0,
            }}>
            <CText
              value={item?.msg}
              style={{
                color: item?.user == 0 ? BaseColor.text1 : BaseColor.whiteColor,
                fontSize: 12,
              }}
            />
          </View>
        </View>
        <CText
          value={item?.time}
          style={{
            color: BaseColor.text1,
            fontSize: 8,
            marginStart: item?.user == 0 ? 28 : 0,
          }}
        />
      </View>
    );
  };

  return (
    <>
      <CHeader
        title={t('chat')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <View style={styles.rowStyle}>
          <Image
            source={Images.avatar2}
            resizeMode="contain"
            style={{
              height: 42,
              width: 42,
              borderRadius: 50,
            }}
          />
          <View style={{marginStart: 8, justifyContent: 'space-between'}}>
            <CText
              value={'Ali Bouchri'}
              semiBold
              style={{
                fontSize: 14,
                color: BaseColor.text1,
              }}
            />
            <CText
              value={'Online'}
              semiBold
              style={{
                fontSize: 14,
                color: BaseColor.infoGreen,
              }}
            />
          </View>
        </View>

        <FlatList
          data={chatArr}
          keyExtractor={(item, index) => index}
          renderItem={renderChat}
          style={{marginTop: 16}}
          contentContainerStyle={{flexGrow: 1}}
        />

        <View
          style={[
            styles.inputCont,
            {backgroundColor: BaseColor.langUNSBtnBack},
          ]}>
          <TextInput
            placeholder={t('writeMessage')}
            style={{flex: 1, color: BaseColor.text1, fontSize: 14}}
            placeholderTextColor={BaseColor.placeholderInput}
          />
          <TouchableOpacity activeOpacity={0.7}>
            <Image
              source={
                dark ? Images.map_point_chat_dark : Images.map_point_chat_light
              }
              resizeMode="contain"
              style={{
                height: 20,
                width: 20,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} style={{marginStart: 16}}>
            <Image
              source={dark ? Images.send_dark : Images.send_light}
              resizeMode="contain"
              style={{
                height: 20,
                width: 20,
              }}
              tintColor={BaseColor.inputBottomLine}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
