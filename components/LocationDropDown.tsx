import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function DropDown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Any Where', value: '1' },
    { label: 'Gaza', value: '2' },
    { label: 'Commercial Area', value: '3' },
    { label: 'Kotei', value: '4' },
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
        dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
        labelStyle={styles.label}
        placeholder="Any Where"
        placeholderStyle={styles.placeholder}
        selectedItemContainerStyle={styles.selectedItemContainer}
        selectedItemLabelStyle={styles.selectedItemLabel}
        zIndex={1000} // Ensures the dropdown is above other content
        zIndexInverse={2000} // Helps maintain dropdown visibility when open
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // Ensures container is at the right level
  },
  dropdown: {
    backgroundColor: '#FAFAFA',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    width: '90%',
  },
  dropdownContainer: {
    borderColor: '#ccc',
    borderRadius: 8,
    width: '90%',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    color: '#999',
    fontSize: 14,
  },
  selectedItemContainer: {
    backgroundColor: '#e0e0e0',
  },
  selectedItemLabel: {
    fontWeight: 'bold',
  },
});
