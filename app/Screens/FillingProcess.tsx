import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PrimaryButton from '@/components/PrimaryButton';
import BackButton from '@/components/BackButton';

const { height, width } = Dimensions.get('window');

// Mock data for customers
const customers = [
  { id: '1', name: 'John Doe', hostel: 'Hostel A', cylinderSize: '5kg', amount: 50 },
  { id: '2', name: 'Jane Smith', hostel: 'Hostel B', cylinderSize: '10kg', amount: 100 },
  { id: '3', name: 'Bob Johnson', hostel: 'Hostel C', cylinderSize: '15kg', amount: 150 },
  { id: '4', name: 'Alice Brown', hostel: 'Hostel A', cylinderSize: '5kg', amount: 50 },
  { id: '5', name: 'Charlie Davis', hostel: 'Hostel B', cylinderSize: '10kg', amount: 100 },
  { id: '6', name: 'Eva Wilson', hostel: 'Hostel C', cylinderSize: '15kg', amount: 150 },
  { id: '7', name: 'Frank Miller', hostel: 'Hostel A', cylinderSize: '5kg', amount: 50 },
  // Add more customer data as needed
];

const FillingProcess = ({navigation}) => {

  const [selectedIndex, SetSelectedIndex] = useState(0)
  const [filledAmount, setFilledAmount] = useState(0)
  const scrollY = useRef(new Animated.Value(0)).current
  const FlatListRef = useRef(null)

  const totalAmount = customers.reduce((sum, customers) => sum + customers.amount, 0)

  const ITEM_HEIGHT =   height * 0.1
  const ITEM_OFFSET = ITEM_HEIGHT * 0.7

  useEffect(() => {
    FlatListRef.current?.scrollToOffset({
      offset: (customers.length / 2 - 1) * ITEM_HEIGHT,
      animated : false
    })
  },[])

  const handleNextPress = () => {
  
    const nextIndex = selectedIndex + 1

    if (nextIndex >= customers.length){
      navigation.navigate('CylinderDelivery')
    } else {
      setFilledAmount((prev) => prev + customers[selectedIndex].amount)

      FlatListRef.current?.scrollToOffset({
        offset: nextIndex * ITEM_HEIGHT,
        animated: true
      })

      SetSelectedIndex(nextIndex)
    }

  
  }

  const renderItem = ({ item, index}) => {
    const inputRange = [
    (index - 2) * ITEM_HEIGHT,
    (index - 1) * ITEM_HEIGHT,
    (index) * ITEM_HEIGHT,
    (index + 1) * ITEM_HEIGHT,
    (index + 2) * ITEM_HEIGHT,
    ]
  

  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [0.8, 0.9, 1, 0.9, 0.8],
    extrapolate : 'clamp',
  })

  const opacity = scrollY.interpolate({
    inputRange,
    outputRange : [0.3, 0.4, 1, 0.4, 0.3],
    extrapolate : 'clamp'
  })

  return (
    <Animated.View
      style={[
        styles.itemContainer,
        {
          height : ITEM_HEIGHT,
          transform : [{ scale }],
          opacity,
        },
      ]}
    >
      <Text style={styles.nameText}>{item.id}</Text>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.detailText}>{item.hostel}</Text>
      <Text style={styles.detailText}>{item.cylinderSize}</Text>
      <Text style={styles.detailText}>GHS {item.amount}</Text>
    </Animated.View>
  )}
 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerText}>Filling Process</Text>
      </View>

      <View style={{
        flexDirection : 'row',
        gap : 12,
        paddingTop : 24,
        justifyContent : 'space-between'
      }}>
        <View style={{
          padding : 12,
          gap : 16,
          borderWidth : 1,
          borderRadius : 8,
          borderColor : 'rgba(0, 0, 0, 0.10)',
          width : 110
        }}>
          <Text style ={{
            color : 'rgba(0, 0, 0, 0.60)'
          }}>Total</Text>
          <Text>{customers.length}</Text>
        </View>

        <View style={{
          padding : 12,
          gap : 16,
          borderWidth : 1,
          borderRadius : 8,
          borderColor : 'rgba(0, 0, 0, 0.10)',
          width : 110
        }}>
          <Text style ={{
            color : 'rgba(0, 0, 0, 0.60)'
          }}>Left To Fill</Text>
          <Text>{customers.length - selectedIndex}</Text>
        </View>  

        <View style={{
          padding : 12,
          gap : 16,
          borderWidth : 1,
          borderRadius : 8,
          borderColor : 'rgba(0, 0, 0, 0.10)',
          width : 110
        }}>
          <Text style ={{
            color : 'rgba(0, 0, 0, 0.60)'
          }}>Amount Left</Text>
          <Text>GHS {totalAmount - filledAmount} </Text>
        </View>  

      </View>
    
      
      <View style={styles.pickerContainer}>
          <View style={styles.pickerMask} />
          <Animated.FlatList 
              ref={FlatListRef}
              data={customers}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              bounces = {false}
              decelerationRate= 'fast'
              snapToAlignment= 'start'
              snapToInterval={ITEM_HEIGHT}
              contentContainerStyle={{paddingVertical: ITEM_OFFSET}}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
              )}
              scrollEventThrottle={16}
              renderItem={renderItem}
              getItemLayout={(data, index) => ({
                length: ITEM_HEIGHT, // Corrected typo
                offset: ITEM_HEIGHT * index,
                index,
              })}
              onMomentumScrollEnd={(ev) => {
                const newIndex = Math.round(ev.nativeEvent.contentOffset.y /  ITEM_HEIGHT)
                SetSelectedIndex(newIndex)
              }}
          />
      </View>

      <View style={{
        marginTop : 60
      }}>
        <PrimaryButton title={selectedIndex === customers.length - 1 ? 'Complete Filling' : 'Next' } onPress={handleNextPress}/>
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 88,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    paddingBottom: 8,
    alignSelf: 'stretch',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
  },
  pickerContainer: {
    height: height * 0.22,
    alignItems: 'center',
    justifyContent: 'center',
    top : 30,
    backgroundColor : '#F4F4F4',

  },
  pickerMask: {
    position: 'absolute',
    top: '10%',
    left: 0,
    right: 0,
    height: height * 0.1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.0)',

  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection : 'row',
    gap : 20,
    borderWidth : 1,
    borderColor : 'rgba(0, 0, 0, 0.1)',
    width : '100%',
    backgroundColor : "white",
    paddingHorizontal : 4
  
  },
  nameText: {
    fontSize: 16,
    color: '#000',
  },
  detailText: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default FillingProcess;