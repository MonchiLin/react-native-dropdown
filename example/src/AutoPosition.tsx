import Dropdown from './Dropdown';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import DropdownFlatList from "./Dropdown/DropdownFlatList";

const DEMO_OPTIONS_1 = [
  'option 1',
  'option 2',
  'option 3',
  'option 4',
  'option 5',
  'option 6',
  'option 7',
  'option 8',
  'option 9',
];

export default function AutoPosition() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Dropdown
            Overlay={<DropdownFlatList data={DEMO_OPTIONS_1}/>}
            Trigger={'upper left corner'}
          />
        </View>
        <View style={[styles.cell, { alignItems: 'flex-end' }]}>
          <Dropdown
            Overlay={<DropdownFlatList data={DEMO_OPTIONS_1}/>}
            Trigger={'upper right corner'}
          />
        </View>
      </View>
      <View style={[styles.row]}>
        <View style={[styles.cell, { justifyContent: 'flex-end' }]}>
          <Dropdown
            Overlay={<DropdownFlatList data={DEMO_OPTIONS_1}/>}
            Trigger={'lower left corner'}
          />
        </View>
        <View
          style={[
            styles.cell,
            { alignItems: 'flex-end', justifyContent: 'flex-end' },
          ]}
        >
          <Dropdown
            Overlay={<DropdownFlatList data={DEMO_OPTIONS_1}/>}
            Trigger={'lower right corner'}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    flexDirection: 'column',
  },
});
