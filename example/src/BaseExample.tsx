import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, ImageStyle, StyleProp, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { DropdownFlatList, ModalDropdown } from '@monchilin/react-native-dropdown';

const DATA_SOURCE = [
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

const DATA_SOURCE1 = [
  'selectable',
  'selectable',
  "I can't be Selected",
  'option 4',
  'option 5',
  'option 6',
  "I can't be Selected",
  'option 8',
  'option 9',
];

const DATA_SOURCE2 = [
  '1st menu item',
  '2st menu item',
  '3st menu item',
  '4st menu item',
  '5st menu item',
  '6st menu item',
  '7st menu item',
  '8st menu item',
  '9st menu item',
];

const UserIcon = () => {
  return (
    <Image
      source={require('../assets/user_icon.png')}
      style={{ width: 18, height: 18 }}
    />
  );
};

const Divider = () => {
  return (
    <View
      style={{
        width: '100%',
        height: 1,
        backgroundColor: 'black',
        marginVertical: 10,
      }}
    />
  );
};

const ArrowDropDown = ({
                         style,
                       }: {
  style: Animated.WithAnimatedValue<StyleProp<ImageStyle>>;
}) => {
  return (
    <Animated.Image
      source={require('../assets/arrow_drop_down.png')}
      style={[{ width: 18, height: 18 }, style]}
    />
  );
};

export default function BaseExample() {
  const [index, updateIndex] = useState(0);
  const [visible, setVisibleState] = useState(false);
  const animatedValue = useRef(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(animatedValue.current, {
        toValue: 180,
        useNativeDriver: true,
        delay: 100,
      }).start();
    } else {
      Animated.timing(animatedValue.current, {
        toValue: 0,
        useNativeDriver: true,
        delay: 100,
      }).start();
    }
  }, [visible]);

  const rotateInterpolate = animatedValue.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const dropIcon = (
    <ArrowDropDown style={{ transform: [{ rotate: rotateInterpolate }] }}/>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dropdown Examples</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Basic Picker</Text>
        <ModalDropdown
          transitionShow={"flipUp"}
          transitionHide={"flipDown"}
          onModalWillShow={() => setVisibleState(true)}
          onModalWillHide={() => setVisibleState(false)}
          Trigger={props => <TouchableOpacity
            onPress={props.onPress}
            style={[{ flexDirection: "row" }, styles.dropdownContainer]}
          >
            <Text>{DATA_SOURCE[index]}</Text>
            {dropIcon}
          </TouchableOpacity>
          }
          Overlay={<DropdownFlatList onSelect={({ index }) => updateIndex(index)} data={DATA_SOURCE1}/>}
        />
        <Divider/>
        {/*<Text style={styles.label}>Disabled Label</Text>*/}
        {/*<Dropdown*/}
        {/*  index={index}*/}
        {/*  onSelect={updateIndex}*/}
        {/*  rootContainerStyle={styles.dropdownContainer}*/}
        {/*  labelContainerStyle={styles.labelContainer}*/}
        {/*  dataSource={DATA_SOURCE}*/}
        {/*  disabled*/}
        {/*  onDropdownWillShow={() => setVisibleState(true)}*/}
        {/*  onDropdownWillHide={() => setVisibleState(false)}*/}
        {/*>*/}
        {/*  <Text style={{ color: '#afafaf' }}>{DATA_SOURCE[index]}</Text>*/}
        {/*  {dropIcon}*/}
        {/*</Dropdown>*/}
        {/*<Divider/>*/}
        {/*<Text style={styles.label}>Disabled Item</Text>*/}
        {/*<Dropdown*/}
        {/*  index={index}*/}
        {/*  onSelect={(index) => {*/}
        {/*    if (index === 2 || index === 6) {*/}
        {/*      return false;*/}
        {/*    } else {*/}
        {/*      updateIndex(index);*/}
        {/*    }*/}
        {/*  }}*/}
        {/*  onDropdownWillHide={(_, index) => {*/}
        {/*    if (index === 2 || index === 6) {*/}
        {/*      return false;*/}
        {/*    }*/}
        {/*    setVisibleState(false);*/}
        {/*  }}*/}
        {/*  rootContainerStyle={styles.dropdownContainer}*/}
        {/*  labelContainerStyle={styles.labelContainer}*/}
        {/*  dataSource={DATA_SOURCE1}*/}
        {/*  onDropdownWillShow={() => setVisibleState(true)}*/}
        {/*>*/}
        {/*  <Text>{DATA_SOURCE[index]}</Text>*/}
        {/*  {dropIcon}*/}
        {/*</Dropdown>*/}

        {/*<Divider/>*/}
        {/*<Text style={styles.label}>With Border</Text>*/}
        {/*<Dropdown*/}
        {/*  index={index}*/}
        {/*  onSelect={updateIndex}*/}
        {/*  rootContainerStyle={styles.dropdownContainer}*/}
        {/*  labelContainerStyle={[*/}
        {/*    styles.labelContainer,*/}
        {/*    styles.border,*/}
        {/*    styles.pa5,*/}
        {/*  ]}*/}
        {/*  dataSource={DATA_SOURCE2}*/}
        {/*  onDropdownWillShow={() => setVisibleState(true)}*/}
        {/*  onDropdownWillHide={() => setVisibleState(false)}*/}
        {/*>*/}
        {/*  <Text>{DATA_SOURCE2[index]}</Text>*/}
        {/*  {dropIcon}*/}
        {/*</Dropdown>*/}

        {/*<Divider/>*/}
        {/*<Text style={styles.label}>With Split</Text>*/}
        {/*<Dropdown*/}
        {/*  index={index}*/}
        {/*  onSelect={updateIndex}*/}
        {/*  rootContainerStyle={styles.dropdownContainer}*/}
        {/*  showSeparator*/}
        {/*  labelContainerStyle={[*/}
        {/*    styles.labelContainer,*/}
        {/*    styles.border,*/}
        {/*    styles.pa5,*/}
        {/*  ]}*/}
        {/*  dataSource={DATA_SOURCE2}*/}
        {/*  onDropdownWillShow={() => setVisibleState(true)}*/}
        {/*  onDropdownWillHide={() => setVisibleState(false)}*/}
        {/*>*/}
        {/*  <Text>{DATA_SOURCE2[index]}</Text>*/}
        {/*  {dropIcon}*/}
        {/*</Dropdown>*/}

        {/*<Divider/>*/}
        <Text style={styles.label}>Custom Render Item</Text>
        <ModalDropdown
          Overlay={
            <DropdownFlatList
              onSelect={({ index }) => updateIndex(index)}
              data={DATA_SOURCE2}
              renderItem={({ item, index }) => {
                return <View>
                  <Text>{item}</Text>
                </View>;
              }}/>
          }
          Trigger={
            props => <TouchableOpacity onPress={props.onPress}
                                       style={[{ flexDirection: "row" }, styles.dropdownContainer]}>
              <UserIcon/>
              <Text>{DATA_SOURCE2[index]}</Text>
              {dropIcon}
            </TouchableOpacity>
          }
          onModalWillShow={() => setVisibleState(true)}
          onModalWillHide={() => setVisibleState(false)}
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
  title: {
    fontSize: 18,
  },
  label: {
    fontSize: 16,
  },
  row: {
    flexDirection: 'column',
    paddingVertical: 50,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    flexDirection: 'column',
  },
  dropdownContainer: {},
  labelContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  border: {
    borderColor: 'rgb(217, 217, 217)',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  pa5: {
    padding: 5,
  },
});
