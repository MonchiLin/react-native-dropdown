import Dropdown from '@monchilin/react-native-dropdown';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
  'scaleOut',
  'flipDown',
  'fadeOut',
  'slideDown',
] as const;

export default function Animation() {
  const [transitionShowIndex, setTransitionShowIndex] = useState(3);
  const [transitionHiddenIndex, setTransitionHiddenIndex] = useState(3);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Dropdown
          dataSource={showAnimations}
          defaultLabel={'select'}
          index={transitionShowIndex}
          onSelect={setTransitionShowIndex}
        >
          <Text style={{ color: '#60c8f6' }}>
            click to change transitionShow current is [
            {showAnimations[transitionShowIndex]}]
          </Text>
        </Dropdown>
        <Dropdown
          dataSource={hiddenAnimations}
          defaultLabel={'select'}
          index={transitionHiddenIndex}
          onSelect={setTransitionHiddenIndex}
        >
          <Text style={{ color: '#60c8f6' }}>
            click to change transitionShow current is [
            {hiddenAnimations[transitionHiddenIndex]}]
          </Text>
        </Dropdown>
        <View
          style={{
            height: 1,
            backgroundColor: 'gray',
            width: '100%',
            marginVertical: 20,
          }}
        />
        <Dropdown
          transitionShow={showAnimations[transitionShowIndex]}
          transitionHide={hiddenAnimations[transitionHiddenIndex]}
          dataSource={DEMO_OPTIONS_1}
          defaultLabel={'try transition'}
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
