import React, { useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { DropdownFlatList, ModalDropdown, ModalDropdownHandles } from '@monchilin/react-native-dropdown';

const DEMO_OPTIONS_1 = [
  'option 1',
  'option 2',
  'special',
  'option 4',
  'option 5',
  'option 6',
  'option 7',
  'option 8',
  'option 9',
];

export default function WithImperative() {
  const modalDropdownRef1 = useRef<ModalDropdownHandles>(null);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ModalDropdown
          ref={modalDropdownRef1}
          Overlay={<DropdownFlatList data={DEMO_OPTIONS_1}/>}
          Trigger={`I'am Dropdown`}
          transitionHide={"flipDown"}
          transitionShow={"flipUp"}
        />
        <Button
          title={'click below and after 2 seconds hide'}
          onPress={() => {
            modalDropdownRef1.current.show()
            setTimeout(() => {
              modalDropdownRef1.current.hide()
            }, 2000)
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'column',
    paddingVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
