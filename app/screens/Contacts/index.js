import {t} from 'i18next';
import React, {useState, useRef} from 'react';
import {
  Image,
  TextInput,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useSelector} from 'react-redux';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import {FontFamily} from '../../config/typography';
import styles from './styles';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Modal from 'react-native-modal';
import CButton from '../../components/CButton';

export default function Contacts({navigation}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const swipeableRef = useRef();

  const [searchTxt, setsearchTxt] = useState('');
  const [profileModal, setprofileModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);

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
  ];

  const contactData2 = [
    {
      image: Images.avatar2,
      name: 'Joey B.',
      username: '@JoeyB',
    },
    {
      image: Images.avatar3,
      name: 'Paul H.',
      username: '@PaulH',
    },
    {
      image: Images.avatar4,
      name: 'Kristy H.',
      username: '@KristyH',
    },
    {
      image: Images.avatar5,
      name: 'TD1V20',
      username: '@Cxvt102',
    },
  ];

  const renderContact = ({item, index}) => {
    const renderRightActions = (progress, dragX) => {
      const scale = dragX.interpolate({
        inputRange: [-80, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });
      return (
        <Animated.View style={[styles.rowStyle, {opacity: scale}]}>
          <TouchableOpacity activeOpacity={0.7} style={{}}>
            <Image
              source={Images.edit_pencil}
              style={{
                height: 16,
                width: 16,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{marginStart: 24}}
            onPress={() => {
              setdeleteModal(true);
            }}>
            <Image
              source={Images.delete}
              style={{
                height: 16,
                width: 16,
              }}
              resizeMode="contain"
              tintColor={BaseColor.redCC}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              borderRadius: 24,
              backgroundColor: BaseColor.btnColor,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 8,
              paddingHorizontal: 16,
              marginStart: 24,
            }}>
            <CText
              value={t('trade')}
              medium
              style={{
                fontSize: 10,
                color: BaseColor.whiteColor,
              }}
            />
          </TouchableOpacity>
        </Animated.View>
      );
    };

    return (
      <View
        style={{
          marginBottom: 16,
        }}>
        <Swipeable
          ref={swipeableRef}
          renderRightActions={renderRightActions}
          friction={2}
          enableTrackpadTwoFingerGesture
          rightThreshold={40}>
          <TouchableOpacity
            style={[styles.rowStyle]}
            activeOpacity={0.7}
            onPress={() => {
              setprofileModal(true);
            }}>
            <Image
              source={item?.image}
              style={{
                height: 40,
                width: 40,
              }}
              resizeMode="contain"
            />

            <View
              style={{
                marginStart: 16,
              }}>
              <CText
                value={item?.name}
                medium
                style={{
                  fontSize: 12,
                  color: BaseColor.text2,
                }}
              />
              <CText
                value={item?.username}
                medium
                style={{
                  fontSize: 12,
                  color: BaseColor.text2,
                }}
              />
            </View>
          </TouchableOpacity>
        </Swipeable>
      </View>
    );
  };

  return (
    <>
      <CHeader
        title={t('contacts')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <View style={[styles.rowStyle]}>
          <View
            style={[
              styles.inputCont,
              {
                backgroundColor: BaseColor.selectedBack,
                borderColor: BaseColor.strokeGrey,
              },
            ]}>
            <Image
              source={Images.search}
              style={{
                height: 16,
                width: 16,
                marginEnd: 8,
              }}
              resizeMode="contain"
              tintColor={BaseColor.inputBottomLine}
            />
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
              placeholder={t('searchContactPH')}
              placeholderTextColor={BaseColor.placeholderInput}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('QRScanner');
            }}>
            <Image
              source={dark ? Images.add_contact_dark : Images.add_contact_light}
              style={{
                height: 26,
                width: 26,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <CText
          value={t('recent')}
          style={{
            fontSize: 16,
            color: BaseColor.text1,
            marginTop: 16,
          }}
          semiBold
        />
        <View
          style={[
            styles.rowStyle,
            {justifyContent: 'space-between', marginTop: 8},
          ]}>
          {contactData.map((item, index) => {
            return (
              <View
                style={{
                  width: 56,
                  alignItems: 'center',
                }}>
                <Image
                  source={item?.image}
                  style={{
                    width: 56,
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
              </View>
            );
          })}
        </View>

        <CText
          value={t('contacts')}
          semiBold
          style={{
            fontSize: 16,
            color: BaseColor.text1,
            marginTop: 24,
          }}
        />
        <FlatList
          data={contactData2}
          keyExtractor={(item, index) => index}
          style={{
            marginTop: 16,
          }}
          renderItem={renderContact}
          ListHeaderComponent={() => {
            return (
              <View style={[styles.rowStyle, {marginBottom: 16}]}>
                <Image
                  source={
                    dark ? Images.plus_dotted_dark : Images.plus_dotted_light
                  }
                  resizeMode="contain"
                  style={{
                    height: 40,
                    width: 40,
                  }}
                />
                <CText
                  value={t('inviteFriend')}
                  medium
                  style={{
                    fontSize: 12,
                    color: BaseColor.inputBottomLine,
                    marginStart: 16,
                  }}
                />
              </View>
            );
          }}
        />
      </View>

      {/* delete contact modal */}
      <Modal
        // style={{margin: 0}}
        isVisible={deleteModal}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
        animationInTiming={1000}
        animationOutTiming={1000}
        useNativeDriverForBackdrop={true}
        onBackdropPress={() => {
          setdeleteModal(false);
        }}
        onBackButtonPress={() => {
          setdeleteModal(false);
        }}
        animationOutTiming={1000}
        backdropTransitionOutTiming={1000}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <View
            style={{
              padding: 24,
              backgroundColor: BaseColor.primaryBG,
              borderRadius: 16,
            }}>
            <CText
              value={`${t('deleteContact')}?`}
              semiBold
              style={{
                fontSize: 16,
                color: BaseColor.text1,
              }}
            />
            <CText
              value={`${t('areYouSureDeleteContact1')} JoeB ${t(
                'areYouSureDeleteContact2',
              )}`}
              semiBold
              style={{
                fontSize: 14,
                color: BaseColor.text2,
                marginTop: 8,
              }}
            />

            <View
              style={[
                styles.rowStyle,
                {
                  marginTop: 48,
                },
              ]}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setdeleteModal(false);
                }}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CText
                  value={t('cancel')}
                  semiBold
                  style={{
                    color: BaseColor.text2,
                    fontSize: 12,
                  }}
                />
              </TouchableOpacity>
              <CButton
                value={t('delete')}
                containerStyle={{flex: 1, backgroundColor: BaseColor.lossValue}}
                onPress={() => {
                  setdeleteModal(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* contact details modal */}
      <Modal
        style={{margin: 0}}
        isVisible={profileModal}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
        animationInTiming={1000}
        animationOutTiming={1000}
        useNativeDriverForBackdrop={true}
        onBackdropPress={() => {
          setprofileModal(false);
        }}
        onBackButtonPress={() => {
          setprofileModal(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              padding: 16,
              backgroundColor: BaseColor.primaryBG,
              alignItems: 'center',
            }}>
            <View
              style={[
                styles.tollerBar,
                {backgroundColor: BaseColor.unselectedBottomTabIcon},
              ]}
            />
            <CText
              value={'Joe B.'}
              bold
              style={{
                fontSize: 18,
                color: BaseColor.text1,
                marginTop: 16,
              }}
            />
            <Image
              source={Images.avatar2}
              resizeMode="contain"
              style={{
                height: 56,
                width: 56,
                marginTop: 24,
              }}
            />

            <View
              style={{
                width: '100%',
                marginTop: 32,
              }}>
              <CText
                value={t('usernamePL')}
                medium
                style={{
                  fontSize: 10,
                  color: BaseColor.text2,
                }}
              />

              <TextInput
                placeholder={t('usernamePL')}
                placeholderTextColor={BaseColor.placeholderInput}
                style={[
                  styles.inputStyle,
                  {
                    borderBottomColor: BaseColor.text2,
                    color: BaseColor.text1,
                  },
                ]}
                value={`Joe B.`}
              />
            </View>
            <View
              style={{
                width: '100%',
                marginTop: 12,
              }}>
              <CText
                value={t('walletAddress')}
                medium
                style={{
                  fontSize: 10,
                  color: BaseColor.text2,
                }}
              />

              <View
                style={{
                  borderBottomColor: BaseColor.text2,
                  color: BaseColor.text1,
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TextInput
                  placeholder={t('walletAddress')}
                  placeholderTextColor={BaseColor.placeholderInput}
                  style={[
                    styles.inputStyle,
                    {
                      color: BaseColor.text1,
                      borderBottomWidth: 0,
                    },
                  ]}
                  value={'MIGfMA0GCSqGSIb3DQE...BAQUAA4G'}
                />
                <TouchableOpacity activeOpacity={0.7}>
                  <CText
                    value={t('paste')}
                    medium
                    style={{
                      fontSize: 12,
                      color: BaseColor.inputBottomLine,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <CButton
                value={t('save')}
                onPress={() => {}}
                containerStyle={{
                  marginTop: 86,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
