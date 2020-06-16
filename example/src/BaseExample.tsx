import ModalDropdown from '@monchilin/react-native-dropdown';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
    <ArrowDropDown style={{ transform: [{ rotate: rotateInterpolate }] }} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dropdown Examples</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Basic Picker</Text>
        <ModalDropdown
          index={index}
          onSelect={updateIndex}
          rootContainerStyle={styles.dropdownContainer}
          labelContainerStyle={styles.labelContainer}
          dataSource={DATA_SOURCE}
          onDropdownWillShow={() => setVisibleState(true)}
          onDropdownWillHide={() => setVisibleState(false)}
        >
          <Text>{DATA_SOURCE[index]}</Text>
          {dropIcon}
        </ModalDropdown>
        <Divider />
        <Text style={styles.label}>Disabled Label</Text>
        <ModalDropdown
          index={index}
          onSelect={updateIndex}
          rootContainerStyle={styles.dropdownContainer}
          labelContainerStyle={styles.labelContainer}
          dataSource={DATA_SOURCE}
          disabled
          onDropdownWillShow={() => setVisibleState(true)}
          onDropdownWillHide={() => setVisibleState(false)}
        >
          <Text style={{ color: '#afafaf' }}>{DATA_SOURCE[index]}</Text>
          {dropIcon}
        </ModalDropdown>
        <Divider />
        <Text style={styles.label}>Disabled Item</Text>
        <ModalDropdown
          index={index}
          onSelect={(index) => {
            if (index === 2 || index === 6) {
              return false;
            } else {
              updateIndex(index);
            }
          }}
          onDropdownWillHide={(_, index) => {
            if (index === 2 || index === 6) {
              return false;
            }
            setVisibleState(false);
          }}
          rootContainerStyle={styles.dropdownContainer}
          labelContainerStyle={styles.labelContainer}
          dataSource={DATA_SOURCE1}
          onDropdownWillShow={() => setVisibleState(true)}
        >
          <Text>{DATA_SOURCE[index]}</Text>
          {dropIcon}
        </ModalDropdown>

        <Divider />
        <Text style={styles.label}>With Border</Text>
        <ModalDropdown
          index={index}
          onSelect={updateIndex}
          rootContainerStyle={styles.dropdownContainer}
          labelContainerStyle={[
            styles.labelContainer,
            styles.border,
            styles.pa5,
          ]}
          dataSource={DATA_SOURCE2}
          onDropdownWillShow={() => setVisibleState(true)}
          onDropdownWillHide={() => setVisibleState(false)}
        >
          <Text>{DATA_SOURCE2[index]}</Text>
          {dropIcon}
        </ModalDropdown>

        <Divider />
        <Text style={styles.label}>With Split</Text>
        <ModalDropdown
          index={index}
          onSelect={updateIndex}
          rootContainerStyle={styles.dropdownContainer}
          showSeparator
          labelContainerStyle={[
            styles.labelContainer,
            styles.border,
            styles.pa5,
          ]}
          dataSource={DATA_SOURCE2}
          onDropdownWillShow={() => setVisibleState(true)}
          onDropdownWillHide={() => setVisibleState(false)}
        >
          <Text>{DATA_SOURCE2[index]}</Text>
          {dropIcon}
        </ModalDropdown>

        <Divider />
        <Text style={styles.label}>Custom Render Item</Text>
        <ModalDropdown
          index={index}
          onSelect={updateIndex}
          rootContainerStyle={styles.dropdownContainer}
          showSeparator
          labelContainerStyle={[
            styles.labelContainer,
            styles.border,
            styles.pa5,
          ]}
          dataSource={DATA_SOURCE2}
          onDropdownWillShow={() => setVisibleState(true)}
          onDropdownWillHide={() => setVisibleState(false)}
          renderItem={(item) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  padding: 10,
                  alignItems: 'center',
                }}
              >
                <UserIcon />
                <Text style={{ paddingLeft: 20 }}>{item}</Text>
              </View>
            );
          }}
        >
          <UserIcon />
          <Text>{DATA_SOURCE2[index]}</Text>
          {dropIcon}
        </ModalDropdown>
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
  dropdownContainer: {
    width: 200,
  },
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
