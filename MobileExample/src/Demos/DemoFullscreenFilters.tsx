import React, { useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  ModalDropdown,
  useModalDropdownContext,
} from '@monchilin/react-native-dropdown';
import { AnimatedDownArrow } from '../Common';

const Orders = ['Default', 'Latest', '3H Hottest', '12H Hottest'];

type Range = {
  min?: string;
  max?: string;
};

function OrderPanel({ onSelect }) {
  // get window size
  const windowDimensions = useWindowDimensions();
  // get dropdown context
  const dropdownContext = useModalDropdownContext();

  return (
    <View
      style={{
        width: windowDimensions.width,
        height:
          windowDimensions.height -
          dropdownContext.triggerBounds.h -
          dropdownContext.triggerBounds.y,
        backgroundColor: '#d0d0d0',
      }}
    >
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ backgroundColor: '#ffffff' }}
        data={Orders}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => onSelect(index)}
              style={{
                width: '100%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

function PriceRangePanel({
  onConfirm,
  onClear,
}: {
  range: Range;
  onConfirm: () => void;
  onClear: () => void;
}) {
  // get window size
  const windowDimensions = useWindowDimensions();
  // get dropdown context
  const dropdownContext = useModalDropdownContext();

  return (
    <View
      style={{
        width: windowDimensions.width,
        height:
          windowDimensions.height -
          dropdownContext.triggerBounds.h -
          dropdownContext.triggerBounds.y,
        backgroundColor: '#d0d0d0',
      }}
    >
      <TouchableWithoutFeedback onPress={() => {}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
            backgroundColor: '#ffffff',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <TextInput
              style={{ width: 100 }}
              placeholder={'Please enter min'}
            />
            <Text>-</Text>
            <TextInput
              style={{ width: 100 }}
              placeholder={'Please enter max'}
            />
          </View>
          <View style={{ height: 20 }} />
          <Button title={'Confirm'} onPress={onConfirm} />
          <Button title={'Clear'} onPress={onClear} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default function DemoFullscreenFilters() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const [orderIndex, setOrderIndex] = useState(0);
  const order = Orders[orderIndex];

  const [priceRange, setPriceRange] = useState({
    max: '',
    min: '',
  });

  const onConfirm = () => {
    setPriceRange({ min: '10', max: '10000' });
    setVisible1(false);
  };

  const onClear = () => {
    setPriceRange({ min: '', max: '' });
    setVisible1(false);
  };

  const hasPriceRange = !!priceRange.min;

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text>Header</Text>
      </View>

      <View style={styles.menus}>
        <ModalDropdown
          transitionShow={'fadeIn'}
          transitionHide={'fadeOut'}
          visible={visible1}
          onModalWillHide={() => setVisible1(false)}
          onModalWillShow={() => setVisible1(true)}
          adjustFrame={(position) => {
            position.left = 0;
            position.right = 0;
            return position;
          }}
          Trigger={
            <TouchableOpacity
              onPress={() => setVisible1(true)}
              style={{ flexDirection: 'row' }}
            >
              <Text style={{ color: hasPriceRange ? '#ff4d4f' : '#000000d9' }}>
                Orders
              </Text>
              <AnimatedDownArrow
                color={hasPriceRange ? '#ff4d4f' : '#b2b2b2'}
                visible={visible1}
              />
            </TouchableOpacity>
          }
          Overlay={
            <PriceRangePanel
              onClear={onClear}
              onConfirm={onConfirm}
              range={priceRange}
            />
          }
        />
        <ModalDropdown
          transitionShow={'fadeIn'}
          transitionHide={'fadeOut'}
          visible={visible2}
          onModalWillHide={() => setVisible2(false)}
          onModalWillShow={() => setVisible2(true)}
          adjustFrame={(position) => {
            position.left = 0;
            position.right = 0;
            return position;
          }}
          Trigger={
            <TouchableOpacity
              onPress={() => setVisible2(true)}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text
                style={{ color: orderIndex !== 0 ? '#ff4d4f' : '#000000d9' }}
              >
                {order ?? 'Orders'}
              </Text>
              <AnimatedDownArrow
                color={orderIndex !== 0 ? '#ff4d4f' : '#b2b2b2'}
                visible={visible2}
              />
            </TouchableOpacity>
          }
          Overlay={
            <OrderPanel
              onSelect={(index) => {
                setOrderIndex(index);
                setVisible2(false);
              }}
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  menus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    height: 50,
    backgroundColor: '#ea7c7c',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
