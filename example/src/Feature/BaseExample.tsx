import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, ImageStyle, StyleProp, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { DropdownFlatList, ModalDropdown } from '@monchilin/react-native-dropdown';
import { DropdownButton } from "@monchilin/react-native-dropdown";

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
  '2se menu item',
  '3rd menu item',
  '4th menu item',
  '5th menu item',
  '6th menu item',
  '7th menu item',
  '8th menu item',
  '9th menu item',
];

const UserIcon = () => {
  return (
    <Image
      source={require('../../assets/user_icon.png')}
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
      source={require('../../assets/arrow_drop_down.png')}
      style={[{ width: 18, height: 18 }, style]}
    />
  );
};

export default function BaseExample() {
  const [index, updateIndex] = useState(-1);
  const [visible1, setVisible1State] = useState(false);
  const [visible2, setVisible2State] = useState(false);
  const [visible3, setVisible3State] = useState(false);
  const [visible4, setVisible4State] = useState(false);
  const [visible5, setVisible5State] = useState(false);
  const [visible6, setVisible6State] = useState(false);
  const [visible7, setVisible7State] = useState(false);
  const [visible8, setVisible8State] = useState(false);
  const [visible9, setVisible9State] = useState(false);
  const [visible10, setVisible10State] = useState(false);
  const animatedValue = useRef(new Animated.Value(0));

  useEffect(() => {
    if (visible1) {
      Animated.timing(animatedValue.current, {
        toValue: 180,
        useNativeDriver: true,
        duration: 100,
      }).start();
    } else {
      Animated.timing(animatedValue.current, {
        toValue: 0,
        useNativeDriver: true,
        duration: 100,
      }).start();
    }
  }, [visible1]);

  const rotateInterpolate = animatedValue.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dropdown Examples</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Basic Picker</Text>
        <ModalDropdown
          visible={visible1}
          onModalWillShow={() => setVisible1State(true)}
          onModalWillHide={() => setVisible1State(false)}
          Trigger={<TouchableOpacity
            onPress={() => setVisible1State(true)}
            style={[{ flexDirection: "row" }, styles.dropdownContainer]}
          >
            <Text>{DATA_SOURCE[index] ?? 'Press me'}</Text>
            <ArrowDropDown style={{ transform: [{ rotate: rotateInterpolate }] }}/>
          </TouchableOpacity>
          }
          Overlay={<DropdownFlatList style={{ width: "auto" }} onSelect={({ index }) => updateIndex(index)} data={DATA_SOURCE}/>}
        />
        <Divider/>
        <Text style={styles.label}>With DropdownButton</Text>
        <ModalDropdown
          onModalWillShow={() => setVisible2State(true)}
          onModalWillHide={() => setVisible2State(false)}
          Overlay={<DropdownFlatList data={DATA_SOURCE}/>}
          Trigger={<DropdownButton label={"Press me"}/>}
        />
        <Divider/>
        <Text style={styles.label}>With Disabled</Text>
        <ModalDropdown
          onModalWillShow={() => setVisible3State(true)}
          onModalWillHide={() => setVisible3State(false)}
          Overlay={<DropdownFlatList data={DATA_SOURCE}/>}
          Trigger={<DropdownButton disabled label={"Press me"}/>}
        />
        <Divider/>
        <Text style={styles.label}>With FlatList disabled</Text>
        <ModalDropdown
          onModalWillShow={() => setVisible4State(true)}
          onModalWillHide={() => setVisible4State(false)}
          Overlay={<DropdownFlatList index={index} onItemPress={({ index }) => updateIndex(index)} data={DATA_SOURCE1}/>}
          Trigger={<DropdownButton label={"Press me"}/>}
        />
        <Divider/>
        <Text style={styles.label}>Without Animation</Text>
        <ModalDropdown
          animated={false}
          onModalWillShow={() => setVisible5State(true)}
          onModalWillHide={() => setVisible5State(false)}
          Overlay={<DropdownFlatList index={index} onItemPress={({ index }) => updateIndex(index)} data={DATA_SOURCE}/>}
          Trigger={<DropdownButton label={"Press me"}/>}
        />

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
        {/*<Text style={styles.label}>Custom Render Item</Text>*/}
        {/*<ModalDropdown*/}
        {/*  Overlay={*/}
        {/*    <DropdownFlatList*/}
        {/*      onSelect={({ index }) => updateIndex(index)}*/}
        {/*      data={DATA_SOURCE2}*/}
        {/*      renderItem={({ item, index }) => {*/}
        {/*        return <View>*/}
        {/*          <Text>{item}</Text>*/}
        {/*        </View>;*/}
        {/*      }}/>*/}
        {/*  }*/}
        {/*  Trigger={*/}
        {/*    props => <TouchableOpacity onPress={props.onPress}*/}
        {/*                               style={[{ flexDirection: "row" }, styles.dropdownContainer]}>*/}
        {/*      <UserIcon/>*/}
        {/*      <Text>{DATA_SOURCE2[index]}</Text>*/}
        {/*      {dropIcon}*/}
        {/*    </TouchableOpacity>*/}
        {/*  }*/}
        {/*  onModalWillShow={() => setVisibleState(true)}*/}
        {/*  onModalWillHide={() => setVisibleState(false)}*/}
        {/*/>*/}
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
