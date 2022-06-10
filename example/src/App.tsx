import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import WithAnimation from './WithAnimation';
import WithAutoPosition from './WithAutoPosition';
import BaseExample from './BaseExample';
import WithImperative from './WithImperative';
import { ModalDropdown } from '@monchilin/react-native-dropdown/';
import DropdownFlatList from "./Dropdown/DropdownFlatList";

const Features = {
  WithAnimation: WithAnimation,
  WithAutoPosition: WithAutoPosition,
  BaseExample: BaseExample,
  WithImperative: WithImperative,
};

const FeatureLabels = Object.keys(Features) as (keyof typeof Features)[];

export default function App() {
  const [exampleIndex, updateExampleIndex] = useState(2);

  const Component = Features[FeatureLabels[exampleIndex]];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.focus}>
        <Text>current demo:</Text>
        <ModalDropdown
          Trigger={FeatureLabels[exampleIndex]}
          Overlay={<DropdownFlatList data={FeatureLabels} onSelect={({ index }) => updateExampleIndex(index)}/>}
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
