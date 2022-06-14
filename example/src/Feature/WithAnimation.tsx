import { ModalDropdown, DropdownFlatList } from '@monchilin/react-native-dropdown';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

const showAnimations = ['flipUp', 'scaleIn', 'fadeIn', 'slideUp'] as const;

const hiddenAnimations = [
  'flipDown',
  'scaleOut',
  'fadeOut',
  'slideDown',
] as const;

export default function WithAnimation() {
  const [transitionShowIndex, setTransitionShowIndex] = useState(0);
  const [transitionHiddenIndex, setTransitionHiddenIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ModalDropdown
          Trigger={`click to change transitionShow current is [${showAnimations[transitionShowIndex]}]`}
          Overlay={
            <DropdownFlatList
              onSelect={({ index }) => {
                setTransitionShowIndex(index);
              }} data={showAnimations}
            />
          }
        />
        <ModalDropdown
          Overlay={
            <DropdownFlatList
              index={transitionHiddenIndex}
              onSelect={({ index }) => {
                setTransitionHiddenIndex(index);
              }}
              data={hiddenAnimations}
            />
          }
          Trigger={`click to change transitionHide current is [${hiddenAnimations[transitionHiddenIndex]}]`}
        />
        <View
          style={{
            height: 1,
            backgroundColor: 'gray',
            width: '100%',
            marginVertical: 20,
          }}
        />
        <ModalDropdown
          dropdownProps={{ testID: "debug" }}
          transitionShow={showAnimations[transitionShowIndex]}
          transitionHide={hiddenAnimations[transitionHiddenIndex]}
          Overlay={<DropdownFlatList data={DEMO_OPTIONS_1}/>}
          Trigger={'try transition'}
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
