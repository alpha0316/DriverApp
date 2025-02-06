import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PrimaryButton from '@/components/PrimaryButton';
import BackButton from '@/components/BackButton';
import HostelDropDown from '@/components/HostelDropDown'
import LocationDropDown from '@/components/LocationDropDown'
import Table from '@/components/Table';

const { height, width } = Dimensions.get('window');



const FillingProcess = ({navigation}) => {
  const [selectCount, setSelectCount] = useState(0)
  const [totalBookings, setTotalBookings] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const isButtonDisabled = totalBookings > selectCount

  const handleSelectedCount = (selectCount, totalCount, price) => {
    setSelectCount(selectCount)
    setTotalBookings(totalCount)
    setTotalPrice(price)

  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerText}>Cylinder Delivery</Text>
      </View>
    
      <View style={{
        flexDirection : 'row',
        paddingVertical : 12,
        alignItems : 'center'
      }}>
            <HostelDropDown/>
            <LocationDropDown/>
            <Text> 0 <Text style ={{
              color : 'rgba(0, 0, 0, 0.60)'
            }}>/ 4 Delivered</Text> </Text>
      </View>

      <Table onSelectCountChange={handleSelectedCount} />

      <View style={{
  
      }}>
        <PrimaryButton title = 'Complete Delivery' disabled={isButtonDisabled} onPress={() => navigation.navigate('Home')} />
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

});

export default FillingProcess;