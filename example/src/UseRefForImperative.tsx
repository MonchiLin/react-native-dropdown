import ModalDropdown, {
  ModalDropdownHandles,
} from '@monchilin/react-native-dropdown';
import React, { useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';

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

export default function UseRefForImperative() {
  const modalDropdownRef1 = useRef<ModalDropdownHandles>(null);
  const modalDropdownRef2 = useRef<ModalDropdownHandles>(null);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ModalDropdown ref={modalDropdownRef1} dataSource={DEMO_OPTIONS_1} />
        <Button
          title={'Manual Select Index 2'}
          onPress={() => modalDropdownRef1.current?.select(2)}
        />
      </View>
      <View style={styles.row}>
        <ModalDropdown
          ref={modalDropdownRef2}
          defaultLabel={'click below'}
          dataSource={DEMO_OPTIONS_1}
        />
        <Button
          title={'Manual Trigger Show'}
          onPress={() => modalDropdownRef2.current?.show()}
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
