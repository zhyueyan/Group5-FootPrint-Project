/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import IconButton from 'react-native-vector-icons/dist/lib/icon-button';
import Feather from 'react-native-vector-icons/Feather';
import {BottomPopup} from './BottomPopup';

const popuplist = [
  {
    id: 1,
    name: 'Locate',
  },
  {
    id: 2,
    name: 'Share',
  },
  {
    id: 3,
    name: 'Settings',
  },
];

const ChooseIcons = (props) => {
  const { startRecord } = props;
  let popupRef = React.createRef();
 
  const onShowPopup = () => {
    popupRef.show();
  };

  const onClosePopup = () => {
    popupRef.close();
  };

  return (
    <View style={{flexDirection: 'column', alignSelf: 'center'}}>
      <Feather name="play-circle" style={{fontSize: 40, padding: 5}} onPress={startRecord}/>
      <Feather name="camera" style={{fontSize: 40, padding: 5}} />
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={onShowPopup}>
          <Feather name="layers" style={{fontSize: 40, padding: 5}} />
        </TouchableWithoutFeedback>
        <BottomPopup
          title="More details"
          ref={target => (popupRef = target)}
          onTouchOutside={onClosePopup}
          data={popuplist}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ChooseIcons;
