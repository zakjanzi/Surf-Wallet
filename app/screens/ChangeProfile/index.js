import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {View, ScrollView, Image, TouchableOpacity, Text} from 'react-native';
import {DarkColor, LightColor} from '../../config/colors';
import CHeader from '../../components/CHeader';
import {t} from 'i18next';
import styles from './styles';
import {Images} from '../../config/images';
import CText from '../../components/CText';
import CButton from '../../components/CButton';

export default function ChangeProfile({navigation}) {
  const {dark} = useSelector(state => state.auth);

  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const [selectedProfile, setselectedProfile] = useState({
    image: Images.avatar_1,
    id: 0,
  });

  const profile_photo = [
    {
      image: Images.avatar_1,
      id: 0,
    },
    {
      image: Images.avatar2,
      id: 1,
    },
    {
      image: Images.avatar3,
      id: 2,
    },
    {
      image: Images.avatar4,
      id: 3,
    },
    {
      image: Images.avatar5,
      id: 4,
    },
    {
      image: Images.avatar6,
      id: 5,
    },
  ];

  const profile_photo2 = [
    {
      image: Images.avatar_1,
      id: 6,
    },
    {
      image: Images.avatar2,
      id: 7,
    },
    {
      image: Images.avatar3,
      id: 8,
    },
    {
      image: Images.avatar4,
      id: 9,
    },
    {
      image: Images.avatar5,
      id: 10,
    },
    {
      image: Images.avatar6,
      id: 11,
    },
  ];

  return (
    <>
      <CHeader
        title={t('profilePicture')}
        backBtn
        onBackPress={() => {
          navigation.goBack();
        }}
      />
      <View style={[styles.root, {backgroundColor: BaseColor.primaryBG}]}>
        <View style={{flexGrow: 1}}>
          <Image
            source={selectedProfile.image}
            style={{height: 74, width: 74, alignSelf: 'center', marginTop: 64}}
            resizeMode="contain"
          />
          <CText
            value={t('uploadYourProfile')}
            bold
            style={{
              color: BaseColor.inputBottomLine,
              fontSize: 12,
              marginTop: 16,
              textAlign: 'center',
            }}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{marginTop: 64, paddingHorizontal: 8}}>
            <View>
              <View style={{flexDirection: 'row'}}>
                {profile_photo.map((item, index) => {
                  return (
                    <View>
                      <TouchableOpacity
                        key={index}
                        activeOpacity={0.7}
                        style={{marginHorizontal: 16}}
                        onPress={() => {
                          setselectedProfile(item);
                        }}>
                        <Image
                          source={item.image}
                          style={{height: 74, width: 74}}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      {item.id == selectedProfile.id && (
                        <Image
                          source={
                            dark
                              ? Images.profile_check_dark
                              : Images.profile_check_light
                          }
                          style={{
                            height: 26,
                            width: 26,
                            position: 'absolute',
                            bottom: 0,
                            right: 10,
                          }}
                          resizeMode="contain"
                        />
                      )}
                    </View>
                  );
                })}
              </View>
              <View style={{flexDirection: 'row', marginTop: 16}}>
                {profile_photo2.map((item, index) => {
                  return (
                    <View>
                      <TouchableOpacity
                        key={index}
                        activeOpacity={0.7}
                        style={{marginHorizontal: 16}}
                        onPress={() => {
                          setselectedProfile(item);
                        }}>
                        <Image
                          source={item.image}
                          style={{height: 74, width: 74}}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      {item.id == selectedProfile.id && (
                        <Image
                          source={
                            dark
                              ? Images.profile_check_dark
                              : Images.profile_check_light
                          }
                          style={{
                            height: 26,
                            width: 26,
                            position: 'absolute',
                            bottom: 0,
                            right: 10,
                          }}
                          resizeMode="contain"
                        />
                      )}
                    </View>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </View>
        <CButton
          value={t('save')}
          onPress={() => {
            navigation.navigate('Portfolio');
          }}
        />
      </View>
    </>
  );
}
