import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WithAnimation from './WithAnimation';
import WithAutoPosition from './WithAutoPosition';
import BaseExample from './BaseExample';
import WithImperative from './WithImperative';
import { DropdownFlatList, ModalDropdown } from '@monchilin/react-native-dropdown';
import WithSafeArea from "./WithSafeArea";

const FeaturesConstants = {
  BaseExample: BaseExample,
  WithAnimation: WithAnimation,
  WithAutoPosition: WithAutoPosition,
  WithImperative: WithImperative,
  WithSafeArea: WithSafeArea,
};

const FeatureLabels = Object.keys(FeaturesConstants) as (keyof typeof FeaturesConstants)[];

export default function FeaturesScreen() {
  const [exampleIndex, updateExampleIndex] = useState(1);

  const Component = FeaturesConstants[FeatureLabels[exampleIndex]];

  return <View style={{ flex: 1 }}>
    <Component/>
    <View style={styles.focus}>
      <Text>current example:</Text>
      <ModalDropdown
        Trigger={FeatureLabels[exampleIndex]}
        Overlay={
          <DropdownFlatList
            data={FeatureLabels}
            onSelect={({ index }) => updateExampleIndex(index)}
          />
        }
      />
    </View>
  </View>;
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
