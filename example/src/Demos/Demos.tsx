import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import DemoVirtualCurrencyDropdown from './DemoVirtualCurrencyDropdown';
import Dropdown from "../Dropdown";
import DropdownFlatList from "../Dropdown/DropdownFlatList";

const DEMOS = {
  DemoVirtualCurrencyDropdown: DemoVirtualCurrencyDropdown,
};

const DEMO_LABELS = Object.keys(DEMOS) as (keyof typeof DEMOS)[];

export default function Demos() {
  const [demoIndex, updateDemoIndex] = useState(2);

  const Component = DEMOS[DEMO_LABELS[demoIndex]];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar/>
      <View style={styles.focus}>
        <Text>current demo:</Text>
        <Dropdown
          Trigger={DEMO_LABELS[demoIndex]}
          Overlay={<DropdownFlatList data={DEMO_LABELS} onSelect={({ index }) => updateDemoIndex(index)}/>}
        />
      </View>
      <Component/>
    </SafeAreaView>
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
