import React, { useMemo, useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, } from 'react-native';
import { DropdownFlatList, ModalDropdown, } from '@monchilin/react-native-dropdown';
import { AnimatedDownArrow } from '../Common';

const DATA_SOURCE = ['BNA', 'USDI', 'SHUIBI', 'ATC', 'CTC'];

export default function DemoWithInput() {
  const [visible, setVisibleState] = useState(false);
  const [index, updateIndex] = useState(-1);
  const value = useMemo(() => {
    return DATA_SOURCE[index] ?? "";
  }, [DATA_SOURCE, index]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ModalDropdown
        transitionHide={"slideDown"}
        transitionShow={"slideUp"}
        onModalWillHide={() => setVisibleState(false)}
        onModalWillShow={() => setVisibleState(true)}
        visible={visible}
        Overlay={
          <DropdownFlatList
            data={DATA_SOURCE}
            index={index}
            onSelect={({ index }) => updateIndex(index)}
            renderItem={({ item, isActive }) => {
              return (
                <View
                  style={[{
                    width: "100%",
                    alignItems: "flex-start",
                    paddingHorizontal: 5,
                    paddingVertical: 5
                  }, isActive && { backgroundColor: "rgba(25, 118, 210, 0.08)" }]}
                >
                  <Text>{item}</Text>
                </View>
              );
            }}
          />
        }
        Trigger={
          <TouchableWithoutFeedback
            onPress={() => setVisibleState(true)}
          >
            <View style={{
              flexDirection: "row",
              borderColor: "#1976D2",
              borderStyle: "solid",
              borderWidth: 1,
              borderRadius: 2,
              padding: 5,
            }}>
              <TextInput
                editable={false}
                style={Platform.OS === "web" && { outlineWidth: 0 } as any}
                value={value}
                placeholder="Select Currency"
              />
              <AnimatedDownArrow color={"#1976D2"} visible={visible}/>
            </View>
          </TouchableWithoutFeedback>
        }
      />
    </View>
  );
}

