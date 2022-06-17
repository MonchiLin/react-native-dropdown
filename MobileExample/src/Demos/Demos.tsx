import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import DemoVirtualCurrencyDropdown from './DemoVirtualCurrencyDropdown';
import { ModalDropdown } from '@monchilin/react-native-dropdown';
import DropdownFlatList from '../Dropdown/DropdownFlatList';
import DemoFullscreenFilters from './DemoFullscreenFilters';

const DEMOS = {
  VirtualCurrencyDropdown: DemoVirtualCurrencyDropdown,
  DemoFullscreenFilters: DemoFullscreenFilters,
};

const DEMO_LABELS = Object.keys(DEMOS) as (keyof typeof DEMOS)[];

export default function DemosScreen() {
  const [demoIndex, updateDemoIndex] = useState(1);

  const Component = DEMOS[DEMO_LABELS[demoIndex]];

  return (
    <View style={{ flex: 1 }}>
      <Component />
      <View style={styles.focus}>
        <Text>current demo:</Text>
        <ModalDropdown
          Trigger={DEMO_LABELS[demoIndex]}
          Overlay={
            <DropdownFlatList
              style={{ width: 100 }}
              data={DEMO_LABELS}
              onSelect={({ index }) => updateDemoIndex(index)}
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  focus: {
    borderStyle: 'dashed',
    borderColor: '#7c8686',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
});
