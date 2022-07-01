import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FeaturesScreen from './Feature/Features';
import DemosScreen from './Demos/Demos';
import {
  DropdownButton,
  DropdownFlatList,
  ModalDropdown,
} from '@monchilin/react-native-dropdown';
import { getSearch } from "./Common";

const Views = {
  FeaturesScreen: FeaturesScreen,
  DemosScreen: DemosScreen,
};

const ViewLabels = Object.keys(Views) as (keyof typeof Views)[];

export default function App() {
  const search = getSearch();
  const [viewIndex, updateExampleIndex] = useState(() => {
    return ViewLabels.includes(search.view) ? ViewLabels.indexOf(search.view) : 0;
  });

  const Component = Views[ViewLabels[viewIndex]];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.focus}>
          <Text>current view:</Text>
          <ModalDropdown
            Overlay={
              <DropdownFlatList
                index={viewIndex}
                onItemPress={({ index }) => updateExampleIndex(index)}
                data={ViewLabels}
              />
            }
            Trigger={<DropdownButton label={ViewLabels[viewIndex]}/>}
          />
        </View>
        <Component/>
      </SafeAreaView>
    </SafeAreaProvider>
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
