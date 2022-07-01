import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WithAnimation from './WithAnimation';
import WithAutoPosition from './WithAutoPosition';
import BaseFeatures from './BaseFeatures';
import WithImperative from './WithImperative';
import {
  DropdownFlatList,
  ModalDropdown,
} from '@monchilin/react-native-dropdown';
import WithSafeArea from './WithSafeArea';
import { getSearch } from "../Common";

const FeaturesConstants = {
  BaseFeatures: BaseFeatures,
  WithAnimation: WithAnimation,
  WithAutoPosition: WithAutoPosition,
  WithImperative: WithImperative,
  WithSafeArea: WithSafeArea,
};

const FeatureLabels = Object.keys(
  FeaturesConstants
) as (keyof typeof FeaturesConstants)[];

export default function FeaturesScreen() {
  const search = getSearch();
  const [exampleIndex, updateExampleIndex] = useState(() => {
    const name: keyof typeof FeaturesConstants = search.demo as any;

    return FeatureLabels.includes(name) ? FeatureLabels.indexOf(name) : 0;
  });

  const Component = FeaturesConstants[FeatureLabels[exampleIndex]];

  return (
    <View style={{ flex: 1 }}>
      <Component />
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
