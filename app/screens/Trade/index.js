import {t} from 'i18next';
import React, {useEffect, useState} from 'react';
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
import CButton from '../../components/CButton';
import CHeader from '../../components/CHeader';
import CText from '../../components/CText';
import {DarkColor, LightColor} from '../../config/colors';
import {Images} from '../../config/images';
import {FontFamily} from '../../config/typography';
import styles from './styles';

export default function Trade({navigation, route}) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const type = route?.params?.type;

  const [cancelTradeModal, setcancelTradeModal] = useState(false);

  const [steps, setsteps] = useState(1);

  const [sendingEscrowLoading, setsendingEscrowLoading] = useState(false);

  useEffect(() => {
    if (type == 'buy') {
      setTimeout(() => {
        setsteps(2);

        setTimeout(() => {
          setsteps(3);
        }, 2000);
      }, 2000);
    }
  }, []);

  return (
    <>
      <CHeader
        title={t('trade')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <Text style={[styles.txtStyle, {color: BaseColor.text2}]}>
            {t('arrangeMeetingTrade1')}
            <Text
              style={[
                {color: BaseColor.text1, fontFamily: FontFamily.Inter_SemiBold},
              ]}>{` 0.000062 BTC `}</Text>
            <Text>{t('forS')}</Text>
            <Text
              style={[
                {color: BaseColor.text1, fontFamily: FontFamily.Inter_SemiBold},
              ]}>{` $67.00`}</Text>
          </Text>

          <View style={[styles.rowStyle, {marginTop: 16}]}>
            <Image
              source={Images.bitcoin}
              resizeMode="contain"
              style={{
                height: 22,
                width: 22,
                marginEnd: 4,
              }}
            />
            <Text style={[styles.txtStyle, {color: BaseColor.text2}]}>
              <Text
                style={[
                  {color: BaseColor.text1, fontFamily: FontFamily.Inter_Medium},
                ]}>{`0.000062 BTC `}</Text>
              <Text>{t('willBeSentTrade')}</Text>
            </Text>
          </View>

          <CButton
            value={t('chat')}
            bordered
            onPress={() => {
              navigation.navigate('Chat');
            }}
            containerStyle={{marginTop: 16}}
          />

          {/* stepper */}
          <View style={{marginTop: 16}}>
            {/* Step 1 */}
            <View style={{flexDirection: 'row'}}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={
                    dark
                      ? Images.step_completed_dark
                      : Images.step_completed_light
                  }
                  resizeMode="contain"
                  style={{
                    height: 14,
                    width: 14,
                  }}
                />
                <View
                  style={{
                    width: 2,
                    backgroundColor: BaseColor.inputBottomLine,
                    height: type != 'buy' ? 250 : 100,
                  }}
                />
              </View>
              <View
                style={{
                  marginStart: 16,
                  flex: 1,
                }}>
                {type != 'buy' ? (
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={
                          dark
                            ? Images.lock_completed_dark
                            : Images.lock_completed_light
                        }
                        resizeMode="contain"
                        style={{
                          height: 34,
                          width: 34,
                        }}
                      />
                      <View style={{marginStart: 16}}>
                        <CText
                          value={t('youAreSeller')}
                          medium
                          style={{
                            fontSize: 14,
                            color: BaseColor.text1,
                          }}
                        />
                        <CText
                          value={t('sendYourFund')}
                          style={{
                            fontSize: 12,
                            color: BaseColor.text2,
                            marginEnd: 48,
                          }}
                        />
                      </View>
                    </View>
                    {!sendingEscrowLoading && steps == 1 && (
                      <View style={{alignItems: 'center'}}>
                        <CText
                          value={'$60.00'}
                          semiBold
                          style={{
                            fontSize: 24,
                            color: BaseColor.inputBottomLine,
                            textAlign: 'center',
                            marginTop: 16,
                          }}
                        />
                        <CText
                          value={'0.00097 BTC'}
                          semiBold
                          style={{
                            fontSize: 12,
                            color: BaseColor.text2,
                            textAlign: 'center',
                            marginTop: 4,
                          }}
                        />

                        <CButton
                          value={t('sendToEscrow')}
                          onPress={() => {
                            setsendingEscrowLoading(true);
                            setTimeout(() => {
                              setsteps(2);
                            }, 2000);
                          }}
                          containerStyle={{width: '96%', marginTop: 16}}
                        />
                      </View>
                    )}
                    {sendingEscrowLoading && steps == 1 && (
                      <CButton
                        value={t('sending') + '...'}
                        disable
                        containerStyle={{width: '96%', marginTop: 16}}
                      />
                    )}

                    {steps >= 2 && (
                      <View>
                        <CButton
                          value={t('cancelEscrowFunding')}
                          bordered
                          onPress={() => {}}
                          containerStyle={{width: '96%', marginTop: 16}}
                        />

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 16,
                          }}>
                          <Image
                            source={Images.mini_info_dark}
                            resizeMode="contain"
                            style={{
                              height: 16,
                              width: 16,
                            }}
                            tintColor={BaseColor.infoGreen}
                          />
                          <CText
                            value={t('escrowFunded')}
                            medium
                            style={{
                              fontSize: 12,
                              color: BaseColor.text1,
                              marginStart: 8,
                            }}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={
                        dark
                          ? Images.lock_completed_dark
                          : Images.lock_completed_light
                      }
                      resizeMode="contain"
                      style={{
                        height: 34,
                        width: 34,
                      }}
                    />
                    <View style={{marginStart: 16}}>
                      <CText
                        value={
                          steps >= 2 ? t('escrowFunded') : t('waitingForSeller')
                        }
                        medium
                        style={{
                          fontSize: 14,
                          color: BaseColor.text1,
                        }}
                      />
                      <CText
                        value={
                          steps >= 2
                            ? t('sellerFundedFund')
                            : t('waitingForSellerDetails')
                        }
                        style={{
                          fontSize: 12,
                          color: BaseColor.text2,
                          marginEnd: 48,
                        }}
                      />
                    </View>
                  </View>
                )}
              </View>
            </View>

            {/* Step 2 */}
            <View style={{flexDirection: 'row'}}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={
                    dark
                      ? steps >= 2
                        ? Images.step_completed_dark
                        : Images.step_uncompleted_dark
                      : steps >= 2
                      ? Images.step_completed_light
                      : Images.step_uncompleted_light
                  }
                  resizeMode="contain"
                  style={{
                    height: 14,
                    width: 14,
                  }}
                />
                <View
                  style={{
                    width: 2,
                    backgroundColor:
                      steps >= 2
                        ? BaseColor.inputBottomLine
                        : BaseColor.unselectedBottomTabIcon,
                    height: type != 'buy' ? 250 : 100,
                  }}
                />
              </View>
              <View
                style={{
                  marginStart: 16,
                  flex: 1,
                }}>
                {type != 'buy' ? (
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={
                          dark
                            ? steps >= 2
                              ? Images.dollor_completed_dark
                              : Images.dollor_incompleted_dark
                            : steps >= 2
                            ? Images.dollor_completed_light
                            : Images.dollor_incompleted_light
                        }
                        resizeMode="contain"
                        style={{
                          height: 34,
                          width: 34,
                        }}
                      />
                      <View style={{marginStart: 16}}>
                        <CText
                          value={t('meetBuyerInPerson')}
                          medium
                          style={{
                            fontSize: 14,
                            color:
                              steps >= 2
                                ? BaseColor.text1
                                : BaseColor.unselectedBottomTabIcon,
                          }}
                        />
                        <CText
                          value={t('meetBuyerDetails')}
                          style={{
                            fontSize: 12,
                            color:
                              steps >= 2
                                ? BaseColor.text2
                                : BaseColor.unselectedBottomTabIcon,
                            marginEnd: 48,
                          }}
                        />
                      </View>
                    </View>
                    {steps >= 2 && (
                      <View>
                        <View style={{alignItems: 'center'}}>
                          <CButton
                            value={
                              steps == 3
                                ? t('cashPaymentRecieved')
                                : t('releaseFunds')
                            }
                            disable={steps == 3}
                            onPress={() => {
                              setsteps(3);
                            }}
                            containerStyle={{width: '96%', marginTop: 16}}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 16,
                          }}>
                          <Image
                            source={Images.mini_info_dark}
                            resizeMode="contain"
                            style={{
                              height: 16,
                              width: 16,
                            }}
                            tintColor={BaseColor.text1}
                          />
                          <CText
                            value={t('checkFlatNotesCarefully')}
                            medium
                            style={{
                              fontSize: 12,
                              color: BaseColor.text1,
                              marginStart: 8,
                            }}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={
                        dark
                          ? steps >= 2
                            ? Images.dollor_completed_dark
                            : Images.dollor_incompleted_dark
                          : steps >= 2
                          ? Images.dollor_completed_light
                          : Images.dollor_incompleted_light
                      }
                      resizeMode="contain"
                      style={{
                        height: 34,
                        width: 34,
                      }}
                    />
                    <View style={{marginStart: 16}}>
                      <CText
                        value={t('meetSeller')}
                        medium
                        style={{
                          fontSize: 14,
                          color:
                            steps >= 2
                              ? BaseColor.text1
                              : BaseColor.unselectedBottomTabIcon,
                        }}
                      />
                      <CText
                        value={t('meetSellerDetails')}
                        style={{
                          fontSize: 12,
                          color:
                            steps >= 2
                              ? BaseColor.text2
                              : BaseColor.unselectedBottomTabIcon,
                          marginEnd: 48,
                        }}
                      />
                    </View>
                  </View>
                )}
              </View>
            </View>

            {/* Step 3 */}
            <View style={{flexDirection: 'row'}}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={
                    dark
                      ? steps >= 3
                        ? Images.step_completed_dark
                        : Images.step_uncompleted_dark
                      : steps >= 3
                      ? Images.step_completed_light
                      : Images.step_uncompleted_light
                  }
                  resizeMode="contain"
                  style={{
                    height: 14,
                    width: 14,
                  }}
                />
              </View>
              <View
                style={{
                  marginStart: 16,
                  flex: 1,
                }}>
                {type != 'buy' ? (
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        source={
                          dark
                            ? steps >= 3
                              ? Images.bit_completed_dark
                              : Images.bit_incompleted_dark
                            : steps >= 3
                            ? Images.bit_completed_light
                            : Images.bit_incompleted_light
                        }
                        resizeMode="contain"
                        style={{
                          height: 34,
                          width: 34,
                        }}
                      />
                      <View style={{marginStart: 16}}>
                        <CText
                          value={t('escrowReleasedtoBuyer')}
                          medium
                          style={{
                            fontSize: 14,
                            color:
                              steps >= 3
                                ? BaseColor.text1
                                : BaseColor.unselectedBottomTabIcon,
                          }}
                        />
                        <CText
                          value={t('fundsReleased')}
                          style={{
                            fontSize: 12,
                            color:
                              steps >= 3
                                ? BaseColor.text2
                                : BaseColor.unselectedBottomTabIcon,
                            marginEnd: 48,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={
                        dark
                          ? steps >= 3
                            ? Images.bit_completed_dark
                            : Images.bit_incompleted_dark
                          : steps >= 3
                          ? Images.bit_completed_light
                          : Images.bit_incompleted_light
                      }
                      resizeMode="contain"
                      style={{
                        height: 34,
                        width: 34,
                      }}
                    />
                    <View style={{marginStart: 16}}>
                      <CText
                        value={t('escrowReleasedtoBuyer')}
                        medium
                        style={{
                          fontSize: 14,
                          color:
                            steps >= 2
                              ? BaseColor.text1
                              : BaseColor.unselectedBottomTabIcon,
                        }}
                      />
                      <CText
                        value={t('waitForSellertoRelease')}
                        style={{
                          fontSize: 12,
                          color:
                            steps >= 2
                              ? BaseColor.text2
                              : BaseColor.unselectedBottomTabIcon,
                          marginEnd: 48,
                        }}
                      />
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>

          {steps != 3 && (
            <CButton
              value={t('cancelTrade')}
              bordered
              onPress={() => {
                setcancelTradeModal(true);
              }}
              containerStyle={{marginTop: 16}}
            />
          )}

          <CText
            value={`Ahmad Ahyani’s ${t('insructions')}`}
            semiBold
            style={{
              fontSize: 16,
              color: BaseColor.portTitle,
              marginTop: 16,
            }}
          />

          <CText
            value={`${t('mettUpInPersonTrade')}`}
            style={{
              fontSize: 12,
              color: BaseColor.text2,
              marginTop: 4,
            }}
          />

          <View
            style={{
              height: 2,
              borderRadius: 10,
              backgroundColor: BaseColor.divider1,
              width: '100%',
              marginVertical: 16,
            }}
          />

          <CText
            value={`${t('tradeInformation')}`}
            semiBold
            style={{
              fontSize: 16,
              color: BaseColor.portTitle,
              marginTop: 16,
            }}
          />

          <View
            style={[styles.box, {backgroundColor: BaseColor.langUNSBtnBack}]}>
            <Text
              style={[styles.txtStyle, {color: BaseColor.text2, fontSize: 12}]}>
              <Text
                style={[
                  {color: BaseColor.text1, fontFamily: FontFamily.Inter_Medium},
                ]}>{`0.000062 BTC `}</Text>
              <Text>{t('hasBeenReserved')}</Text>
            </Text>
          </View>

          <View
            style={[styles.box, {backgroundColor: BaseColor.langUNSBtnBack}]}>
            <CText
              value={`${t('amountToBePaid')}`}
              medium
              style={{
                fontSize: 10,
                color: BaseColor.text2,
              }}
            />
            <CText
              value={`50000 LL`}
              style={{
                fontSize: 12,
                color: BaseColor.text1,
              }}
            />
          </View>

          <View
            style={[styles.box, {backgroundColor: BaseColor.langUNSBtnBack}]}>
            <CText
              value={`${t('rate')}`}
              medium
              style={{
                fontSize: 10,
                color: BaseColor.text2,
              }}
            />
            <CText
              value={`51584000.31 LL`}
              style={{
                fontSize: 12,
                color: BaseColor.text1,
              }}
            />
          </View>
        </ScrollView>
      </View>

      <Modal
        transparent
        style={{flex: 1}}
        animationType="fade"
        visible={cancelTradeModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: BaseColor.transBlack,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              borderRadius: 10,
              backgroundColor: BaseColor.modalBack,
              padding: 16,
              width: '90%',
            }}>
            <CText
              value={`${t('areYouSure')}`}
              semiBold
              style={{
                fontSize: 16,
                color: BaseColor.portTitle,
              }}
            />
            <CText
              value={`${t('fundsWillBeSentBack')}`}
              semiBold
              style={{
                fontSize: 14,
                color: BaseColor.text2,
                marginTop: 4,
              }}
            />

            <View style={[styles.rowStyle, {marginTop: 24}]}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  padding: 8,
                  paddingHorizontal: 16,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setcancelTradeModal(false);
                }}>
                <CText
                  value={`${t('goBack')}`}
                  semiBold
                  style={{
                    fontSize: 12,
                    color: BaseColor.text2,
                    marginTop: 4,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  padding: 8,
                  paddingHorizontal: 16,
                  backgroundColor: BaseColor.notavailableName,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setcancelTradeModal(false);
                }}>
                <CText
                  value={`${t('cancelTrade')}`}
                  semiBold
                  style={{
                    fontSize: 12,
                    color: BaseColor.whiteColor,
                    marginTop: 4,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
