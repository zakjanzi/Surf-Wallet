import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  FlatList,
  StatusBar,
  Dimensions,
  Modal,
} from 'react-native';
import {useSelector} from 'react-redux';
import {DarkColor, LightColor} from '../../config/colors';
import CText from '../CText';

export default function CMenuItem(props) {
  const {dark} = useSelector(state => state.auth);
  const [BaseColor, setBaseColor] = useState(dark ? DarkColor : LightColor);

  const {
    data,
    title = 'title',
    onChange = () => {},
    selectedItem,
    visible,
    onClose = () => {},
  } = props;

  return (
    <>
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={onClose}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: BaseColor.transBlack,
          }}>
          <View
            style={{
              maxHeight: '80%',
              width: '80%',
              backgroundColor: BaseColor.primaryBG,
              borderRadius: 18,
              alignItems: 'center',
            }}>
            <View
              style={{
                paddingVertical: 16,
                borderBottomColor: BaseColor.divider1,
                borderBottomWidth: 1,
              }}>
              <CText
                value={title}
                semiBold
                style={{
                  color: BaseColor.inputBorder,
                  fontSize: 16,
                }}
              />
            </View>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                      paddingVertical: 16,
                      borderBottomColor: BaseColor.divider1,
                      borderBottomWidth: 1,
                    }}
                    onPress={() => {
                      onChange(item);
                    }}>
                    <CText
                      value={item.title}
                      semiBold
                      style={{
                        color:
                          selectedItem.id == item.id
                            ? BaseColor.inputBottomLine
                            : BaseColor.text2,
                        fontSize: 16,
                      }}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
