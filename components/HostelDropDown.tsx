import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function DropDown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'All Hostels', value: '1' },
    { label: 'Evandy', value: '2' },
    { label: 'Georgia', value: '3' },
  ]);

  return (
    <View style={[styles.container, open && { zIndex: 1000 }]}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        labelStyle={styles.label}
        placeholder="All Hostels"
        placeholderStyle={styles.placeholder}
        selectedItemContainerStyle={styles.selectedItemContainer}
        selectedItemLabelStyle={styles.selectedItemLabel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex : 1000,
  },
  dropdown: {
    backgroundColor: '#FAFAFA',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    width : '90%',
    zIndex : 1000,
  
  },
  dropdownContainer: {
    borderColor: '#ccc',
    borderRadius: 8,
    width : '90%',
    
    
  },
  label: {
    fontSize: 16,
    color: '#333',

  },
  placeholder: {
    color: '#999',
    fontSize : 14,
  },
  selectedItemContainer: {
    backgroundColor: '#e0e0e0',
   
  },
  selectedItemLabel: {
    fontWeight: 'bold',
  },
});
