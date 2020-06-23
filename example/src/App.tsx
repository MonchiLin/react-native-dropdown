import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import AnimationExample from './Animation';
import AutoPositionExample from './AutoPosition';
import BaseExample from './BaseExample';
import { VirtualCurrencyDropdown } from './VirtualCurrencyDropdown';
import UseRefForImperativeExample from './UseRefForImperative';
import Dropdown from '../../src/Dropdown';

const DEMOS = {
  Animation: AnimationExample,
  AutoPosition: AutoPositionExample,
  BaseExample: BaseExample,
  VirtualCurrencyDropdown: () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <VirtualCurrencyDropdown />
    </View>
  ),
  UseRefForImperative: UseRefForImperativeExample,
};

const DEMO_LABELS = Object.keys(DEMOS);

export default function App() {
  const [demoIndex, updateDemoIndex] = useState(3);

  // @ts-ignore
  const Component = DEMOS[DEMO_LABELS[demoIndex]];

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <View style={styles.focus}>
        <Text>current demo:</Text>
        <Dropdown
          labelStyle={{ color: '#556a37' }}
          dataSource={DEMO_LABELS}
          onSelect={updateDemoIndex}
          index={demoIndex}
        />
      </View>
      <Component />
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
